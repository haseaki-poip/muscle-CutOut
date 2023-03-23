import { memo, ReactNode } from "react";
import ControlButton from "../ControlButton";

type Props = {
  children: ReactNode;
  closeButton: () => void;
};
const Modal = memo(({ children, closeButton }: Props) => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 inset-0 z-50 bg-gray-800 flex flex-col justify-center items-center">
      <div className="absolute top-0 left-0">
        <ControlButton
          cssClassString="mx-4 my-4"
          handeleButton={() => closeButton()}
        >
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-8 h-8 opacity-100 hover:opacity-50 active:opacity-100 mx-"
            style={{ fill: "gray" }}
          >
            <g>
              <polygon
                points="512,52.535 459.467,0.002 256.002,203.462 52.538,0.002 0,52.535 203.47,256.005 0,459.465 
		52.533,511.998 256.002,308.527 459.467,511.998 512,459.475 308.536,256.005 	"
              ></polygon>
            </g>
          </svg>
        </ControlButton>
      </div>
      {children}
    </div>
  );
});

export default Modal;
