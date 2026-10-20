import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SCENES } from "../data";
import { COLORS, FONT, HEADER_HEIGHT } from "../theme";
import { CornerShiba, Header, Subtitles, useEnter } from "../ui";

const MAX_BAR = 420;

const Bar: React.FC<{ name: string; change: number; max: number; delay: number }> = ({
  name,
  change,
  max,
  delay,
}) => {
  const grow = useEnter(delay);
  const width = (Math.abs(change) / max) * MAX_BAR * grow;
  return (
    <div style={{ display: "flex", alignItems: "center", height: 96 }}>
      <div style={{ width: 330, textAlign: "right", color: COLORS.text, fontSize: 44, fontWeight: 700 }}>
        {name}
      </div>
      <div style={{ width: MAX_BAR + 50, display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            width,
            height: 64,
            borderRadius: 10,
            background: `linear-gradient(90deg, ${COLORS.downLight}, ${COLORS.down})`,
            boxShadow: "0 0 22px rgba(229,72,59,0.45)",
          }}
        />
      </div>
      <div style={{ width: 2, height: 96, background: "rgba(255,255,255,0.25)" }} />
      <div
        style={{
          marginLeft: 20,
          color: COLORS.downText,
          fontSize: 42,
          fontWeight: 700,
          opacity: interpolate(grow, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" }),
        }}
      >
        {change.toFixed(1)}%
      </div>
    </div>
  );
};

const ReasonsCard: React.FC = () => {
  const { reasonsTitle, reasons, reasonsAt } = SCENES.semis;
  const enter = useEnter(reasonsAt, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: 1250,
        top: HEADER_HEIGHT + 150,
        width: 590,
        padding: "44px 48px",
        background: COLORS.card,
        borderRadius: 26,
        boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
        color: COLORS.cardText,
        opacity: enter,
        transform: `scale(${0.85 + enter * 0.15})`,
      }}
    >
      <div style={{ fontSize: 50, fontWeight: 900, marginBottom: 24 }}>{reasonsTitle}</div>
      {reasons.map((r) => (
        <div key={r} style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.6 }}>
          {r}
        </div>
      ))}
    </div>
  );
};

export const SemisScene: React.FC = () => {
  const { header, rows, cues } = SCENES.semis;
  const max = Math.max(...rows.map((r) => Math.abs(r.change)));
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Header title={header} />
      <div style={{ position: "absolute", left: 40, top: HEADER_HEIGHT + 90 }}>
        {rows.map((r, i) => (
          <Bar key={r.name} name={r.name} change={r.change} max={max} delay={8 + i * 6} />
        ))}
      </div>
      <ReasonsCard />
      <CornerShiba cues={cues} />
      <Subtitles cues={cues} rightInset={330} />
    </AbsoluteFill>
  );
};
