import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { EPISODE, SCENES } from "../data";
import { Shiba } from "../Shiba";
import { COLORS, FONT } from "../theme";
import { isTalking, Subtitles } from "../ui";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cues } = SCENES.title;

  const tag = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 15 });
  const headline = spring({ frame: frame - 6, fps, config: { damping: 11, mass: 0.8 } });
  const mascot = spring({ frame: frame - 12, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
          color: COLORS.text,
          fontSize: 64,
          fontWeight: 700,
          opacity: tag,
          transform: `translateY(${(1 - tag) * -20}px)`,
        }}
      >
        【米国株 {EPISODE.shortDate}】
      </div>
      <div
        style={{
          position: "absolute",
          top: 310,
          width: "100%",
          textAlign: "center",
          color: COLORS.yellow,
          fontSize: 172,
          fontWeight: 900,
          letterSpacing: "0.04em",
          textShadow: "0 0 40px rgba(255,210,26,0.35), 0 8px 0 rgba(0,0,0,0.25)",
          transform: `scale(${0.6 + headline * 0.4})`,
          opacity: Math.min(1, headline * 1.5),
        }}
      >
        {EPISODE.headline}
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: -120,
          transform: `translateX(-50%) translateY(${(1 - mascot) * 500}px)`,
        }}
      >
        <Shiba width={520} talking={isTalking(cues, frame)} />
      </div>
      <Subtitles cues={cues} bottom={44} />
    </AbsoluteFill>
  );
};
