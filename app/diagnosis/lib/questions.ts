import type { Domain, Question } from "../types";

export const DOMAIN_ORDER: Domain[] = ["identity", "presence", "action"];

export const DOMAIN_LABELS: Record<Domain, { en: string; ja: string; description: string }> = {
  identity: {
    en: "IDENTITY",
    ja: "自己認識",
    description: "自分の価値観・強み・軸をどれだけ言語化し、納得できているか",
  },
  presence: {
    en: "PRESENCE",
    ja: "存在感",
    description: "在り方や振る舞いが、周囲にどれだけ信頼と印象を残せているか",
  },
  action: {
    en: "ACTION",
    ja: "行動",
    description: "目標に向けた行動を、どれだけ継続・実践・改善できているか",
  },
};

export const QUESTIONS: Question[] = [
  { id: 1, domain: "identity", text: "自分が本当に大切にしている価値観を、言葉で説明できる" },
  { id: 2, domain: "identity", text: "これまでの経験や実績に、自分自身で納得できている" },
  { id: 3, domain: "identity", text: "「本来の自分」と「今の自分」にズレを感じない" },
  { id: 4, domain: "identity", text: "自分の強みや才能を、正しく理解している" },

  { id: 5, domain: "presence", text: "人前に出るとき、自然体で自信を持って振る舞える" },
  { id: 6, domain: "presence", text: "自分の発言や存在が、周囲に良い影響を与えていると感じる" },
  { id: 7, domain: "presence", text: "緊張する場面でも、落ち着いた雰囲気を保てる" },
  { id: 8, domain: "presence", text: "初対面の人からも、信頼される印象を持たれている自覚がある" },

  { id: 9, domain: "action", text: "目標に向けて、日々具体的な行動を継続できている" },
  { id: 10, domain: "action", text: "やると決めたことを、感情に左右されず実行できる" },
  { id: 11, domain: "action", text: "環境や状況の変化に、柔軟かつ迅速に対応できる" },
  { id: 12, domain: "action", text: "行動した結果を振り返り、次の改善に活かせている" },
];

export function questionsByDomain(domain: Domain): Question[] {
  return QUESTIONS.filter((q) => q.domain === domain);
}
