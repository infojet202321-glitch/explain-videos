import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENES } from "../data";
import { Shiba } from "../Shiba";
import { COLORS, FONT } from "../theme";
import { isTalking, Subtitles, useEnter } from "../ui";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { thanks, cta, cues } = SCENES.outro;

  const title = useEnter(0);
  const button = spring({ frame: frame - 10, fps, config: { damping: 9, mass: 0.6 } });
  const pulse = 1 + Math.max(0, Math.sin((frame - 30) / 6)) * 0.03;
  const mascot = spring({ frame: frame - 4, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <div
        style={{
          position: "absolute",
          top: 140,
          width: "100%",
          textAlign: "center",
          color: COLORS.white,
          fontSize: 84,
          fontWeight: 900,
          letterSpacing: "0.06em",
          opacity: title,
          transform: `translateY(${(1 - title) * -20}px)`,
        }}
      >
        {thanks}
      </div>
      <div style={{ position: "absolute", top: 290, width: "100%", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: COLORS.yellow,
            color: "#1B1F3A",
            fontSize: 54,
            fontWeight: 900,
            padding: "22px 64px",
            borderRadius: 999,
            boxShadow: "0 0 40px rgba(255,210,26,0.45), 0 10px 0 rgba(0,0,0,0.25)",
            transform: `scale(${button * pulse})`,
          }}
        >
          {cta}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -60,
          transform: `translateX(-50%) translateY(${(1 - mascot) * 500}px)`,
        }}
      >
        <Shiba width={500} talking={isTalking(cues, frame)} />
      </div>
      <Subtitles cues={cues} bottom={30} />
    </AbsoluteFill>
  );
};
