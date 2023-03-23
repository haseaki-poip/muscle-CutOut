import { useEffect, useMemo, useRef, useState } from "react";
import InputImage from "./InputImage";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import { useCutImage } from "../hooks/useCutImage";

const CutImage = () => {
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const [imageURL, setImageURL] = useState<string | undefined>();
  const imageRef = useRef<HTMLImageElement>(null);
  const cutImageTool = useCutImage({
    image: imageRef.current,
    detector: detector,
  });

  // あらかじめモデルを生成しておく
  useEffect(() => {
    (async () => {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.PoseNet
      );
      setDetector(detector);
    })();
  }, []);

  useEffect(() => {
    if (!cutImageTool.cutImageURL) return;

    setImageURL(cutImageTool.cutImageURL);
  }, [cutImageTool.cutImageURL]);

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      <div className="w-full py-10 text-center">
        <div className="mb-3">
          <h1 className="text-yellow-400 text-4xl md:text-6xl">
            Cut Out Mascle
          </h1>
        </div>
        <div className="px-1 border-b-2 border-yellow-400 w-fit mx-auto cursor-pointer hover:border-white">
          <span className="text-yellow-400 text-lg md:text-xl">
            see description
          </span>
        </div>
      </div>

      <InputImage
        ref={imageRef}
        imageURL={imageURL}
        setImageURL={setImageURL}
      />
      <div onClick={() => cutImageTool.cutImage()}>予測</div>
    </div>
  );
};

export default CutImage;
