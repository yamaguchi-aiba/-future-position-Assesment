import type { Answers, Domain, DomainScores, PlanProposal, ScoreBand, TargetScores, TypeProfile } from "../types";
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

/** スコア帯の解釈ラベル */
export function getScoreBand(score: number): ScoreBand {
  if (score >= 70) return { label: "強みゾーン", tone: "gold" };
  if (score >= 40) return { label: "成長期", tone: "navy" };
  return { label: "伸びしろ期", tone: "slate" };
}

const TYPE_THRESHOLD = 60;

/** 3領域の高低パターン（2^3 = 8通り）に対応するタイプ */
const TYPE_PROFILES: Record<string, TypeProfile> = {
  HHH: {
    name: "体現者",
    en: "The Embodiment",
    catchcopy: "軸・存在感・行動がすでに揃った統合タイプ。",
    description:
      "自分の軸を理解し、それが振る舞いにも行動にも表れています。ここからは「維持」ではなく、より大きな舞台へ影響力を広げるフェーズです。",
  },
  HHL: {
    name: "構想家",
    en: "The Visionary",
    catchcopy: "軸と存在感が光る。行動の仕組み化が飛躍の鍵。",
    description:
      "自己理解が深く、周囲への印象も良好です。描いているものを現実に変える「行動の習慣化」が整えば、一気に加速するタイプです。",
  },
  HLH: {
    name: "静かな実践者",
    en: "The Quiet Achiever",
    catchcopy: "軸と行動は本物。あとは「伝わり方」だけ。",
    description:
      "自分の軸に沿って着実に行動できています。その価値が周囲に十分伝わっていないのが唯一のもったいない点。見せ方が整えば評価が実力に追いつきます。",
  },
  LHH: {
    name: "天性の表現者",
    en: "The Natural",
    catchcopy: "存在感と行動力が武器。軸の言語化でさらに加速。",
    description:
      "人前での魅力と行動力を兼ね備えています。「自分は何者か」の言語化が進むと、その魅力に一貫性が生まれ、信頼が積み上がっていきます。",
  },
  HLL: {
    name: "内なる探求者",
    en: "The Seeker",
    catchcopy: "深い自己理解が財産。表現と行動への翻訳がテーマ。",
    description:
      "自分の価値観や強みへの理解が深いタイプです。その内側の豊かさを、振る舞いと日々の行動に翻訳できたとき、大きな変化が始まります。",
  },
  LHL: {
    name: "魅せる原石",
    en: "The Charisma",
    catchcopy: "印象力という天性のギフト。軸と行動で本物になる。",
    description:
      "周囲を惹きつける力をすでに持っています。自分の軸の言語化と行動の積み重ねが加わると、「感じが良い人」から「信頼される人」へ進化します。",
  },
  LLH: {
    name: "行動の開拓者",
    en: "The Mover",
    catchcopy: "まず動ける力は最大の資産。軸と見せ方で成果が定着する。",
    description:
      "考えるより先に動ける、貴重な行動力の持ち主です。行動に「自分の軸」と「伝わる見せ方」が加わると、努力が成果と評価に変わり始めます。",
  },
  LLL: {
    name: "リスタートの主人公",
    en: "The Origin",
    catchcopy: "伸びしろ最大。いちばん変化を実感できるスタート地点。",
    description:
      "3領域すべてにこれからの余白がある、変化がもっとも目に見えるポジションです。小さな一歩の積み重ねが、3ヶ月後には大きな差になります。",
  },
};

/** 3領域スコアの高低パターンからタイプを判定する */
export function getTypeProfile(scores: DomainScores): TypeProfile {
  const key = DOMAIN_ORDER.map((d) => (scores[d] >= TYPE_THRESHOLD ? "H" : "L")).join("");
  return TYPE_PROFILES[key];
}

/** 優先テーマに添える「最初の一歩」 */
export const FIRST_STEPS: Record<Domain, string> = {
  identity: "あなたが大切にしている価値観を、思いつくまま3つ書き出してみる",
  presence: "今日、鏡の前で30秒だけ姿勢と表情を整えてから外に出る",
  action: "3ヶ月後の目標を、「今週やる小さな行動1つ」に翻訳してみる",
};

export { DOMAIN_LABELS, DOMAIN_ORDER };
