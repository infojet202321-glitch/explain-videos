import React from "react";
import { AbsoluteFill } from "remotion";
import { SCENES } from "../data";
import { COLORS, FONT, HEADER_HEIGHT } from "../theme";
import { CornerShiba, Header, Subtitles, useEnter } from "../ui";

const MacroCard: React.FC<{
  card: (typeof SCENES.macro.cards)[number];
  delay: number;
}> = ({ card, delay }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        width: 700,
        height: 300,
        background: COLORS.card,
        borderRadius: 22,
        boxShadow: "0 14px 34px rgba(0,0,0,0.38)",
        padding: "34px 42px",
        color: COLORS.cardText,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 40}px)`,
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 700 }}>{card.label}</div>
      <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.3 }}>{card.value}</div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: card.tone === "up" ? "#1FA463" : COLORS.down,
        }}
      >
        {card.note}
      </div>
    </div>
  );
};

export const MacroScene: React.FC = () => {
  const { header, cards, cues } = SCENES.macro;
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Header title={header} />
      <div
        style={{
          position: "absolute",
          left: 62,
          top: HEADER_HEIGHT + 50,
          display: "grid",
          gridTemplateColumns: "700px 700px",
          gap: 40,
        }}
      >
        {cards.map((c, i) => (
          <MacroCard key={c.label} card={c} delay={6 + i * 5} />
        ))}
      </div>
      <CornerShiba cues={cues} />
      <Subtitles cues={cues} rightInset={330} />
    </AbsoluteFill>
  );
};
