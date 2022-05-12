import React from "react";
import groupListCss from "./GroupList.module.css";

export default function GroupList({
  data,
  setDeletedGroupID,
  setModalActive,
  setModalWindowValue,
  setAcceptToDeleteGroup,
}) {
  return (
    <ul className={groupListCss.list_group}>
      {data?.map((el) => (
        <li
          key={el.id}
          className="list-group-item d-flex justify-content-between"
        >
          <div>{el?.name}</div>
          <button
            className="btn btn-outline-danger"
            onClick={() => {
              setModalWindowValue("deleteGroup");
              setModalActive((prevState)=> !prevState);
              setAcceptToDeleteGroup((prevState)=> !prevState);
              setDeletedGroupID(el.id);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}
