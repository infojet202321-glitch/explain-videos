import React from "react";
import { AbsoluteFill } from "remotion";
import { SCENES } from "../data";
import { COLORS, FONT, HEADER_HEIGHT } from "../theme";
import { CornerShiba, Header, Subtitles, useEnter } from "../ui";

const Bullet: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: 50,
        fontWeight: 700,
        color: COLORS.text,
        height: 92,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -40}px)`,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          background: COLORS.yellow,
          marginRight: 26,
          boxShadow: "0 0 10px rgba(255,210,26,0.7)",
        }}
      />
      {text}
    </div>
  );
};

export const KeywordScene: React.FC = () => {
  const { header, label, keyword, bullets, cues } = SCENES.keyword;
  const labelIn = useEnter(2);
  const kw = useEnter(8, 12);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Header title={header} />
      <div style={{ position: "absolute", left: 80, top: HEADER_HEIGHT + 70 }}>
        <div style={{ color: COLORS.text, fontSize: 44, fontWeight: 700, opacity: labelIn }}>{label}</div>
        <div
          style={{
            color: COLORS.yellow,
            fontSize: 132,
            fontWeight: 900,
            margin: "6px 0 36px -40px",
            textShadow: "0 0 36px rgba(255,210,26,0.3)",
            opacity: kw,
            transform: `scale(${0.8 + kw * 0.2})`,
            transformOrigin: "left center",
          }}
        >
          {keyword}
        </div>
        {bullets.map((b, i) => (
          <Bullet key={b} text={b} delay={30 + i * 14} />
        ))}
      </div>
      <CornerShiba cues={cues} />
      <Subtitles cues={cues} rightInset={330} />
    </AbsoluteFill>
  );
};
