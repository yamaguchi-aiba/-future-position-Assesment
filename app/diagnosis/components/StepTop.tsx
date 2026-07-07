interface StepTopProps {
  onStart: () => void;
}

export default function StepTop({ onStart }: StepTopProps) {
  return (
    <div className="flex flex-col items-center text-center max-w-xl mx-auto px-4 py-10 sm:py-16">
      <p className="text-[11px] tracking-[0.25em] text-gold font-serif mb-4">RE:IDENTITY</p>
      <h1 className="font-serif text-navy-900 leading-tight text-[32px] sm:text-[40px] tracking-[0.04em] mb-5">
        現在地診断
      </h1>
      <div className="gold-divider w-24" />
      <p className="text-navy text-[16px] sm:text-[18px] leading-relaxed mt-6 mb-4">
        Identity・Presence・Action、<br className="sm:hidden" />
        3つの領域から「今のあなた」を可視化する簡易診断です。
      </p>
      <p className="text-text text-[14px] leading-[1.9] mb-10">
        12の質問に1〜10点で答えるだけ。所要時間は約3分。
        <br />
        自己認識・存在感・行動の現在地を数値とレーダーチャートで確認し、
        強み・優先テーマ・次の一歩のヒントを受け取れます。
      </p>

      <button onClick={onStart} className="btn-gold" style={{ fontSize: "15px" }}>
        診断をはじめる
        <span aria-hidden>›</span>
      </button>

      <p className="text-[12px] text-text-muted mt-6 leading-relaxed">
        ログイン不要・登録不要ですぐに診断できます。
      </p>
    </div>
  );
}
