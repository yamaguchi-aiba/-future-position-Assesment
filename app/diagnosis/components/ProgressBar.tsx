interface ProgressBarProps {
  step: number;
  totalSteps: number;
  label: string;
  subLabel?: string;
}

export default function ProgressBar({ step, totalSteps, label, subLabel }: ProgressBarProps) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] tracking-[0.15em] text-text-muted font-serif">
          STEP {step} / {totalSteps}
        </span>
        <span className="text-[11px] tracking-[0.1em] text-text-muted">{label}</span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, var(--gold-light), var(--gold-deep))",
          }}
        />
      </div>
      {subLabel && <p className="text-[12px] text-text-muted mt-2">{subLabel}</p>}
    </div>
  );
}
