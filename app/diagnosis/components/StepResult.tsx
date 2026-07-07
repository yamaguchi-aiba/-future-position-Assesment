import type { BasicInfo, DomainScores, PlanProposal } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER } from "../lib/questions";
import type { PriorityTheme, Strength } from "../lib/scoring";
import RadarChartView from "./RadarChartView";

interface StepResultProps {
  basicInfo: BasicInfo;
  scores: DomainScores;
  targets: DomainScores;
  gaps: DomainScores;
  overall: number;
  strengths: Strength[];
  priorityTheme: PriorityTheme;
  misalignment: string;
  plans: PlanProposal[];
  onGoToCTA: () => void;
  onRestart: () => void;
  onBack: () => void;
}

export default function StepResult({
  basicInfo,
  scores,
  targets,
  gaps,
  overall,
  strengths,
  priorityTheme,
  misalignment,
  plans,
  onGoToCTA,
  onRestart,
  onBack,
}: StepResultProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <p className="text-[11px] tracking-[0.2em] text-gold font-serif text-center mb-1">RESULT</p>
      <h2 className="font-serif text-navy text-[24px] sm:text-[28px] text-center tracking-[0.02em] mb-1">
        {basicInfo.nickname ? `${basicInfo.nickname}様の診断結果` : "診断結果"}
      </h2>
      <p className="text-[13px] text-text-muted text-center mb-8">現在地の可視化</p>

      {/* Overall score */}
      <div className="flex flex-col items-center mb-10">
        <div
          className="w-32 h-32 rounded-full flex flex-col items-center justify-center border"
          style={{ borderColor: "var(--gold)", borderWidth: 2 }}
        >
          <span className="font-serif text-navy-900 text-[40px] leading-none">{overall}</span>
          <span className="text-[11px] text-text-muted mt-1">総合スコア</span>
        </div>
      </div>

      {/* Radar chart */}
      <div className="border border-border rounded-xl bg-white p-4 sm:p-6 mb-8">
        <RadarChartView scores={scores} targets={targets} />
      </div>

      {/* Domain scores */}
      <div className="space-y-4 mb-10">
        {DOMAIN_ORDER.map((domain) => (
          <div key={domain} className="border border-border rounded-lg p-4 bg-white">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-serif text-navy text-[15px] tracking-[0.03em]">
                {DOMAIN_LABELS[domain].en}
                <span className="text-[12px] text-text-muted ml-2">{DOMAIN_LABELS[domain].ja}</span>
              </span>
              <span className="font-serif text-gold text-[20px]">{scores[domain]}</span>
            </div>
            <div className="h-2 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${scores[domain]}%`,
                  background: "linear-gradient(90deg, var(--gold-light), var(--gold-deep))",
                }}
              />
            </div>
            <p className="text-[11px] text-text-muted mt-1.5">
              目標 {targets[domain]}点（ギャップ {gaps[domain] > 0 ? `+${gaps[domain]}` : gaps[domain]}）
            </p>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <section className="mb-8">
        <div className="section-label">すでにある強み</div>
        <div className="space-y-2">
          {strengths.map((s) => (
            <div key={s.questionId} className="gold-check-item">
              <span className="text-gold shrink-0 mt-0.5">✓</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Priority theme */}
      <section className="mb-8">
        <div className="section-label">優先テーマ</div>
        <div className="bg-bg-soft border border-border rounded-lg p-5">
          <p className="font-serif text-navy text-[17px] mb-2">
            {DOMAIN_LABELS[priorityTheme.domain].en}
            <span className="text-[13px] text-text-muted ml-2">{DOMAIN_LABELS[priorityTheme.domain].ja}</span>
          </p>
          <p className="text-[14px] text-text leading-relaxed">
            {priorityTheme.reason === "gap"
              ? `目標とのギャップが最も大きい領域です（現在 ${priorityTheme.score}点、ギャップ ${priorityTheme.gap}点）。ここを重点的に扱うことで、3ヶ月後の変化を感じやすくなる可能性があります。`
              : `現時点でのスコアが最も低い領域です（現在 ${priorityTheme.score}点）。まずここに手を入れることで、全体のバランスが整いやすくなる可能性があります。`}
          </p>
        </div>
      </section>

      {/* Misalignment */}
      <section className="mb-10">
        <div className="section-label">現在起きているズレ</div>
        <p className="text-[14px] text-text leading-relaxed">{misalignment}</p>
      </section>

      {/* Plans */}
      <section className="mb-10">
        <div className="section-label">あなたに合いそうなプラン（仮）</div>
        <div className="grid gap-4 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl p-5 border bg-white flex flex-col"
              style={
                plan.recommended
                  ? { borderColor: "var(--gold)", borderWidth: 2, background: "var(--bg-soft)" }
                  : { borderColor: "var(--border)" }
              }
            >
              {plan.recommended && (
                <span
                  className="self-start text-[10px] tracking-[0.08em] px-2 py-1 rounded-full mb-2"
                  style={{ background: "var(--gold)", color: "var(--navy)" }}
                >
                  適している可能性があります
                </span>
              )}
              <p className="font-serif text-navy text-[18px] mb-1">{plan.name}</p>
              <p className="text-[12px] text-gold mb-3">{plan.tagline}</p>
              <p className="text-[13px] text-text leading-relaxed">{plan.description}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-3 leading-relaxed">
          ※上記はスコアに基づく仮の提案であり、正式なプランは無料相談にてご案内します。
        </p>
      </section>

      <div className="gold-divider" />
      <p className="text-[12px] text-text-muted leading-relaxed mb-10">
        本診断は心理検査・性格検査・医療的診断ではなく、自己評価をもとに現在地と変化を可視化する簡易チェックです。結果は断定的な評価を意味するものではありません。
      </p>

      <div className="flex flex-col items-center gap-4">
        <button onClick={onGoToCTA} className="btn-gold w-full sm:w-auto justify-center" style={{ fontSize: "15px" }}>
          未来現在地セッションに申し込む
          <span aria-hidden>›</span>
        </button>
        <div className="flex gap-6">
          <button onClick={onBack} className="text-[13px] text-text-muted hover:text-navy transition-colors">
            ‹ 目標を編集する
          </button>
          <button onClick={onRestart} className="text-[13px] text-text-muted hover:text-navy transition-colors">
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
