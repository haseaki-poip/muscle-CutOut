import { useEffect, useMemo, useRef, useState } from "react";
import InputImage from "./InputImage";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";

const CutImage = () => {
  const [detector, setDetector] = useState<poseDetection.PoseDetector>();
  const [imageURL, setImageURL] = useState<string | undefined>();
  const imageRef = useRef<HTMLImageElement>(null);

  // あらかじめモデルを生成しておく
  useEffect(() => {
    (async () => {
      const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.PoseNet
      );
      setDetector(detector);
    })();
  }, []);

  const cutImage = async () => {
    const image = imageRef.current;
    if (!detector || !image) return;

    const estimationConfig = {
      maxPoses: 5,
      flipHorizontal: false,
      scoreThreshold: 0.5,
      nmsRadius: 20,
    };
    const poses = await detector.estimatePoses(image, estimationConfig);

    if (!poses.length) return;
    const left_shoulder = poses[0].keypoints[5];
    const right_shoulder = poses[0].keypoints[6];
    const left_hip = poses[0].keypoints[11];
    const right_hip = poses[0].keypoints[12];
    const left_elbow = poses[0].keypoints[7];
    const right_elbow = poses[0].keypoints[8];

    const crop = {
      x: right_elbow.x,
      y: right_shoulder.y,
      width: left_elbow.x - right_elbow.x,
      height: right_hip.y - right_shoulder.y,
      unit: "px",
    };

    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";
    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    const cutImgURL = canvas.toDataURL("image/jpeg", 1.0);
    setImageURL(cutImgURL);
  };
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
      <div onClick={() => cutImage()}>予測</div>
    </div>
  );
};

export default CutImage;
