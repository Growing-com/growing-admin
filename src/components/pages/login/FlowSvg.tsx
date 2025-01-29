import { FC, useEffect, useState } from "react";

type tFlowSvg = {
  svg: React.ElementType;
  animationKey: string;
  direction?: "left" | "right";
  duration?: number;
  height?: number;
  imageCount?: number;
};

const FlowSvg: FC<tFlowSvg> = ({
  svg: SvgComponent,
  animationKey,
  direction = "right",
  duration = 10,
  imageCount = 2,
  height = 10
}) => {
  const numberOfImages = imageCount;
  const images = Array.from({ length: numberOfImages }, (_, index) => (
    <SvgComponent key={`image-${index}`} />
  ));

  const [animationName, setAnimationName] = useState("");

  useEffect(() => {
    setAnimationName(`flow-${animationKey}`);
  }, [animationKey]);
  return (
    <div
      style={{
        width: "100%",
        height: `${height}rem`,
        position: "relative"
      }}
    >
      <div
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
          position: "absolute",
          display: "flex",
          ...(direction === "left" ? { left: "0%" } : { right: "0%" }),
        }}
      >
        {images}
        {images}
      </div>
      {animationName && (
        <style>
          {`
          @keyframes ${animationName} {
            100% {
              transform: ${
                direction === "left" ? "translateX(-50%)" : "translateX(50%)"
              };
            }
          }
        `}
        </style>
      )}
    </div>
  );
};

export default FlowSvg;
