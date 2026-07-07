"use client";

import { useMemo, useState } from "react";
import type { Answers, BasicInfo, Domain, TargetScores } from "./types";
import {
  calcAllScores,
  calcGaps,
  calcOverallScore,
  getMisalignmentMessage,
  getPlanProposals,
  getPriorityTheme,
  getStrengths,
  getTypeProfile,
} from "./lib/scoring";
import StepTop from "./components/StepTop";
import StepNotice from "./components/StepNotice";
import StepBasicInfo from "./components/StepBasicInfo";
import StepQuestions from "./components/StepQuestions";
import StepTargetScore from "./components/StepTargetScore";
import StepAnalyzing from "./components/StepAnalyzing";
import StepResult from "./components/StepResult";
import StepCTA from "./components/StepCTA";

type Step = "top" | "notice" | "basicInfo" | "questions" | "target" | "analyzing" | "result" | "cta";

const INITIAL_BASIC_INFO: BasicInfo = { nickname: "", ageRange: "", status: "" };
const INITIAL_TARGETS: TargetScores = { identity: 70, presence: 70, action: 70 };

function scrollToTop() {
  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function DiagnosisApp() {
  const [step, setStep] = useState<Step>("top");
  const [answers, setAnswers] = useState<Answers>({});
  const [basicInfo, setBasicInfo] = useState<BasicInfo>(INITIAL_BASIC_INFO);
  const [targets, setTargets] = useState<TargetScores>(INITIAL_TARGETS);
  const [targetsInitialized, setTargetsInitialized] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const scores = useMemo(() => calcAllScores(answers), [answers]);
  const overall = useMemo(() => calcOverallScore(scores), [scores]);
  const gaps = useMemo(() => calcGaps(scores, targets), [scores, targets]);
  const strengths = useMemo(() => getStrengths(answers), [answers]);
  const priorityTheme = useMemo(() => getPriorityTheme(scores, gaps), [scores, gaps]);
  const misalignment = useMemo(() => getMisalignmentMessage(scores), [scores]);
  const plans = useMemo(() => getPlanProposals(overall, gaps), [overall, gaps]);
  const typeProfile = useMemo(() => getTypeProfile(scores), [scores]);

  const goTo = (next: Step) => {
    setStep(next);
    scrollToTop();
  };

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleTargetChange = (domain: Domain, value: number) => {
    setTargets((prev) => ({ ...prev, [domain]: value }));
  };

  const handleGoToTarget = () => {
    if (!targetsInitialized) {
      setTargets({
        identity: Math.min(100, scores.identity + 15),
        presence: Math.min(100, scores.presence + 15),
        action: Math.min(100, scores.action + 15),
      });
      setTargetsInitialized(true);
    }
    goTo("target");
  };

  // 初回のみ「診断中…」演出を挟む（目標を編集し直したときは直接結果へ）
  const handleShowResult = () => {
    if (hasAnalyzed) {
      goTo("result");
    } else {
      setHasAnalyzed(true);
      goTo("analyzing");
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setBasicInfo(INITIAL_BASIC_INFO);
    setTargets(INITIAL_TARGETS);
    setTargetsInitialized(false);
    setHasAnalyzed(false);
    goTo("top");
  };

  return (
    <main className="min-h-screen bg-white">
      {step !== "top" && (
        <div className="text-center pt-6">
          <span className="text-[11px] tracking-[0.25em] text-gold font-serif">RE:IDENTITY</span>
        </div>
      )}

      {step === "top" && <StepTop onStart={() => goTo("notice")} />}

      {step === "notice" && <StepNotice onNext={() => goTo("basicInfo")} onBack={() => goTo("top")} />}

      {step === "basicInfo" && (
        <StepBasicInfo
          basicInfo={basicInfo}
          onChange={setBasicInfo}
          onNext={() => goTo("questions")}
          onBack={() => goTo("notice")}
        />
      )}

      {step === "questions" && (
        <StepQuestions
          answers={answers}
          onChange={handleAnswerChange}
          onNext={handleGoToTarget}
          onBack={() => goTo("basicInfo")}
        />
      )}

      {step === "target" && (
        <StepTargetScore
          scores={scores}
          targets={targets}
          onChange={handleTargetChange}
          onNext={handleShowResult}
          onBack={() => goTo("questions")}
        />
      )}

      {step === "analyzing" && <StepAnalyzing onDone={() => goTo("result")} />}

      {step === "result" && (
        <StepResult
          basicInfo={basicInfo}
          scores={scores}
          targets={targets}
          gaps={gaps}
          overall={overall}
          typeProfile={typeProfile}
          strengths={strengths}
          priorityTheme={priorityTheme}
          misalignment={misalignment}
          plans={plans}
          onGoToCTA={() => goTo("cta")}
          onRestart={handleRestart}
          onBack={() => goTo("target")}
        />
      )}

      {step === "cta" && <StepCTA nickname={basicInfo.nickname} onBack={() => goTo("result")} />}
    </main>
  );
}
