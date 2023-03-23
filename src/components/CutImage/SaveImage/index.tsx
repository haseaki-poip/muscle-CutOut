import { memo } from "react";
import ControlButton from "src/components/Common/ControlButton";

type Props = {
  cutImageURL: string;
};

const SaveImage = memo(({ cutImageURL }: Props) => {
  const saveImage = () => {
    // iosやandroidの場合でshareが使える時
    if (navigator.share) {
      fetch(cutImageURL)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "sample.jpeg", { type: blob.type });
          navigator
            .share({
              files: [file],
            })
            .then(() => {
              alert("完了しました。");
            });
        });
    } else {
      // パソコンなどshareが使えない時
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = cutImageURL;
      a.download = "image.jpeg";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(cutImageURL);
      document.body.removeChild(a);
    }
  };
  return (
    <ControlButton
      cssClassString="bg-yellow-400 hover:bg-yellow-500 mx-8 px-8 py-4"
      handeleButton={() => saveImage()}
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
            d="M243.591,309.362c3.272,4.317,7.678,6.692,12.409,6.692c4.73,0,9.136-2.376,12.409-6.689l89.594-118.094
		c3.348-4.414,4.274-8.692,2.611-12.042c-1.666-3.35-5.631-5.198-11.168-5.198H315.14c-9.288,0-16.844-7.554-16.844-16.84V59.777
		c0-11.04-8.983-20.027-20.024-20.027h-44.546c-11.04,0-20.022,8.987-20.022,20.027v97.415c0,9.286-7.556,16.84-16.844,16.84
		h-34.305c-5.538,0-9.503,1.848-11.168,5.198c-1.665,3.35-0.738,7.628,2.609,12.046L243.591,309.362z"
          ></path>
          <path
            d="M445.218,294.16v111.304H66.782V294.16H0v152.648c0,14.03,11.413,25.443,25.441,25.443h461.118
		c14.028,0,25.441-11.413,25.441-25.443V294.16H445.218z"
          ></path>
        </g>
      </svg>
    </ControlButton>
  );
});

export default SaveImage;
