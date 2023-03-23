import { memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  cssClassString: string;
  handeleButton: () => void;
};
const ControlButton = memo(
  ({ children, cssClassString, handeleButton }: Props) => {
    return (
      <button
        onClick={handeleButton}
        className={"mx-8 px-8 py-2 rounded-sm " + cssClassString}
      >
        {children}
      </button>
    );
  }
);

export default ControlButton;
