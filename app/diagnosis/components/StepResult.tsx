import { useEffect, useState } from "react";
import type { BasicInfo, DomainScores, PlanProposal, ScoreBand, TypeProfile } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER } from "../lib/questions";
import { FIRST_STEPS, getScoreBand } from "../lib/scoring";
import type { PriorityTheme, Strength } from "../lib/scoring";
import RadarChartView from "./RadarChartView";

interface StepResultProps {
  basicInfo: BasicInfo;
  scores: DomainScores;
  targets: DomainScores;
  gaps: DomainScores;
  overall: number;
  typeProfile: TypeProfile;
  strengths: Strength[];
  priorityTheme: PriorityTheme;
  misalignment: string;
  plans: PlanProposal[];
  onGoToCTA: () => void;
  onRestart: () => void;
  onBack: () => void;
}

function useCountUp(target: number, durationMs = 1200): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function BandChip({ band }: { band: ScoreBand }) {
  const styles: Record<ScoreBand["tone"], React.CSSProperties> = {
    gold: { background: "var(--gold)", color: "#fff" },
    navy: { background: "var(--navy)", color: "#fff" },
    slate: { background: "var(--slate)", color: "#fff" },
  };
  return (
    <span className="text-[10px] tracking-[0.06em] px-2 py-0.5 rounded-full shrink-0" style={styles[band.tone]}>
      {band.label}
    </span>
  );
}

export default function StepResult({
  basicInfo,
  scores,
  targets,
  gaps,
  overall,
  typeProfile,
  strengths,
  priorityTheme,
  misalignment,
  plans,
  onGoToCTA,
  onRestart,
  onBack,
}: StepResultProps) {
  const animatedOverall = useCountUp(overall);
  const overallBand = getScoreBand(overall);
  const [showFloatCTA, setShowFloatCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloatCTA(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 pb-32">
      <p className="text-[11px] tracking-[0.2em] text-gold font-serif text-center mb-1">RESULT</p>
      <h2 className="font-serif text-navy text-[24px] sm:text-[28px] text-center tracking-[0.02em] mb-8">
        {basicInfo.nickname ? `${basicInfo.nickname}様の診断結果` : "診断結果"}
      </h2>

      {/* Type profile — 結論を最初に */}
      <div
        className="rounded-2xl p-6 sm:p-8 text-center mb-8 result-reveal"
        style={{ background: "var(--navy)", color: "#fff" }}
      >
        <p className="text-[11px] tracking-[0.25em] font-serif mb-3" style={{ color: "var(--gold-light)" }}>
          YOUR TYPE
        </p>
        <p className="font-serif text-[30px] sm:text-[34px] tracking-[0.06em] leading-tight mb-1">
          {typeProfile.name}
        </p>
        <p className="text-[12px] tracking-[0.15em] font-serif mb-4" style={{ color: "var(--gold-line)" }}>
          {typeProfile.en}
        </p>
        <p className="text-[14px] leading-relaxed mb-3" style={{ color: "var(--gold-light)" }}>
          {typeProfile.catchcopy}
        </p>
        <p className="text-[13px] leading-[1.9] opacity-90">{typeProfile.description}</p>
        <div className="mt-5 pt-4 text-[13px]" style={{ borderTop: "1px solid rgba(199, 182, 152, 0.3)" }}>
          いちばんの伸びしろは
          <span className="font-serif mx-1.5" style={{ color: "var(--gold-light)" }}>
            {DOMAIN_LABELS[priorityTheme.domain].en}（{DOMAIN_LABELS[priorityTheme.domain].ja}）
          </span>
          にあります
        </div>
      </div>

      {/* Overall score */}
      <div className="flex flex-col items-center mb-10 result-reveal" style={{ animationDelay: "0.15s" }}>
        <div
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center border"
          style={{ borderColor: "var(--gold)", borderWidth: 2 }}
        >
          <span className="font-serif text-navy-900 text-[44px] leading-none">{animatedOverall}</span>
          <span className="text-[11px] text-text-muted mt-1.5">総合スコア / 100</span>
        </div>
        <div className="mt-3">
          <BandChip band={overallBand} />
        </div>
      </div>

      {/* Radar chart */}
      <div
        className="border border-border rounded-xl bg-white p-4 sm:p-6 mb-4 result-reveal"
        style={{ animationDelay: "0.3s" }}
      >
        <RadarChartView scores={scores} targets={targets} />
      </div>
      <p className="text-[11px] text-text-muted text-center mb-8">
        ゴールドが現在地、点線が3ヶ月後の目標です
      </p>

      {/* Domain scores */}
      <div className="space-y-4 mb-4">
        {DOMAIN_ORDER.map((domain) => {
          const band = getScoreBand(scores[domain]);
          return (
            <div key={domain} className="border border-border rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="font-serif text-navy text-[15px] tracking-[0.03em] flex items-center gap-2 min-w-0">
                  {DOMAIN_LABELS[domain].en}
                  <span className="text-[12px] text-text-muted font-sans">{DOMAIN_LABELS[domain].ja}</span>
                  <BandChip band={band} />
                </span>
                <span className="font-serif text-gold text-[20px] shrink-0">{scores[domain]}</span>
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
          );
        })}
      </div>
      <p className="text-[11px] text-text-muted leading-relaxed mb-10">
        スコアの目安 ─ 70以上：強みゾーン ／ 40〜69：成長期 ／ 39以下：伸びしろ期（もっとも変化を感じやすい領域）
      </p>

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
          <div
            className="mt-4 pt-4 flex items-start gap-2.5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <span
              className="text-[10px] tracking-[0.08em] px-2 py-1 rounded-full shrink-0 mt-0.5"
              style={{ background: "var(--gold)", color: "#fff" }}
            >
              最初の一歩
            </span>
            <p className="text-[13px] text-navy leading-relaxed">{FIRST_STEPS[priorityTheme.domain]}</p>
          </div>
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
          ※上記はスコアに基づく仮の提案であり、正式なプランは無料セッションにてご案内します。
        </p>
      </section>

      <div className="gold-divider" />
      <p className="text-[12px] text-text-muted leading-relaxed mb-8">
        本診断は心理検査・性格検査・医療的診断ではなく、自己評価をもとに現在地と変化を可視化する簡易チェックです。結果は断定的な評価を意味するものではありません。
      </p>

      {/* CTA */}
      <div className="bg-bg-soft border border-border rounded-xl p-5 sm:p-6 mb-8 text-center">
        <p className="text-[13px] text-navy leading-relaxed mb-1">
          この診断結果はどこにも保存されません。
        </p>
        <p className="text-[13px] text-text leading-relaxed">
          スクリーンショットで保存して、無料セッションでご一緒に読み解きましょう。
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button onClick={onGoToCTA} className="btn-gold w-full sm:w-auto justify-center" style={{ fontSize: "15px" }}>
          無料セッションで詳しく相談する
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

      {/* Floating CTA */}
      {showFloatCTA && (
        <div className="float-cta">
          <button onClick={onGoToCTA} className="btn-gold w-full justify-center" style={{ fontSize: "14px" }}>
            無料セッションで詳しく相談する
            <span aria-hidden>›</span>
          </button>
        </div>
      )}
    </div>
  );
}
