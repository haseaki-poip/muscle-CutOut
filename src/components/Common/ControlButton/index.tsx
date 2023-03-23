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
        className={"rounded-md " + cssClassString}
      >
        {children}
      </button>
    );
  }
);

export default ControlButton;
