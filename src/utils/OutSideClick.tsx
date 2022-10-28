import { MouseEventHandler, ReactNode, useEffect, useRef } from "react";

export const OutSideClick = <T,>(props: {
  children: T;
  clickOutside: () => void;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const element = props.children as { props: { className: string } };
    const target = e.target as Element;
    if (element.props.className === target.className) {
      props.clickOutside();
    }
  };

  return (
    <div onClick={(e) => handleClick(e)} onBlur={(e) => console.log(e)}>
      {props.children as ReactNode}
    </div>
  );
};
