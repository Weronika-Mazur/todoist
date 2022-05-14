import ReactDOM from "react-dom";
import React, { cloneElement, useState, useRef } from "react";
import {
  useFloating,
  useInteractions,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
import { shift, flip, Placement, offset } from "@floating-ui/react-dom";

import * as S from "./styles";

interface DropDownProps {
  children: React.ReactElement;
  dropDown: React.ReactElement;
  placement?: Placement;
}

const DropDown = ({ dropDown, children, placement }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: placement ?? "right-start",
    middleware: [offset(8), shift({ padding: 16 }), flip()],
  });
  const targetRef = useRef<Element>(null);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ]);

  const handleShowDropDown = () => {
    setOpen(true);
  };

  const handleCloseDropDown = () => {
    setOpen(false);
  };

  return (
    <>
      {cloneElement(children, {
        ...getReferenceProps({ ref: reference }),
        onClick: handleShowDropDown,
      })}
      {open &&
        ReactDOM.createPortal(
          <S.Backdrop onClick={handleCloseDropDown} ref={targetRef}>
            <S.DropDownList
              {...getFloatingProps({
                ref: floating,
                style: {
                  position: strategy,
                  left: x ?? "",
                  top: y ?? "",
                },
              })}
            >
              {dropDown}
            </S.DropDownList>
          </S.Backdrop>,

          document.body
        )}
    </>
  );
};

export default DropDown;
