import {useEffect} from 'react'

const useClose = (isOpen, handleClose) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleESC = (e) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen, handleClose]);
}

export default useClose;
