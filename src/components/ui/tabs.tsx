import React, {
  FunctionComponent,
  ReactNode,
  useRef,
  useState,
  useEffect,
  HTMLAttributes,
} from "react";

interface Tab {
  name: string;
  children: ReactNode;
  callBack?: Function;
  onClick?: () => void;
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Array<Tab>;
  selectedIndex?: number;
  callBack?: Function;
}

const Tabs: FunctionComponent<TabsProps> = ({
  tabs,
  selectedIndex = 0,
  callBack,
  className,
}) => {
  const [tabIndex, setTabIndex] = useState(selectedIndex || 0);
  const [width, setWifth] = useState<any>();
  const elRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (tabIndex >= tabs.length) {
      setTabIndex(tabs.length - 1);
    } else if (tabIndex < 0) {
      setTabIndex(0);
    }

    if (elRefs.current[tabIndex]) {
      elRefs.current[tabIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
    if (elRefs.current[tabIndex]?.clientWidth) {
      setWifth(elRefs.current[tabIndex]?.clientWidth);
    }
    if (callBack) callBack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabIndex, tabs.length]);

  const indicatorLeft = elRefs.current[tabIndex]?.offsetLeft || 0;

  return (
    <>
      <div className="flex flex-col w-full h-auto gap-6">
        <div className="flex relative gap-[32px] overflow-auto pb-2 no-scrollbar">
          {tabs?.map((e, i) => (
            <div
              key={i}
              ref={(ref) => (elRefs.current[i] = ref) as any}
              onClick={() => {
                setTabIndex(i);
                e.onClick && e.onClick();
              }}
              className={`text-[14px] w-max cursor-pointer flex flex-col font-semibold `}>
              <span className="py-2 w-max text-black dark:text-white">
                {e.name}
              </span>
            </div>
          ))}
          <span
            style={{
              width: width,
              left: indicatorLeft || 0,
              transition: "left 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
            }}
            className={`absolute bottom-2 bg-[#1F2125] dark:bg-[#94a3b8] h-1 rounded-lg ${className}`}
          />
        </div>
        <div className="w-full h-auto text-black dark:text-white">
          {tabs[tabIndex].children}
        </div>
      </div>
    </>
  );
};

export default Tabs;
