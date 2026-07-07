import type { BasicInfo } from "../types";
import ProgressBar from "./ProgressBar";

interface StepBasicInfoProps {
  basicInfo: BasicInfo;
  onChange: (info: BasicInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

const AGE_RANGES = ["10代", "20代", "30代", "40代", "50代以上", "回答しない"];
const STATUS_OPTIONS = ["経営者・フリーランス", "会社員・組織所属", "学生", "その他"];

const inputClass =
  "w-full border border-border rounded-lg px-4 py-3 text-[15px] text-navy bg-white focus:outline-none focus:border-[var(--gold)] transition-colors";

export default function StepBasicInfo({ basicInfo, onChange, onNext, onBack }: StepBasicInfoProps) {
  const canProceed = basicInfo.nickname.trim().length > 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <ProgressBar step={2} totalSteps={7} label="基本情報" />

      <h2 className="font-serif text-navy text-[22px] sm:text-[26px] mb-2 tracking-[0.02em]">基本情報の入力</h2>
      <p className="text-[13px] text-text-muted mb-8">結果画面の表示に使用します。回答は保存・送信されません。</p>

      <div className="space-y-6">
        <div>
          <label className="block text-[13px] text-navy mb-2">お名前・ニックネーム</label>
          <input
            type="text"
            value={basicInfo.nickname}
            onChange={(e) => onChange({ ...basicInfo, nickname: e.target.value })}
            placeholder="例：ゆか"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-[13px] text-navy mb-2">年代（任意）</label>
          <div className="grid grid-cols-3 gap-2">
            {AGE_RANGES.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => onChange({ ...basicInfo, ageRange: range })}
                className={`rounded-lg border px-2 py-2.5 text-[13px] transition-colors ${
                  basicInfo.ageRange === range
                    ? "border-[var(--gold)] bg-bg-soft text-navy font-semibold"
                    : "border-border text-text hover:border-[var(--gold-line)]"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[13px] text-navy mb-2">現在のご状況（任意）</label>
          <div className="grid grid-cols-2 gap-2">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onChange({ ...basicInfo, status })}
                className={`rounded-lg border px-3 py-2.5 text-[13px] transition-colors ${
                  basicInfo.status === status
                    ? "border-[var(--gold)] bg-bg-soft text-navy font-semibold"
                    : "border-border text-text hover:border-[var(--gold-line)]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10">
        <button onClick={onBack} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 戻る
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontSize: "15px" }}
        >
          次へ
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
