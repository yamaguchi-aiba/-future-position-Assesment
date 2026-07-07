import type { Metadata } from "next";
import DiagnosisApp from "./diagnosis/DiagnosisApp";

export const metadata: Metadata = {
  title: "現在地診断 | RE:IDENTITY",
  description:
    "Identity・Presence・Actionの3領域で、今のあなたの現在地を可視化する簡易診断です。心理検査や医療的診断ではありません。",
};

export default function Home() {
  return <DiagnosisApp />;
}
