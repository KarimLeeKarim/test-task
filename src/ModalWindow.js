import React from "react";
import client from "./client";

export const Modal = ({ active, setActive }) => {
  const subMitForm = () => {
    const data = {
      group: {
        name: "Something new",
        place_id: 0,
      }
    };
    client.post("/groups", data)
    client.setLoginSecret(res.secret);
    .then((el) => console.log(el)
    );
  };

  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <input type="text" />
          <button
            onClick={() => {
              setActive(false);
              subMitForm();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
