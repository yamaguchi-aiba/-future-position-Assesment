import { useState } from "react";
import type { Answers } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER, questionsByDomain } from "../lib/questions";
import ProgressBar from "./ProgressBar";

interface StepQuestionsProps {
  answers: Answers;
  onChange: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const SCORE_VALUES = Array.from({ length: 10 }, (_, i) => i + 1);

export default function StepQuestions({ answers, onChange, onNext, onBack }: StepQuestionsProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const domain = DOMAIN_ORDER[pageIndex];
  const questions = questionsByDomain(domain);
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleNextPage = () => {
    if (pageIndex < DOMAIN_ORDER.length - 1) {
      setPageIndex(pageIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNext();
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onBack();
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <ProgressBar
        step={3}
        totalSteps={7}
        label="12問診断"
        subLabel={`${DOMAIN_LABELS[domain].en} ・ 質問 ${pageIndex * 4 + 1}〜${pageIndex * 4 + 4} / 12`}
      />

      <div className="mb-8">
        <p className="text-[11px] tracking-[0.2em] text-gold font-serif mb-1">{DOMAIN_LABELS[domain].en}</p>
        <h2 className="font-serif text-navy text-[22px] sm:text-[24px] tracking-[0.02em]">
          {DOMAIN_LABELS[domain].ja}
        </h2>
        <p className="text-[13px] text-text-muted mt-1">{DOMAIN_LABELS[domain].description}</p>
      </div>

      <div className="space-y-8">
        {questions.map((q, i) => (
          <div key={q.id} className="border border-border rounded-xl p-4 sm:p-5 bg-white">
            <p className="text-[15px] text-navy leading-relaxed mb-4">
              <span className="text-gold font-serif mr-2">{pageIndex * 4 + i + 1}.</span>
              {q.text}
            </p>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {SCORE_VALUES.map((value) => {
                const selected = answers[q.id] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onChange(q.id, value)}
                    aria-pressed={selected}
                    className={`h-10 rounded-md text-[13px] font-medium transition-colors ${
                      selected
                        ? "text-navy"
                        : "border border-border text-text-muted hover:border-[var(--gold-line)]"
                    }`}
                    style={
                      selected
                        ? {
                            background: "linear-gradient(180deg, var(--gold-light), var(--gold-deep))",
                            border: "1px solid var(--gold)",
                          }
                        : undefined
                    }
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-[11px] text-text-muted mt-1.5 px-0.5">
              <span>あてはまらない</span>
              <span>とてもあてはまる</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-10">
        <button onClick={handlePrevPage} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 戻る
        </button>
        <button
          onClick={handleNextPage}
          disabled={!allAnswered}
          className="btn-gold disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ fontSize: "15px" }}
        >
          {pageIndex < DOMAIN_ORDER.length - 1 ? "次の領域へ" : "次へ"}
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
