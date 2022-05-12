import React, { useState } from "react";
import client from "../../helpers/client";
import { fetchingData } from "../../helpers/fetchData";
import modalCss from "./ModalWindow.module.css";

export const Modal = ({
  active,
  setActive,
  offset,
  perPage,
  setData,
  setPageCount,
  modalWindowValue,
  setAcceptToDeleteGroup,
  deleteHandler,
}) => {
  const [inputValue, setInputValue] = useState("");

  const subMitForm = async () => {
    const data = {
      group: {
        name: `${inputValue}`,
        description: "description",
        place_id: null,
        login_enabled: true,
        time_restriction_time_zone: null,
        geofence_restriction_enabled: false,
        primary_device_restriction_enabled: false,
        reader_restriction_enabled: false,
        time_restriction_enabled: false,
      },
    };

    const postedGroup = await client.post("/groups", data);
    if (postedGroup) {
      fetchingData(offset, perPage, setData, setPageCount);
      setInputValue("");
    }
  };

  const handler = (e) => {
    setInputValue(e.target.value);
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
        {modalWindowValue === "addGroup" ? (
          <div className={`${modalCss.content}`}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handler(e)}
            />
            <button
              disabled={inputValue === "" ? true : false}
              onClick={() => {
                setActive((prevState) => !prevState);
                subMitForm();
              }}
            >
              Submit
            </button>
            <span
              className={`${modalCss.content__close}`}
              onClick={() => setActive((prevState) => !prevState)}
            >
              x
            </span>
          </div>
        ) : (
          <div>
            <p>Are you sure by delete this group ? </p>
            <button
              onClick={() => {
                deleteHandler();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                setActive((prevState) => !prevState);
                setAcceptToDeleteGroup((prevState) => !prevState);
              }}
            >
              No
            </button>
            <span
              className={`${modalCss.content__close}`}
              onClick={() => {
                setActive((prevState) => !prevState);
                setAcceptToDeleteGroup((prevState) => !prevState);
              }}
            >
              x
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
