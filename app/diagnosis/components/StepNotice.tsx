import { useState } from "react";
import ProgressBar from "./ProgressBar";

interface StepNoticeProps {
  onNext: () => void;
  onBack: () => void;
}

export default function StepNotice({ onNext, onBack }: StepNoticeProps) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <ProgressBar step={1} totalSteps={7} label="注意事項" />

      <h2 className="font-serif text-navy text-[22px] sm:text-[26px] mb-6 tracking-[0.02em]">
        ご利用にあたっての注意事項
      </h2>

      <div className="bg-bg-soft border border-border rounded-lg p-5 sm:p-6 text-[14px] leading-[1.9] text-text space-y-4">
        <p>
          本診断は、心理検査・性格検査・医療的診断ではありません。ご自身の回答（自己評価）をもとに、
          現在地と変化のきざしを可視化するための簡易チェックです。
        </p>
        <p>診断結果は統計的・臨床的に検証されたものではなく、断定的な評価や保証を行うものではありません。</p>
        <p>
          結果は数値化された自己認識の一つの見方として参考にしていただき、体調面・メンタルヘルス面で気になることがある場合は、
          専門の医療機関にご相談ください。
        </p>
        <p>回答内容はお使いの端末（ブラウザ）上でのみ処理され、外部サーバーへ送信・保存されることはありません。</p>
      </div>

      <label className="flex items-start gap-3 mt-6 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-5 w-5 accent-[var(--gold-deep)] shrink-0"
        />
        <span className="text-[14px] text-navy leading-relaxed">
          上記の注意事項を理解し、同意した上で診断に進みます。
        </span>
      </label>

      <div className="flex items-center justify-between mt-10">
        <button onClick={onBack} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 戻る
        </button>
        <button
          onClick={onNext}
          disabled={!agreed}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontSize: "15px" }}
        >
          同意して次へ
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
