import { IconCheck } from "@src/icons/check";
import { PropsWithChildren, useRef, useState, useEffect } from "react";

export interface DropdownProps {
  id: string;
  selectedOptionId?: string;
  options: DropdownOption[];
  className?: string;
  onSelect: (option: DropdownOption) => void;
}

export interface DropdownOption {
  id: string;
  label: string;
}

export function DropDown({
  id,
  options,
  children,
  selectedOptionId,
  className,
  onSelect,
}: PropsWithChildren<DropdownProps>) {
  const selectRef = useRef<HTMLUListElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !selectRef.current?.contains?.(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, {
      capture: true,
    });
    return () => document.removeEventListener("click", handler);
  }, [selectRef]);

  return (
    <>
      <button
        ref={btnRef}
        id={id}
        onClick={() => setIsOpen((open) => !open)}
        className={className}
      >
        {children}
      </button>
      {isOpen && (
        <>
          <div className="w-4 h-2 m-0 bg-[#242424] [clip-path:polygon(50%_0,_0_100%,_100%_100%)] fixed translate-x-44 drop-shadow-lg "></div>
          <ul
            ref={selectRef}
            className="min-w-60 shadow-lg shadow-black py-3 bg-[#242424] cursor-pointer fixed -translate-x-6 translate-y-2 z-50 "
            id={id}
          >
            {options.map((o) => (
              <li
                onClick={() => {
                  setIsOpen(false);
                  onSelect(o);
                }}
                className={`tracking-[4px] py-[10px] leading-4 text-left px-6 font-light [&.selected]:font-bold hover:bg-[#444444] hover:font-bold ${
                  o.id === selectedOptionId ? "selected" : ""
                }`}
                key={o.id}
              >
                {o.label}
                {o.id === selectedOptionId && (
                  <IconCheck className="inline-block align-middle float-right " />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}