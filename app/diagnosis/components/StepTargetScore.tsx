import type { Domain, DomainScores, TargetScores } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER } from "../lib/questions";
import ProgressBar from "./ProgressBar";

interface StepTargetScoreProps {
  scores: DomainScores;
  targets: TargetScores;
  onChange: (domain: Domain, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepTargetScore({ scores, targets, onChange, onNext, onBack }: StepTargetScoreProps) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <ProgressBar step={4} totalSteps={7} label="3ヶ月後の目標" />

      <h2 className="font-serif text-navy text-[22px] sm:text-[26px] mb-2 tracking-[0.02em]">
        3ヶ月後の目標スコア
      </h2>
      <p className="text-[13px] text-text-muted mb-8 leading-relaxed">
        各領域について、3ヶ月後にどこまで到達していたいかを設定してください。現在のスコアとの差が「ギャップ」として結果に表示されます。
      </p>

      <div className="space-y-8">
        {DOMAIN_ORDER.map((domain) => (
          <div key={domain} className="border border-border rounded-xl p-5 bg-white">
            <div className="flex items-center justify-between mb-1">
              <p className="font-serif text-navy text-[16px] tracking-[0.04em]">{DOMAIN_LABELS[domain].en}</p>
              <p className="text-[12px] text-text-muted">現在 {scores[domain]}点</p>
            </div>
            <p className="text-[12px] text-text-muted mb-4">{DOMAIN_LABELS[domain].ja}</p>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={targets[domain]}
                onChange={(e) => onChange(domain, Number(e.target.value))}
                className="w-full accent-[var(--gold-deep)]"
              />
              <span className="font-serif text-gold text-[20px] w-14 text-right shrink-0">
                {targets[domain]}
              </span>
            </div>

            <div className="relative h-2 mt-3 rounded-full bg-border overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ width: `${scores[domain]}%`, background: "var(--slate)" }}
              />
              <div
                className="absolute top-0 h-full w-[3px]"
                style={{ left: `calc(${targets[domain]}% - 1.5px)`, background: "var(--gold-deep)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-10">
        <button onClick={onBack} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 戻る
        </button>
        <button onClick={onNext} className="btn-gold" style={{ fontSize: "15px" }}>
          結果を見る
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
