import type { Answers, Domain, DomainScores, PlanProposal, TargetScores } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER, QUESTIONS, questionsByDomain } from "./questions";

/** 領域スコア = 4項目合計 ÷ 40 × 100 */
export function calcDomainScore(answers: Answers, domain: Domain): number {
  const sum = questionsByDomain(domain).reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
  return Math.round((sum / 40) * 100);
}

export function calcAllScores(answers: Answers): DomainScores {
  return {
    identity: calcDomainScore(answers, "identity"),
    presence: calcDomainScore(answers, "presence"),
    action: calcDomainScore(answers, "action"),
  };
}

/** 総合スコア = 3領域の平均 */
export function calcOverallScore(scores: DomainScores): number {
  return Math.round((scores.identity + scores.presence + scores.action) / 3);
}

export function calcGaps(scores: DomainScores, targets: TargetScores): DomainScores {
  return {
    identity: targets.identity - scores.identity,
    presence: targets.presence - scores.presence,
    action: targets.action - scores.action,
  };
}

export interface Strength {
  questionId: number;
  domain: Domain;
  text: string;
  score: number;
}

/** 高得点項目から「すでにある強み」を抽出する */
export function getStrengths(answers: Answers, count = 3): Strength[] {
  return [...QUESTIONS]
    .map((q) => ({ questionId: q.id, domain: q.domain, text: q.text, score: answers[q.id] ?? 0 }))
    .sort((a, b) => b.score - a.score || a.questionId - b.questionId)
    .slice(0, count);
}

export interface PriorityTheme {
  domain: Domain;
  score: number;
  gap: number;
  reason: "gap" | "lowScore";
}

/** 最大ギャップ、なければ最低スコアの領域を「優先テーマ」とする */
export function getPriorityTheme(scores: DomainScores, gaps: DomainScores): PriorityTheme {
  const domains = DOMAIN_ORDER;
  const maxGapDomain = domains.reduce((a, b) => (gaps[b] > gaps[a] ? b : a));

  if (gaps[maxGapDomain] > 5) {
    return { domain: maxGapDomain, score: scores[maxGapDomain], gap: gaps[maxGapDomain], reason: "gap" };
  }

  const lowestDomain = domains.reduce((a, b) => (scores[b] < scores[a] ? b : a));
  return { domain: lowestDomain, score: scores[lowestDomain], gap: gaps[lowestDomain], reason: "lowScore" };
}

const MISALIGNMENT_PATTERNS: Partial<Record<string, string>> = {
  "identity-presence":
    "自分の軸や価値観は明確ですが、それがまだ振る舞いや印象として周囲に十分伝わっていない可能性があります。",
  "identity-action":
    "方向性や価値観は見えているものの、日々の具体的な行動や実践がそれに追いついていない可能性があります。",
  "presence-identity":
    "見え方や印象は整っている一方で、根っこにある自分の軸や価値観がまだ曖昧な可能性があります。",
  "presence-action":
    "周囲からの印象は良好な一方、その印象を裏づける行動の継続や実践が課題になっている可能性があります。",
  "action-identity":
    "行動力はあるものの、何のために動くのかという軸が定まらないまま進んでいる可能性があります。",
  "action-presence":
    "行動は積み重ねられているものの、その頑張りが周囲にうまく伝わっていない可能性があります。",
};

const BALANCED_MESSAGE =
  "3つの領域が比較的近い水準にあり、大きなズレは見られません。今は特定の弱点を補うより、全体を底上げしていくフェーズと考えられます。";

/** 3領域の高低の組み合わせから「現在起きているズレ」を返す */
export function getMisalignmentMessage(scores: DomainScores): string {
  const domains = DOMAIN_ORDER;
  const maxDomain = domains.reduce((a, b) => (scores[b] > scores[a] ? b : a));
  const minDomain = domains.reduce((a, b) => (scores[b] < scores[a] ? b : a));

  if (maxDomain === minDomain || scores[maxDomain] - scores[minDomain] < 10) {
    return BALANCED_MESSAGE;
  }

  return MISALIGNMENT_PATTERNS[`${maxDomain}-${minDomain}`] ?? BALANCED_MESSAGE;
}

const PLAN_BASE: Omit<PlanProposal, "recommended">[] = [
  {
    id: "light",
    name: "Light",
    tagline: "特定テーマの短期集中プラン",
    description:
      "土台はすでにあり、特定の1テーマを短期間で整えたい方向けのプランです。",
  },
  {
    id: "standard",
    name: "Standard",
    tagline: "3領域バランス底上げプラン",
    description:
      "Identity・Presence・Actionをバランスよく底上げしながら、3ヶ月後の目標達成を目指す伴走プランです。",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "根本再構築・並走プラン",
    description:
      "複数領域に大きなギャップがある方向けに、じっくり並走しながら根本から再構築するプランです。",
  },
];

function decideRecommendedPlan(overall: number, maxGap: number): PlanProposal["id"] {
  if (maxGap >= 35) return "premium";
  if (overall >= 75 && maxGap < 20) return "light";
  if (overall < 45) return "premium";
  return "standard";
}

export function getPlanProposals(overall: number, gaps: DomainScores): PlanProposal[] {
  const maxGap = Math.max(gaps.identity, gaps.presence, gaps.action);
  const recommended = decideRecommendedPlan(overall, maxGap);

  return PLAN_BASE.map((plan) => ({
    ...plan,
    recommended: plan.id === recommended,
    description:
      plan.id === recommended
        ? `${plan.description}あなたの現在地には、このプランが適している可能性があります。`
        : plan.description,
  }));
}

export { DOMAIN_LABELS, DOMAIN_ORDER };
