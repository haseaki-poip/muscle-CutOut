import { useState, useCallback } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";

type Props = {
  image: HTMLImageElement | null;
  detector: poseDetection.PoseDetector | undefined;
};
export const useCutImage = ({ image, detector }: Props) => {
  const [cutImageURL, setCutImageURL] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [blob, setBlob] = useState<Blob | null>(null);

  const cutImage = useCallback(async () => {
    try {
      if (!detector || !image) {
        console.log(detector);
        console.log(image);
        throw new Error("モデルの生成失敗失敗または画像の未取得");
      }

      setIsLoading(true);

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
      canvas.toBlob(
        (blob) => {
          setBlob(blob);
        },
        "image/jpeg",
        1
      );

      setCutImageURL(cutImgURL);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
    }
  }, [image]);

  return { blob, cutImageURL, setCutImageURL, cutImage, isLoading, isError };
};
