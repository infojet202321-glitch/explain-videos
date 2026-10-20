import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Cue, EPISODE, TOTAL_DURATION } from "./data";
import { COLORS, FONT, HEADER_HEIGHT, WIDTH } from "./theme";
import { Shiba } from "./Shiba";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 90) * 40;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${COLORS.bgFrom} 0%, ${COLORS.bgMid} 55%, ${COLORS.bgTo} 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${82 + drift / 40}% 12%, rgba(255,200,120,0.10) 0%, rgba(255,200,120,0) 28%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 12% 75%, rgba(70,110,255,0.12) 0%, rgba(70,110,255,0) 35%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "48px 48px",
        }}
      />
    </AbsoluteFill>
  );
};

export const ProgressBar: React.FC<{ offset: number }> = ({ offset }) => {
  const frame = useCurrentFrame();
  const progress = (offset + frame) / TOTAL_DURATION;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 8,
        width: WIDTH * progress,
        background: COLORS.yellow,
        boxShadow: "0 0 12px rgba(255,210,26,0.6)",
      }}
    />
  );
};

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 14 });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        background: "rgba(6,11,34,0.55)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 62px",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          color: COLORS.white,
          fontSize: 56,
          fontWeight: 900,
          letterSpacing: "0.02em",
          opacity: enter,
          transform: `translateX(${(1 - enter) * -30}px)`,
        }}
      >
        {title}
      </div>
      <div style={{ color: COLORS.yellow, fontSize: 34, fontWeight: 700 }}>
        {EPISODE.brand}
        <span style={{ color: "rgba(255,255,255,0.45)", margin: "0 12px", fontWeight: 500 }}>|</span>
        {EPISODE.date}
      </div>
    </div>
  );
};

export const activeCue = (cues: Cue[], frame: number) =>
  cues.find((c) => frame >= c.from && frame < c.to);

// The mascot "speaks" for most of each cue, then pauses before the next one.
export const isTalking = (cues: Cue[], frame: number) => {
  const cue = activeCue(cues, frame);
  if (!cue) return false;
  return frame - cue.from < (cue.to - cue.from) * 0.8;
};

export const Subtitles: React.FC<{ cues: Cue[]; bottom?: number; rightInset?: number }> = ({
  cues,
  bottom = 48,
  rightInset = 0,
}) => {
  const frame = useCurrentFrame();
  const cue = activeCue(cues, frame);
  if (!cue) return null;
  const local = frame - cue.from;
  const opacity = interpolate(local, [0, 6], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: rightInset,
        bottom,
        display: "flex",
        justifyContent: "center",
        opacity,
      }}
    >
      <div
        style={{
          maxWidth: 1460 - rightInset,
          background: "rgba(8,12,34,0.82)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "16px 40px",
          color: COLORS.white,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 44,
          lineHeight: 1.45,
          letterSpacing: "0.04em",
          textAlign: "center",
          transform: `translateY(${(1 - opacity) * 8}px)`,
        }}
      >
        {cue.text}
      </div>
    </div>
  );
};

// Small mascot that pops up in the bottom-right corner of data scenes.
export const CornerShiba: React.FC<{ cues: Cue[] }> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 4, fps, config: { damping: 14, mass: 0.7 } });
  return (
    <div
      style={{
        position: "absolute",
        right: 70,
        bottom: -40,
        transform: `translateY(${(1 - pop) * 320}px)`,
      }}
    >
      <Shiba width={250} talking={isTalking(cues, frame)} />
    </div>
  );
};

export const useEnter = (delay: number, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping }, durationInFrames: 18 });
};
