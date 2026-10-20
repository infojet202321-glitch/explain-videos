// All on-screen text and numbers for the episode. Edit here to make a new one.
// Cue timings are in frames (30fps), relative to the start of each scene.

export type Cue = { from: number; to: number; text: string };

export const EPISODE = {
  brand: "柴犬の米国株",
  date: "2026.7.18",
  shortDate: "7/18",
  headline: "半導体、総崩れ",
};

export const SCENES = {
  title: {
    duration: 150,
    cues: [
      { from: 0, to: 62, text: "皆さん、こんにちは！柴犬の米国株です。" },
      { from: 62, to: 150, text: "今日のテーマはずばり、「半導体の総崩れ」です。" },
    ] as Cue[],
  },
  indices: {
    duration: 180,
    header: "主要3指数（7/17終値）",
    rows: [
      { name: "S&P 500", short: "S&P500", value: "7,457.69", change: -1.01, weekly: -1.6 },
      { name: "ナスダック", short: "ナスダック", value: "25,520.24", change: -1.4, weekly: -2.9 },
      { name: "ダウ", short: "ダウ", value: "52,146.42", change: -0.77, weekly: -0.9 },
    ],
    cues: [
      {
        from: 0,
        to: 95,
        text: "S&P500はマイナス1.0%、ナスダックはマイナス1.4%、ダウはマイナス0.8%。",
      },
      { from: 95, to: 180, text: "週間では、ナスダックがマイナス2.9%と、弱さが目立ちました。" },
    ] as Cue[],
  },
  semis: {
    duration: 210,
    header: "半導体セクター、売り止まらず",
    rows: [
      { name: "エヌビディア", change: -2.2 },
      { name: "TSMC", change: -2.8 },
      { name: "ブロードコム", change: -1.0 },
      { name: "AMD", change: -1.0 },
      { name: "マイクロン", change: -0.5 },
    ],
    reasonsTitle: "売り材料",
    reasons: ["① AI設備投資の減速懸念", "② 中国「Kimi」の台頭"],
    reasonsAt: 72,
    cues: [
      { from: 0, to: 72, text: "エヌビディアはマイナス2.2%、TSMCはマイナス2.8%。" },
      { from: 72, to: 140, text: "売られた理由は二つ。AI設備投資の減速懸念と、" },
      { from: 140, to: 210, text: "中国の新しいAI「Kimi」の台頭です。" },
    ] as Cue[],
  },
  macro: {
    duration: 150,
    header: "その他の指標",
    cards: [
      { label: "VIX（恐怖指数）", value: "18.77", note: "+12.2%", tone: "down" },
      { label: "WTI原油", value: "$82.49", note: "+4.5%", tone: "down" },
      { label: "ゴールド", value: "$4,012", note: "史上最高値圏", tone: "up" },
      { label: "ドル円", value: "162円", note: "歴史的円安", tone: "down" },
    ] as { label: string; value: string; note: string; tone: "up" | "down" }[],
    cues: [
      { from: 0, to: 75, text: "恐怖指数VIXは18.7まで上昇。原油は82ドル台に急騰。" },
      { from: 75, to: 150, text: "金は史上最高値圏、ドル円は162円台の円安です。" },
    ] as Cue[],
  },
  keyword: {
    duration: 120,
    header: "今週のポイント",
    label: "キーワード",
    keyword: "「AI相場の転換点」",
    bullets: [
      "慌てて全部売らない",
      "レバレッジをかけすぎない",
      "キャッシュ比率アップ ＋ エネルギー / ディフェンシブ",
    ],
    cues: [
      { from: 0, to: 50, text: "今週のキーワードは「AI相場の転換点」。" },
      { from: 50, to: 120, text: "慌てて全部売らず、レバレッジはかけすぎないことです。" },
    ] as Cue[],
  },
  outro: {
    duration: 90,
    thanks: "ご視聴ありがとうございました",
    cta: "チャンネル登録・高評価 お願いします 🐕",
    cues: [{ from: 0, to: 90, text: "柴犬の米国株でした。また明日！" }] as Cue[],
  },
};

export const TOTAL_DURATION = Object.values(SCENES).reduce(
  (sum, s) => sum + s.duration,
  0,
);
