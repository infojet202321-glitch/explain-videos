import "@fontsource/noto-sans-jp/500.css";
import "@fontsource/noto-sans-jp/700.css";
import "@fontsource/noto-sans-jp/900.css";
import { continueRender, delayRender } from "remotion";
import { EPISODE, SCENES } from "./data";

export const FONT = "'Noto Sans JP', sans-serif";

// The font is split into unicode-range chunks that load lazily, so explicitly
// load every chunk the video's text needs before the first frame is captured.
const STATIC_TEXT = "【】｜|週間騰落率%+-.0123456789";
const ALL_TEXT = STATIC_TEXT + JSON.stringify({ EPISODE, SCENES });

if (typeof document !== "undefined") {
  const handle = delayRender("Loading Noto Sans JP");
  Promise.all(
    ["500", "700", "900"].map((w) =>
      document.fonts.load(`${w} 40px 'Noto Sans JP'`, ALL_TEXT),
    ),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const COLORS = {
  bgFrom: "#18245e",
  bgMid: "#101a48",
  bgTo: "#0a1130",
  yellow: "#FFD21A",
  white: "#FFFFFF",
  text: "#E9ECF5",
  muted: "#A9B1CC",
  card: "#F3F4F8",
  cardText: "#1C2756",
  down: "#E5483B",
  downLight: "#FF7E61",
  downText: "#FF8E78",
  up: "#2FC27A",
  upText: "#4BE39A",
  suit: "#34508F",
  suitDark: "#243A6E",
  tie: "#D9443A",
  fur: "#E39A54",
  furDark: "#C97A35",
  earInner: "#FBE3C2",
  outline: "#1A1A1A",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const HEADER_HEIGHT = 120;
