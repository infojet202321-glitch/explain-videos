import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SCENES } from "./data";
import { IndicesScene } from "./scenes/IndicesScene";
import { KeywordScene } from "./scenes/KeywordScene";
import { MacroScene } from "./scenes/MacroScene";
import { OutroScene } from "./scenes/OutroScene";
import { SemisScene } from "./scenes/SemisScene";
import { TitleScene } from "./scenes/TitleScene";
import { Background, ProgressBar } from "./ui";

export const ShibaRecap: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Series>
        <Series.Sequence durationInFrames={SCENES.title.duration}>
          <TitleScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.indices.duration}>
          <IndicesScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.semis.duration}>
          <SemisScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.macro.duration}>
          <MacroScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.keyword.duration}>
          <KeywordScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENES.outro.duration}>
          <OutroScene />
        </Series.Sequence>
      </Series>
      <ProgressBar offset={0} />
    </AbsoluteFill>
  );
};
