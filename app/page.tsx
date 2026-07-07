import Image from "next/image";
import { GoldFlourishHero, GoldFlourishBand } from "./components/GoldFlourish";
import { ScrollReveal } from "./components/ScrollReveal";

/* ─── Reusable sub-components ─────────────────────────────────────── */

function GoldCircleNumber({ n }: { n: number }) {
  return (
    <div className="gold-circle mx-auto mb-4">
      {n}
    </div>
  );
}

function GoldCheck() {
  return (
    <span
      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
      style={{ border: "1.5px solid #C2A35E" }}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
        <path d="M1 4L3.5 6.5L9 1" stroke="#C2A35E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function SectionLabel({ text }: { text: string }) {
  return <p className="section-label">{text}</p>;
}

function GoldDivider() {
  return <div className="gold-divider" />;
}

function Chevron() {
  return (
    <div
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
      style={{ border: "1px solid #C2A35E" }}
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M2 2L6 6L2 10" stroke="#C2A35E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main style={{ fontFamily: "var(--font-noto-serif-jp), 'Yu Mincho', serif" }}>

      {/* ══════════════════════════════════════════════
          Section 1 — ヒーロー
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#FFFFFF", minHeight: "620px" }}
      >
        <div className="max-w-6xl mx-auto px-8 py-16 flex items-center gap-0">

          {/* Left: Text */}
          <div className="flex-1 pr-12 z-10 relative" style={{ flex: "0 0 60%" }}>
            <ScrollReveal delay={0}>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant), 'EB Garamond', 'Times New Roman', serif",
                  fontSize: "clamp(42px, 5vw, 64px)",
                  letterSpacing: "0.22em",
                  color: "#11203F",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  margin: 0,
                  marginBottom: "20px",
                }}
              >
                RE:IDENTITY
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <p
                style={{
                  fontSize: "clamp(18px, 2vw, 26px)",
                  color: "#1A2A4E",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  marginBottom: "20px",
                }}
              >
                本当のわたしが、選ばれるわたしになる。
              </p>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <GoldDivider />
            </ScrollReveal>

            <ScrollReveal delay={360}>
              <p
                style={{
                  fontSize: "15px",
                  color: "#3A4256",
                  lineHeight: 1.9,
                  marginTop: "18px",
                }}
              >
                自己認知と他者認知を一致させ、<br />
                一貫した存在感で、信頼と機会を引き寄せる。
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Portrait + flourish */}
          <div
            className="relative"
            style={{ flex: "0 0 40%", minHeight: "520px" }}
          >
            <GoldFlourishHero />
            <div className="relative z-10 flex justify-center items-end h-full pt-4">
              <Image
                src="/images/01_hero_person_mori_yuka.png"
                alt="森永ゆか"
                width={420}
                height={520}
                className="object-contain object-bottom"
                style={{ maxHeight: "500px", width: "auto" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* bottom gold line */}
        <div style={{ height: "1px", background: "#C7B698", opacity: 0.6 }} />
      </section>

      {/* ══════════════════════════════════════════════
          Section 2 — 課題提起（3カラム）
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="grid gap-10"
            style={{ gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}
          >
            {/* Col 1: Gap diagram */}
            <ScrollReveal delay={0}>
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    lineHeight: 1.7,
                    marginBottom: "28px",
                  }}
                >
                  そのギャップが、あなたの可能性を静かに下げている。
                </h3>

                <div className="flex items-center justify-center gap-4 mb-6">
                  {/* 自己認知 oval */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: "90px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "1.5px solid #AEB8C6",
                        background: "rgba(174,184,198,0.12)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <Image
                        src="/images/06_self_recognition_circle_icon.png"
                        alt="自己認知"
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <p style={{ fontSize: "11px", color: "#8A8F9C", textAlign: "center", lineHeight: 1.4 }}>
                      <strong style={{ color: "#1A2A4E", fontSize: "12px" }}>自己認知</strong><br />
                      自分が思う自分
                    </p>
                  </div>

                  {/* Gap arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <Image
                      src="/images/08_gap_dotted_arrow.png"
                      alt="ギャップ"
                      width={50}
                      height={28}
                      className="object-contain"
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#C2A35E",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      ギャップ
                    </span>
                  </div>

                  {/* 他者認知 oval */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: "90px",
                        height: "120px",
                        borderRadius: "50%",
                        border: "1.5px solid #AEB8C6",
                        background: "rgba(174,184,198,0.12)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                      }}
                    >
                      <Image
                        src="/images/07_other_recognition_circle_icon.png"
                        alt="他者認知"
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <p style={{ fontSize: "11px", color: "#8A8F9C", textAlign: "center", lineHeight: 1.4 }}>
                      <strong style={{ color: "#1A2A4E", fontSize: "12px" }}>他者認知</strong><br />
                      周りが見るあなた
                    </p>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "#3A4256", lineHeight: 1.8, textAlign: "center" }}>
                  このズレが、伝わり方・信頼・機会の差になります。
                </p>
              </div>
            </ScrollReveal>

            {/* Vertical divider */}
            <div style={{ background: "#E8E6DF", alignSelf: "stretch" }} />

            {/* Col 2: Checklist */}
            <ScrollReveal delay={120}>
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  こんな課題、ありませんか？
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {[
                    "自分の強みや価値をうまく言語化できない",
                    "頑張っているのに、正しく評価されない",
                    "発信やプレゼンで、魅力が伝わりきらない",
                    "やりたいことと、周りの期待にズレがある",
                    "キャリアや事業の方向性に自信が持てない",
                  ].map((item, i) => (
                    <li key={i} className="gold-check-item">
                      <GoldCheck />
                      <span style={{ fontSize: "14px" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Vertical divider */}
            <div style={{ background: "#E8E6DF", alignSelf: "stretch" }} />

            {/* Col 3: Iceberg */}
            <ScrollReveal delay={240}>
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    lineHeight: 1.7,
                    marginBottom: "20px",
                  }}
                >
                  人の認知は、見える一部だけでは決まらない。
                </h3>

                <div className="flex items-start gap-4 mb-5">
                  <Image
                    src="/images/05_iceberg_illustration.png"
                    alt="氷山図"
                    width={110}
                    height={150}
                    className="object-contain flex-shrink-0"
                  />
                  <div>
                    <div className="mb-3">
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#1A2A4E",
                          marginBottom: "3px",
                        }}
                      >
                        表層（見える部分）
                      </p>
                      <p style={{ fontSize: "12px", color: "#3A4256", lineHeight: 1.6 }}>
                        スキル・実績・肩書き<br />話し方・立ち居振る舞い
                      </p>
                    </div>
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(174,184,198,0.6)",
                        margin: "8px 0",
                      }}
                    />
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#8A8F9C",
                          marginBottom: "3px",
                        }}
                      >
                        本質（見えにくい部分）
                      </p>
                      <p style={{ fontSize: "12px", color: "#8A8F9C", lineHeight: 1.6 }}>
                        価値観・想い・強み<br />ストーリー・信念
                      </p>
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: "13px", color: "#3A4256", lineHeight: 1.8 }}>
                  本質が一貫してこそ、魅力は伝わり、信頼に変わる。
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 3 — RE:IDENTITY とは
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#F9F9F8", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="grid gap-12"
            style={{ gridTemplateColumns: "1fr 1.2fr", alignItems: "start" }}
          >
            {/* Left */}
            <ScrollReveal delay={0}>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "13px",
                    color: "#8A8F9C",
                    letterSpacing: "0.2em",
                    marginBottom: "6px",
                  }}
                >
                  RE:IDENTITY
                </p>
                <h2
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 28px)",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    marginBottom: "20px",
                    lineHeight: 1.4,
                  }}
                >
                  RE:IDENTITY とは
                </h2>
                <GoldDivider />
                <p
                  style={{
                    fontSize: "18px",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    lineHeight: 1.6,
                    margin: "20px 0 16px",
                  }}
                >
                  自己認知 × 他者認知 を一致させる
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#3A4256",
                    lineHeight: 1.95,
                  }}
                >
                  本質（価値観・強み・ストーリー）を言語化し、外見・振る舞い・発信を最適化。内側と外側の一貫性をつくり、選ばれる存在感をデザインするプログラムです。
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Comparison table */}
            <ScrollReveal delay={150}>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    marginBottom: "16px",
                    lineHeight: 1.7,
                  }}
                >
                  なぜ「自己認知」と「他者認知」の両方が必要なのか？
                </p>
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>自己認知</th>
                      <th>他者認知</th>
                      <th>両方を満たすと</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>強み・価値の理解</td>
                      <td>伝わり方・印象</td>
                      <td>正しく伝わり、信頼される</td>
                    </tr>
                    <tr>
                      <td>意思決定の軸になる</td>
                      <td>社会との接点になる</td>
                      <td>一貫性が生まれ、ブレない</td>
                    </tr>
                    <tr>
                      <td>内側の納得感</td>
                      <td>外からの評価・共感</td>
                      <td>機会とご縁が引き寄せられる</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 4 — 私たちがつくる価値（バンド）
      ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#F9F9F8", padding: "64px 0", borderTop: "1px solid #E8E6DF", borderBottom: "1px solid #E8E6DF" }}
      >
        <GoldFlourishBand />
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <ScrollReveal delay={0}>
            <SectionLabel text="私たちがつくる価値" />
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 42px)",
                color: "#1A2A4E",
                fontWeight: 600,
                lineHeight: 1.4,
                marginBottom: "14px",
              }}
            >
              覚えてもらえる人になる。
            </h2>
            <p style={{ fontSize: "15px", color: "#3A4256", lineHeight: 1.9 }}>
              一貫した存在感は、信頼を生み、未来の機会を連れてくる。
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 5 — RE:IDENTITY 5つのステップ
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal delay={0}>
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "13px",
                  color: "#8A8F9C",
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                }}
              >
                5 STEPS
              </p>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.8vw, 30px)",
                  color: "#1A2A4E",
                  fontWeight: 600,
                }}
              >
                RE:IDENTITY 5つのステップ
              </h2>
            </div>
          </ScrollReveal>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {[
              { n: 1, title: "現状の可視化", desc: "自己認知・他者認知のギャップを可視化し、課題を明確にする" },
              { n: 2, title: "本質の言語化", desc: "価値観・強み・ストーリーを深掘りし、あなただけのコアを言語化する" },
              { n: 3, title: "一貫性の設計", desc: "メッセージ・ビジュアル・振る舞いを一貫した設計に落とし込む" },
              { n: 4, title: "発信・体現", desc: "プロフィール・発信・プレゼン・日常の体現で存在感を届ける" },
              { n: 5, title: "検証・最適化", desc: "反応・成果を検証し、より伝わる形へ磨き上げていく" },
            ].map((step, i) => (
              <ScrollReveal key={step.n} delay={i * 100}>
                <div className="text-center px-2">
                  <GoldCircleNumber n={step.n} />
                  <h4
                    style={{
                      fontSize: "15px",
                      color: "#1A2A4E",
                      fontWeight: 600,
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ fontSize: "12px", color: "#3A4256", lineHeight: 1.8 }}>
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 6 — 私たちがやること（アイコン5列）
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#F9F9F8", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal delay={0}>
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "13px",
                  color: "#8A8F9C",
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                }}
              >
                OUR SERVICE
              </p>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.8vw, 30px)",
                  color: "#1A2A4E",
                  fontWeight: 600,
                }}
              >
                私たちがやること
              </h2>
            </div>
          </ScrollReveal>

          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
          >
            {[
              {
                icon: "/images/12_icon_diagnosis_hearing.png",
                title: "徹底ヒアリング",
                desc: "本質を深く理解する",
              },
              {
                icon: "/images/13_icon_wording_support.png",
                title: "言語化サポート",
                desc: "強み・価値・ストーリーを整理",
              },
              {
                icon: "/images/14_icon_branding_design.png",
                title: "ブランディング設計",
                desc: "一貫した世界観をデザイン",
              },
              {
                icon: "/images/15_icon_profile_optimization.png",
                title: "発信・見せ方の最適化",
                desc: "プロフィール・SNS・資料等",
              },
              {
                icon: "/images/16_icon_delivery_support.png",
                title: "伴走サポート",
                desc: "行動・発信を支援し続ける",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div
                  className="text-center px-3 py-8 rounded-lg"
                  style={{ background: "#FFFFFF", border: "1px solid #E8E6DF" }}
                >
                  <div className="flex justify-center mb-4">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={52}
                      height={52}
                      className="object-contain"
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: "14px",
                      color: "#1A2A4E",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "12px", color: "#8A8F9C", lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 7 — Before/After + こんな方に
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="grid gap-16"
            style={{ gridTemplateColumns: "1fr 1fr", alignItems: "start" }}
          >
            {/* Left: Before/After */}
            <ScrollReveal delay={0}>
              <div>
                <SectionLabel text="変化のイメージ" />
                <h2
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    marginBottom: "28px",
                  }}
                >
                  変化のイメージ
                </h2>

                <div className="flex flex-col items-center gap-0">
                  {/* BEFORE card */}
                  <div
                    className="w-full rounded-lg p-6"
                    style={{
                      background: "#F5F5F5",
                      border: "1px solid #E0E0E0",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-cormorant), serif",
                        letterSpacing: "0.2em",
                        color: "#9A9A9A",
                        marginBottom: "12px",
                        fontWeight: 600,
                      }}
                    >
                      BEFORE
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {[
                        "自信が持てず、発信が苦手",
                        "強みが曖昧で、伝わらない",
                        "評価や機会が安定しない",
                        "頑張っているのに空回り",
                      ].map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: "13px",
                            color: "#888",
                            lineHeight: 1.8,
                            padding: "6px 0",
                            borderBottom: i < 3 ? "1px solid #E8E8E8" : "none",
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center py-4">
                    <Image
                      src="/images/11_change_arrow.png"
                      alt="変化の矢印"
                      width={44}
                      height={44}
                      className="object-contain"
                    />
                  </div>

                  {/* AFTER card */}
                  <div
                    className="w-full rounded-lg p-6"
                    style={{
                      background: "#FFFFFF",
                      border: "1.5px solid #C2A35E",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontFamily: "var(--font-cormorant), serif",
                        letterSpacing: "0.2em",
                        color: "#C2A35E",
                        marginBottom: "12px",
                        fontWeight: 700,
                      }}
                    >
                      AFTER
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {[
                        "自分の軸に自信が持てる",
                        "強みや想いが、自然と伝わる",
                        "信頼され、指名や相談が増える",
                        "やりたいことで成果が出る",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3"
                          style={{
                            fontSize: "13px",
                            color: "#1A2A4E",
                            lineHeight: 1.8,
                            padding: "6px 0",
                            borderBottom: i < 3 ? "1px solid #E8E6DF" : "none",
                            fontWeight: 500,
                          }}
                        >
                          <GoldCheck />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: こんな方におすすめ */}
            <ScrollReveal delay={150}>
              <div>
                <SectionLabel text="こんな方におすすめ" />
                <h2
                  style={{
                    fontSize: "clamp(20px, 2vw, 24px)",
                    color: "#1A2A4E",
                    fontWeight: 600,
                    marginBottom: "28px",
                  }}
                >
                  こんな方におすすめ
                </h2>
                <GoldDivider />
                <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0" }}>
                  {[
                    "起業家・経営者・フリーランスの方",
                    "専門性や強みを活かして事業を伸ばしたい方",
                    "発信やプレゼンで、もっと伝わるようになりたい方",
                    "キャリアの転機を迎え、次のステージへ進みたい方",
                    "自分らしく、影響力のある存在になりたい方",
                  ].map((item, i) => (
                    <li key={i} className="gold-check-item">
                      <GoldCheck />
                      <span style={{ fontSize: "14px" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 8 — PROVIDER
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#F9F9F8", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal delay={0}>
            <div className="text-center mb-12">
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  color: "#1A2A4E",
                  fontWeight: 500,
                  letterSpacing: "0.25em",
                }}
              >
                PROVIDER
              </h2>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: "#C7B698",
                  margin: "12px auto 0",
                }}
              />
            </div>
          </ScrollReveal>

          <div
            className="grid gap-12"
            style={{ gridTemplateColumns: "1fr 1fr" }}
          >
            {/* Provider 1: 山口裕也 */}
            <ScrollReveal delay={0}>
              <div className="provider-card">
                <div className="flex-shrink-0">
                  <div
                    style={{
                      width: "140px",
                      height: "140px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid #E8E6DF",
                    }}
                  >
                    <Image
                      src="/images/02_provider_person_yamaguchi_yuya.png"
                      alt="山口裕也"
                      width={140}
                      height={140}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "11px",
                      color: "#8A8F9C",
                      letterSpacing: "0.15em",
                      marginBottom: "4px",
                    }}
                  >
                    Yuya Yamaguchi
                  </p>
                  <h3
                    style={{
                      fontSize: "20px",
                      color: "#1A2A4E",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    山口 裕也
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A8854C",
                      marginBottom: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    ブランディングプロデューサー／戦略設計
                  </p>
                  <p style={{ fontSize: "13px", color: "#3A4256", lineHeight: 1.85, marginBottom: "14px" }}>
                    一貫したブランド戦略と、伝わる仕組みづくりの専門家。事業の価値を言語化し、選ばれるブランドへ導きます。
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px 8px",
                      fontSize: "12px",
                      color: "#8A8F9C",
                    }}
                  >
                    {["ブランド戦略設計", "コンセプト開発", "言語化・メッセージ設計", "発信導線設計"].map((s, i) => (
                      <span key={i}>・{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Provider 2: 森永ゆか */}
            <ScrollReveal delay={150}>
              <div className="provider-card">
                <div className="flex-shrink-0">
                  <div
                    style={{
                      width: "140px",
                      height: "160px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid #E8E6DF",
                      position: "relative",
                    }}
                  >
                    <Image
                      src="/images/01_hero_person_mori_yuka.png"
                      alt="森永ゆか"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 20%" }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "11px",
                      color: "#8A8F9C",
                      letterSpacing: "0.15em",
                      marginBottom: "4px",
                    }}
                  >
                    Yuka Morinaga
                  </p>
                  <h3
                    style={{
                      fontSize: "20px",
                      color: "#1A2A4E",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    森永 ゆか
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A8854C",
                      marginBottom: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    印象ブランディングコーチ／表現プロデューサー
                  </p>
                  <p style={{ fontSize: "13px", color: "#3A4256", lineHeight: 1.85, marginBottom: "14px" }}>
                    外見・立ち居振る舞い・コミュニケーションを最適化し、魅力と信頼を伝わる形にプロデュースします。
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "4px 8px",
                      fontSize: "12px",
                      color: "#8A8F9C",
                    }}
                  >
                    {["印象・立ち居振る舞い設計", "ビジュアル提案", "話し方・プレゼン指導", ""].map((s, i) => (
                      s ? <span key={i}>・{s}</span> : <span key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Why 2 people band */}
          <ScrollReveal delay={200}>
            <div
              className="mt-14 rounded-lg p-8"
              style={{ background: "#FFFFFF", border: "1px solid #E8E6DF" }}
            >
              <div
                className="grid gap-8"
                style={{ gridTemplateColumns: "auto 1fr", alignItems: "center" }}
              >
                <div className="flex items-center gap-4">
                  {/* Handshake icon SVG */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "1.5px solid #C7B698",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="26" height="22" viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6H5L1 11L5 13H7L11 16H15L19 13L18 10L14 9L11 10L9 6Z" stroke="#C2A35E" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
                      <path d="M15 9L19 8L25 11L21 14L18 13" stroke="#C2A35E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                      <path d="M7 13L9 15L11 16" stroke="#C2A35E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                  <h4
                    style={{
                      fontSize: "16px",
                      color: "#1A2A4E",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    なぜ、私たち2人なのか？
                  </h4>
                </div>
                <p style={{ fontSize: "14px", color: "#3A4256", lineHeight: 1.9 }}>
                  <strong style={{ color: "#1A2A4E" }}>戦略と言語化のプロフェッショナル</strong> ×
                  <strong style={{ color: "#1A2A4E" }}> 印象と表現のプロフェッショナル</strong>。
                  内側の本質から外側の伝わり方まで、両輪で整えることで、一貫性のある「選ばれる存在感」をつくります。
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 9 — BEYOND PRICE の流れ
      ══════════════════════════════════════════════ */}
      <section style={{ background: "#FFFFFF", padding: "80px 0" }}>
        <div className="max-w-6xl mx-auto px-8">
          <ScrollReveal delay={0}>
            <div className="text-center mb-12">
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "13px",
                  color: "#8A8F9C",
                  letterSpacing: "0.2em",
                  marginBottom: "8px",
                }}
              >
                PROCESS
              </p>
              <h2
                style={{
                  fontSize: "clamp(22px, 2.8vw, 30px)",
                  color: "#1A2A4E",
                  fontWeight: 600,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                  }}
                >
                  BEYOND PRICE
                </span>{" "}
                の流れ
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex items-start justify-center gap-2">
            {[
              {
                icon: "/images/17_flow_icon_briefcase_consultation.png",
                n: "01",
                title: "無料相談（30分）",
                desc: "お悩み・目的をヒアリング",
              },
              {
                icon: "/images/18_flow_icon_analysis_proposal.png",
                n: "02",
                title: "現状分析・ご提案",
                desc: "最適なプランをご提案",
              },
              {
                icon: "/images/19_flow_icon_contract_kickoff.png",
                n: "03",
                title: "ご契約・キックオフ",
                desc: "目標設定と計画策定",
              },
              {
                icon: "/images/20_flow_icon_program_execution.png",
                n: "04",
                title: "プログラム実施（約3ヶ月）",
                desc: "伴走しながら実践・改善",
              },
              {
                icon: "/images/21_flow_icon_growth_design.png",
                n: "05",
                title: "成果検証・未来設計",
                desc: "次のステージへ最適化",
              },
            ].map((step, i) => (
              <div key={i} className="flex items-center">
                <ScrollReveal delay={i * 100}>
                  <div
                    className="text-center"
                    style={{ width: "160px", padding: "0 8px" }}
                  >
                    <div
                      className="flex justify-center mb-3"
                      style={{ height: "60px", alignItems: "center" }}
                    >
                      <Image
                        src={step.icon}
                        alt={step.title}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "11px",
                        color: "#C2A35E",
                        letterSpacing: "0.1em",
                        marginBottom: "4px",
                      }}
                    >
                      {step.n}
                    </p>
                    <h4
                      style={{
                        fontSize: "13px",
                        color: "#1A2A4E",
                        fontWeight: 700,
                        marginBottom: "5px",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.title}
                    </h4>
                    <p style={{ fontSize: "11px", color: "#8A8F9C", lineHeight: 1.7 }}>
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
                {i < 4 && (
                  <div className="flex-shrink-0 px-1">
                    <Chevron />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Section 10 — 最終CTAバンド
      ══════════════════════════════════════════════ */}
      <section
        style={{
          background: "#1A2A4E",
          padding: "72px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div
            className="flex items-center justify-between gap-10 flex-wrap"
          >
            <ScrollReveal delay={0}>
              <div>
                <p
                  style={{
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    color: "#C2A35E",
                    fontWeight: 600,
                    marginBottom: "10px",
                    lineHeight: 1.5,
                  }}
                >
                  本当のわたしで、未来を動かす。
                </p>
                <p style={{ fontSize: "15px", color: "#FFFFFF", lineHeight: 1.8 }}>
                  まずは、無料相談でお話ししましょう。
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <a href="#" className="btn-gold" style={{ fontSize: "15px" }}>
                無料相談を申し込む（30分）
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: "1.5px solid #1A2A4E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                    <path d="M1 1.5L5.5 6L1 10.5" stroke="#1A2A4E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#11203F",
          padding: "24px 0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "13px",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.15em",
          }}
        >
          © 2025 RE:IDENTITY. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
