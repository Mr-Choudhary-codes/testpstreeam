import { ReactNode } from "react";

interface WideContainerProps {
  classNames?: string;
  children?: ReactNode;
  ultraWide?: boolean;
}

export function WideContainer(props: WideContainerProps) {
  return (
    <div
      className={`mx-auto max-w-full px-8 ${
        props.ultraWide
          ? "w-[1300px] xl:w-[18000px] 3xl:w-[2400px] 4xl:w-[2800px]"
          : "w-[950px] xl:w-[1250px] 3xl:w-[1650px] 4xl:w-[1850px]"
      } ${props.classNames || ""}`}
    >
      {props.children}
    </div>
  );
}
