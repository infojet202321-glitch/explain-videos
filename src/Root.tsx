import { Composition } from "remotion";
import { ShibaRecap } from "./ShibaRecap";
import { TOTAL_DURATION } from "./ShibaRecap/data";
import { FPS, HEIGHT, WIDTH } from "./ShibaRecap/theme";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        // Render with: npx remotion render ShibaRecap out/shiba-recap.mp4
        id="ShibaRecap"
        component={ShibaRecap}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
