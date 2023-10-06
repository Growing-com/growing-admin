import { useEffect } from "react";

const useKeyPressEventListener = (
  keyPressEvent: "Enter",
  callback: () => void,
  option?: boolean | AddEventListenerOptions | undefined
) => {
  // error check
  // const handler = (e: KeyboardEvent) => {
  //   if (keyPressEvent === e.code) {
  //     return callback?.();
  //   }
  // };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (keyPressEvent === e.code) {
        callback?.();
      }
    };
    document.addEventListener("keypress", handler, option);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [callback, keyPressEvent, option]);
};

export default useKeyPressEventListener;
