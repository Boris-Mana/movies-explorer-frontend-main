import { useEffect } from "react";
import { MobileMenu } from "../Navigation/Navigation"

export default function InfoTooltip({
  isOpen,
  onClose,
}) {

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    });

    return document.removeEventListener('keydown', (event) => {
      console.log('Кликнули где-то в мобильном меню');
      if (event.key === "Escape") {
        onClose();
      }
    });
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup_opened")
      ) {
        onClose();
      }
    }
    );

    return document.removeEventListener('click', (evt) => {
      if (evt.target.classList.contains("popup_opened")
      ) {
        onClose();
      }
    }
    );
  }, [isOpen]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          name="close"
          onClick={onClose}
        ></button>
        <MobileMenu onClose={onClose} />
      </div>
    </div>
  );
}

