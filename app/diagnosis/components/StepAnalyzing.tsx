import { useEffect, useState } from "react";

interface StepAnalyzingProps {
  onDone: () => void;
}

const MESSAGES = [
  "回答を集計しています…",
  "3つの領域のバランスを分析しています…",
  "あなたの現在地をマッピングしています…",
];

const MESSAGE_MS = 900;

export default function StepAnalyzing({ onDone }: StepAnalyzingProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timers = MESSAGES.map((_, i) =>
      setTimeout(() => setMessageIndex(i), i * MESSAGE_MS)
    );
    const done = setTimeout(onDone, MESSAGES.length * MESSAGE_MS + 300);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="analyzing-ring mb-10" aria-hidden>
        <div className="analyzing-ring-inner" />
      </div>
      <p className="text-[11px] tracking-[0.25em] text-gold font-serif mb-3">ANALYZING</p>
      <p key={messageIndex} className="text-[15px] text-navy interlude-fade" aria-live="polite">
        {MESSAGES[messageIndex]}
      </p>
    </div>
  );
}
