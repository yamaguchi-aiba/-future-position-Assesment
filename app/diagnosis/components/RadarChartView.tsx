"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { DomainScores } from "../types";
import { DOMAIN_LABELS, DOMAIN_ORDER } from "../lib/questions";

interface RadarChartViewProps {
  scores: DomainScores;
  targets: DomainScores;
}

export default function RadarChartView({ scores, targets }: RadarChartViewProps) {
  const data = DOMAIN_ORDER.map((domain) => ({
    subject: DOMAIN_LABELS[domain].en,
    現在: scores[domain],
    目標: targets[domain],
  }));

  return (
    <div className="w-full h-[300px] sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "var(--navy)", fontSize: 12, fontFamily: "var(--font-serif)" }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "var(--text-muted)", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="目標"
            dataKey="目標"
            stroke="var(--navy)"
            fill="var(--navy)"
            fillOpacity={0.08}
            strokeDasharray="4 3"
            strokeWidth={1.5}
          />
          <Radar
            name="現在"
            dataKey="現在"
            stroke="var(--gold-deep)"
            fill="var(--gold)"
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "var(--text)" }}
            iconType="circle"
          />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
