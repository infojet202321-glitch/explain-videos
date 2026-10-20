import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { SCENES } from "../data";
import { COLORS, FONT, HEADER_HEIGHT } from "../theme";
import { CornerShiba, Header, Subtitles, useEnter } from "../ui";

const formatPct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;

const IndexCard: React.FC<{
  row: (typeof SCENES.indices.rows)[number];
  delay: number;
}> = ({ row, delay }) => {
  const enter = useEnter(delay);
  return (
    <div
      style={{
        width: 940,
        height: 140,
        background: COLORS.card,
        borderRadius: 18,
        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        marginBottom: 32,
        color: COLORS.cardText,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -60}px)`,
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, width: 330 }}>{row.name}</div>
      <div style={{ fontSize: 54, fontWeight: 700, flex: 1, textAlign: "right", paddingRight: 44 }}>
        {row.value}
      </div>
      <div
        style={{
          background: COLORS.down,
          color: COLORS.white,
          fontSize: 40,
          fontWeight: 700,
          borderRadius: 10,
          padding: "6px 18px",
          minWidth: 170,
          textAlign: "center",
        }}
      >
        {formatPct(row.change)}
      </div>
    </div>
  );
};

const WeeklyChart: React.FC = () => {
  const { rows } = SCENES.indices;
  const title = useEnter(26);
  const max = Math.max(...rows.map((r) => Math.abs(r.weekly)));
  return (
    <div style={{ position: "absolute", left: 1110, top: HEADER_HEIGHT + 90, opacity: title }}>
      <div style={{ color: COLORS.yellow, fontSize: 40, fontWeight: 700, marginBottom: 28 }}>
        週間騰落率
      </div>
      {rows.map((r, i) => (
        <WeeklyRow key={r.short} label={r.short} value={r.weekly} max={max} delay={32 + i * 6} />
      ))}
    </div>
  );
};

const WeeklyRow: React.FC<{ label: string; value: number; max: number; delay: number }> = ({
  label,
  value,
  max,
  delay,
}) => {
  const grow = useEnter(delay);
  const width = (Math.abs(value) / max) * 260 * grow;
  return (
    <div style={{ display: "flex", alignItems: "center", height: 64 }}>
      <div style={{ width: 200, textAlign: "right", color: COLORS.text, fontSize: 32, fontWeight: 700 }}>
        {label}
      </div>
      <div style={{ width: 290, display: "flex", justifyContent: "flex-end", paddingRight: 0 }}>
        <div
          style={{
            width,
            height: 34,
            borderRadius: 8,
            background: `linear-gradient(90deg, ${COLORS.downLight}, ${COLORS.down})`,
            boxShadow: "0 0 14px rgba(229,72,59,0.45)",
          }}
        />
      </div>
      <div style={{ width: 2, height: 52, background: "rgba(255,255,255,0.25)" }} />
      <div
        style={{
          marginLeft: 16,
          color: COLORS.downText,
          fontSize: 32,
          fontWeight: 700,
          opacity: interpolate(grow, [0.6, 1], [0, 1], { extrapolateLeft: "clamp" }),
        }}
      >
        {value.toFixed(1)}%
      </div>
    </div>
  );
};

export const IndicesScene: React.FC = () => {
  const { header, rows, cues } = SCENES.indices;
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <Header title={header} />
      <div style={{ position: "absolute", left: 62, top: HEADER_HEIGHT + 80 }}>
        {rows.map((r, i) => (
          <IndexCard key={r.name} row={r} delay={6 + i * 6} />
        ))}
      </div>
      <WeeklyChart />
      <CornerShiba cues={cues} />
      <Subtitles cues={cues} rightInset={330} />
    </AbsoluteFill>
  );
};
