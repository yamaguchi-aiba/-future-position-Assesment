export type Domain = "identity" | "presence" | "action";

export interface Question {
  id: number;
  domain: Domain;
  text: string;
}

/** question id -> 1〜10 の自己評価スコア */
export type Answers = Record<number, number>;

export interface BasicInfo {
  nickname: string;
  ageRange: string;
  status: string;
}

export type DomainScores = Record<Domain, number>;
export type TargetScores = Record<Domain, number>;

export type PlanId = "light" | "standard" | "premium";

export interface PlanProposal {
  id: PlanId;
  name: string;
  tagline: string;
  description: string;
  recommended: boolean;
}

export interface TypeProfile {
  name: string;
  en: string;
  catchcopy: string;
  description: string;
}

export interface ScoreBand {
  label: string;
  tone: "gold" | "navy" | "slate";
}
