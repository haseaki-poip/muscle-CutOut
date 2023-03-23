import { useEffect, useMemo, useRef, useState } from "react";
import InputImage from "./InputImage";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import { useCutImage } from "../hooks/useCutImage";
import ControlButton from "../Common/ControlButton";
import Modal from "../Common/Modal";
import SaveImage from "./SaveImage";
import Loading from "../Common/Loading";

const CutImage = () => {
  const [detector, setDetector] = useState<poseDetection.PoseDetector>(); // openposeのモデル
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [isResult, setIsResult] = useState(false);
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

  const isModal = useMemo(() => {
    if (!isResult) return null;

    if (cutImageTool.cutImageURL) {
      return (
        <Modal closeButton={() => setIsResult(false)}>
          <img
            className="w-[92vw] h-[92vw] max-h-[500px] max-w-[500px] rounded-lg"
            src={cutImageTool.cutImageURL}
            alt="cutImageTool.cutImageURL"
          />
          <div className="mt-10">
            <SaveImage cutImageURL={cutImageTool.cutImageURL} />
          </div>
        </Modal>
      );
    }

    return (
      <Modal closeButton={() => setIsResult(false)}>
        <Loading />
      </Modal>
    );
  }, [cutImageTool.cutImageURL, isResult]);

  // detectorが生成されたタイミングで空予測をさせることで2回目以降の処理を高速化する
  useEffect(() => {
    if (!detector) return;
    (async () => {
      await cutImageTool.cutImage();
    })();
  }, [detector]);

  return (
    <div className="bg-gray-800 min-h-screen w-full">
      {isModal}
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
      <div className="w-full h-16 mt-5 flex justify-center">
        {imageURL ? (
          <div className="flex justify-center items-center">
            <ControlButton
              cssClassString="bg-white hover:bg-gray-300 mx-8 px-8 py-2"
              handeleButton={() => setImageURL(undefined)}
            >
              <svg
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
                style={{ fill: "gray" }}
              >
                <g>
                  <path
                    d="M88.594,464.731C90.958,491.486,113.368,512,140.234,512h231.523c26.858,0,49.276-20.514,51.641-47.269
		l25.642-335.928H62.952L88.594,464.731z M329.183,221.836c0.357-5.876,5.4-10.349,11.277-9.992
		c5.877,0.357,10.342,5.409,9.993,11.277l-10.129,202.234c-0.357,5.876-5.4,10.342-11.278,9.984
		c-5.876-0.349-10.349-5.4-9.992-11.269L329.183,221.836z M245.344,222.474c0-5.885,4.772-10.648,10.657-10.648
		c5.885,0,10.656,4.763,10.656,10.648v202.242c0,5.885-4.771,10.648-10.656,10.648c-5.885,0-10.657-4.763-10.657-10.648V222.474z
		 M171.531,211.844c5.876-0.357,10.92,4.116,11.278,9.992l10.137,202.234c0.357,5.869-4.116,10.92-9.992,11.269
		c-5.869,0.357-10.921-4.108-11.278-9.984l-10.137-202.234C161.182,217.253,165.654,212.201,171.531,211.844z"
                  ></path>
                  <path
                    d="M439.115,64.517c0,0-34.078-5.664-43.34-8.479c-8.301-2.526-80.795-13.566-80.795-13.566l-2.722-19.297
		C310.388,9.857,299.484,0,286.642,0h-30.651H225.34c-12.825,0-23.728,9.857-25.616,23.175l-2.721,19.297
		c0,0-72.469,11.039-80.778,13.566c-9.261,2.815-43.357,8.479-43.357,8.479C62.544,67.365,55.332,77.172,55.332,88.38v21.926h200.66
		h200.676V88.38C456.668,77.172,449.456,67.365,439.115,64.517z M276.318,38.824h-40.636c-3.606,0-6.532-2.925-6.532-6.532
		s2.926-6.532,6.532-6.532h40.636c3.606,0,6.532,2.925,6.532,6.532S279.924,38.824,276.318,38.824z"
                  ></path>
                </g>
              </svg>
            </ControlButton>
            <ControlButton
              cssClassString="bg-yellow-400 hover:bg-yellow-500 mx-8 px-8 py-2"
              handeleButton={async () => {
                setIsResult(true);
                cutImageTool.cutImage();
              }}
            >
              <svg
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-8 h-8"
              >
                <g>
                  <path
                    d="M422.945,378.998V88.49H133.55V0.549H89.024V88.49H0v44.528h89.024v290.507h289.394v87.926h44.527v-87.926H512
		v-44.528H422.945z M378.418,378.998H133.55v-245.98h244.868V378.998z"
                  ></path>
                </g>
              </svg>
            </ControlButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CutImage;
