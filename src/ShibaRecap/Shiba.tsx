import React from "react";
import { useCurrentFrame } from "remotion";
import { COLORS } from "./theme";

const O = COLORS.outline;
const SW = 6;

// Suit-wearing Shiba mascot. `talking` animates the mouth, and it blinks on its own.
export const Shiba: React.FC<{ width: number; talking?: boolean }> = ({
  width,
  talking = false,
}) => {
  const frame = useCurrentFrame();

  const blinkPhase = frame % 96;
  const blink = blinkPhase >= 90 ? 0.12 : 1;

  const mouthOpen = talking ? (Math.sin(frame * 0.85) + 1) / 2 : 0;
  const bob = Math.sin(frame / 18) * 3;

  return (
    <svg
      width={width}
      height={(width * 480) / 400}
      viewBox="0 0 400 480"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* Body */}
      <g>
        <path
          d="M40,500 C40,390 95,322 200,312 C305,322 360,390 360,500 Z"
          fill={COLORS.suit}
          stroke={O}
          strokeWidth={SW}
        />
        <path d="M156,300 L200,400 L244,300 Z" fill="#FFFFFF" stroke={O} strokeWidth={5} strokeLinejoin="round" />
        <path d="M186,318 L214,318 L209,340 L191,340 Z" fill={COLORS.tie} stroke={O} strokeWidth={4} strokeLinejoin="round" />
        <path d="M191,340 L209,340 L218,425 L200,446 L182,425 Z" fill={COLORS.tie} stroke={O} strokeWidth={4} strokeLinejoin="round" />
        <path
          d="M152,298 L126,350 L150,362 L136,378 L196,470 L174,372 Z"
          fill={COLORS.suitDark}
          stroke={O}
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path
          d="M248,298 L274,350 L250,362 L264,378 L204,470 L226,372 Z"
          fill={COLORS.suitDark}
          stroke={O}
          strokeWidth={5}
          strokeLinejoin="round"
        />
      </g>

      {/* Head */}
      <g transform={`translate(0 ${bob}) rotate(${Math.sin(frame / 27) * 1.5} 200 300)`}>
        <path d="M80,138 L104,4 L194,72 Z" fill={COLORS.fur} stroke={O} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M320,138 L296,4 L206,72 Z" fill={COLORS.fur} stroke={O} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M100,112 L114,36 L166,76 Z" fill={COLORS.earInner} />
        <path d="M300,112 L286,36 L234,76 Z" fill={COLORS.earInner} />

        <path
          d="M200,58 C292,58 334,112 334,186 C334,262 278,306 200,306 C122,306 66,262 66,186 C66,112 108,58 200,58 Z"
          fill={COLORS.fur}
          stroke={O}
          strokeWidth={SW}
        />
        {/* White mask */}
        <path
          d="M84,208 C98,160 146,150 176,180 C186,168 214,168 224,180 C254,150 302,160 316,208 C306,268 262,300 200,300 C138,300 94,268 84,208 Z"
          fill="#FFFFFF"
        />
        <ellipse cx={154} cy={132} rx={16} ry={10} fill="#FFFFFF" transform="rotate(-12 154 132)" />
        <ellipse cx={246} cy={132} rx={16} ry={10} fill="#FFFFFF" transform="rotate(12 246 132)" />

        {/* Eyes */}
        <g transform={`translate(0 ${166 * (1 - blink)}) scale(1 ${blink})`}>
          <ellipse cx={158} cy={166} rx={12} ry={9} fill={O} />
          <ellipse cx={242} cy={166} rx={12} ry={9} fill={O} />
          <circle cx={162} cy={163} r={3} fill="#FFFFFF" />
          <circle cx={246} cy={163} r={3} fill="#FFFFFF" />
        </g>
        <path d="M140,154 Q158,146 176,156" stroke={O} strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d="M260,154 Q242,146 224,156" stroke={O} strokeWidth={4} fill="none" strokeLinecap="round" />

        {/* Nose + mouth */}
        <path d="M183,200 Q200,192 217,200 Q216,214 200,220 Q184,214 183,200 Z" fill={O} />
        <ellipse cx={194} cy={200} rx={5} ry={2.5} fill="#5a5a5a" />
        <path d="M200,220 L200,232" stroke={O} strokeWidth={5} strokeLinecap="round" />
        {mouthOpen > 0.05 ? (
          <g>
            <path
              d={`M174,232 Q200,${238 + mouthOpen * 34} 226,232 Q200,${236} 174,232 Z`}
              fill="#7A2626"
              stroke={O}
              strokeWidth={4}
              strokeLinejoin="round"
            />
            <ellipse cx={200} cy={234 + mouthOpen * 18} rx={10} ry={4 + mouthOpen * 4} fill="#F08A8A" />
          </g>
        ) : null}
        <path
          d="M168,226 Q184,248 200,232 Q216,248 232,226"
          stroke={O}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
