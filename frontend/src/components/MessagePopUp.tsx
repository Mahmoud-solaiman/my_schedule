import { useEffect } from "react";
import type { MessagePopUpProps } from "../types/types";
import './MessagePopUp.scss';

export default function MessagePopUp({ message, delay = 2000, isError = true, hidePopUp }: MessagePopUpProps) {
  useEffect(() => {
    setTimeout(() => {
      hidePopUp(false);
    }, delay);
  }, [delay, hidePopUp]);
  return (
    <div className="message-container">
      <div className={ ` ${ isError ? 'error' : 'message' } ` }>
        <p>{ message }</p>
      </div>
    </div>
  );
}