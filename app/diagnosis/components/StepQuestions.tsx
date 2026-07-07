import { useEffect, useRef, useState } from "react";
import type { Answers } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER, QUESTIONS, questionsByDomain } from "../lib/questions";
import ProgressBar from "./ProgressBar";

interface StepQuestionsProps {
  answers: Answers;
  onChange: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const SCORE_VALUES = Array.from({ length: 10 }, (_, i) => i + 1);
const INTERLUDE_MS = 1500;
const AUTO_ADVANCE_MS = 900;

export default function StepQuestions({ answers, onChange, onNext, onBack }: StepQuestionsProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showInterlude, setShowInterlude] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const domain = DOMAIN_ORDER[pageIndex];
  const questions = questionsByDomain(domain);
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);
  const answeredTotal = QUESTIONS.filter((q) => answers[q.id] !== undefined).length;
  const remaining = QUESTIONS.length - answeredTotal;

  useEffect(() => {
    setShowInterlude(true);
    setAutoAdvance(false);
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setShowInterlude(false), INTERLUDE_MS);
    return () => clearTimeout(t);
  }, [pageIndex]);

  const goNextPage = () => {
    setAutoAdvance(false);
    if (pageIndex < DOMAIN_ORDER.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      onNext();
    }
  };

  const goPrevPage = () => {
    setAutoAdvance(false);
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    } else {
      onBack();
    }
  };

  // ページの全問が回答されたら少し待って自動で次へ。
  // effect経由にすることで、最後の回答が反映された最新のstateでonNextが呼ばれる。
  useEffect(() => {
    if (!autoAdvance || !allAnswered) return;
    const t = setTimeout(goNextPage, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoAdvance, answers]);

  const handleSelect = (qIndex: number, questionId: number, value: number) => {
    onChange(questionId, value);

    const nextUnanswered = questions.findIndex(
      (q, i) => i !== qIndex && answers[q.id] === undefined
    );

    if (nextUnanswered !== -1) {
      setAutoAdvance(false);
      setTimeout(() => {
        cardRefs.current[nextUnanswered]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 250);
    } else {
      // このタップでページの4問が揃った
      setAutoAdvance(true);
    }
  };

  if (showInterlude) {
    return (
      <div className="max-w-xl mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center interlude-fade">
        <p className="text-[12px] tracking-[0.3em] text-gold font-serif mb-4">
          {DOMAIN_LABELS[domain].en}
        </p>
        <h2 className="font-serif text-navy text-[26px] sm:text-[30px] tracking-[0.03em] mb-4">
          {pageIndex === 0 ? "まずは" : "次は"}、あなたの「{DOMAIN_LABELS[domain].ja}」について
        </h2>
        <div className="gold-divider w-20" />
        <p className="text-[13px] text-text-muted mt-4">{DOMAIN_LABELS[domain].description}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-12 interlude-fade">
      <ProgressBar
        step={3}
        totalSteps={7}
        label="12問診断"
        subLabel={`${DOMAIN_LABELS[domain].en} ・ 残り${remaining}問（約${Math.max(1, Math.ceil(remaining / 6))}分）`}
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
          <div
            key={q.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="border border-border rounded-xl p-4 sm:p-5 bg-white"
          >
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
                    onClick={() => handleSelect(i, q.id, value)}
                    aria-pressed={selected}
                    className={`h-10 rounded-md text-[13px] font-medium transition-all ${
                      selected
                        ? "text-navy score-pop"
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
        <button onClick={goPrevPage} className="text-[13px] text-text-muted hover:text-navy transition-colors">
          ‹ 戻る
        </button>
        <button
          onClick={goNextPage}
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
