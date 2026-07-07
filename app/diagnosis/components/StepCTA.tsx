const BOOKING_URL = "#";

interface StepCTAProps {
  nickname: string;
  onBack: () => void;
}

export default function StepCTA({ nickname, onBack }: StepCTAProps) {
  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <p className="text-[11px] tracking-[0.2em] text-gold font-serif text-center mb-2">NEXT STEP</p>
      <h2 className="font-serif text-navy text-[24px] sm:text-[28px] text-center tracking-[0.02em] mb-6">
        未来現在地セッション
      </h2>

      <p className="text-[14px] text-text leading-[1.9] text-center mb-8">
        {nickname ? `${nickname}様の` : "あなたの"}
        診断結果をもとに、専任スタッフが現在地と3ヶ月後の目標までの道すじを一緒に整理する、無料の個別セッション（60分）です。
      </p>

      <div className="bg-bg-soft border border-border rounded-lg p-5 sm:p-6 mb-8 space-y-3">
        <div className="gold-check-item">
          <span className="text-gold shrink-0 mt-0.5">✓</span>
          <span>診断結果の詳しい解説と、背景にある考え方の共有</span>
        </div>
        <div className="gold-check-item">
          <span className="text-gold shrink-0 mt-0.5">✓</span>
          <span>優先テーマとギャップに対する具体的なアプローチのご提案</span>
        </div>
        <div className="gold-check-item">
          <span className="text-gold shrink-0 mt-0.5">✓</span>
          <span>Light / Standard / Premium のうち、現在地に合ったプランのご案内</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <a href={BOOKING_URL} className="btn-gold w-full sm:w-auto justify-center" style={{ fontSize: "15px" }}>
          未来現在地セッションを予約する（無料・60分）
          <span aria-hidden>›</span>
        </a>
        <button onClick={onBack} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 結果に戻る
        </button>
      </div>
    </div>
  );
}
