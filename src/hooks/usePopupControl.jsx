import { useEffect, useRef, useState } from "react";

const usePopupControl = () => {
  const [isOpen, setIsOpen] = useState(false);

  const popupRef = useRef(null);

  // toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //outside click
  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return { isOpen, toggleMenu, popupRef };
};

export default usePopupControl;
