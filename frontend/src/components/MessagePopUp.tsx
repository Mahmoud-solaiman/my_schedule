import { useEffect } from "react";
import type { MessagePopUpProps } from "../types/types";

export default function MessagePopUp({ message, delay = 2000, isError = true, hidePopUp }: MessagePopUpProps) {
  useEffect(() => {
    setTimeout(() => {
      hidePopUp(false);
    }, delay);
  }, [delay, hidePopUp]);
  return (
    <div className="flex justify-center">
      <div className={`px-10 py-3 absolute ${ isError ? 'bg-red-700 shadow-[0_0_10px_rgb(255,0,0)]' : 'bg-green-600 shadow-[0_0_10px_rgb(0,255,0)]' } rounded-full animate-slide-in mt-5 `}>
        <p className="text-white font-bold">{ message }</p>
      </div>
    </div>
  );
}