import React from "react";
import client from "../../helpers/client";
import modalCss from "./ModalWindow.module.css";

export const Modal = ({ active, setActive }) => {
  const subMitForm = () => {
    const data = {
      group: {
        name: "Something new",
        place_id: 0,
      },
    };
    const postedGroup = client.post("/groups", data);
  };

  return (
    <div
      className={
        active ? `${modalCss.modal} ${modalCss.active}` : `${modalCss.modal}`
      }
    >
      <div
        className={
          active
            ? `${modalCss.modal__content} ${modalCss.active}`
            : `${modalCss.modal__content}`
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${modalCss.content}`}>
          <input type="text" />
          <button
            onClick={() => {
              setActive(false);
              subMitForm();
            }}
          >
            Submit
          </button>
          <span className={`${modalCss.content__close}`} onClick={() => setActive(false)}>x</span>
        </div>
      </div>
    </div>
  );
};
