import React from "react";
import { fetchingData } from "../../helpers/fetchData";

export default function GroupList({ data, setData, setPageCount, dataOffset }) {
  const deleteHandler = async (id) => {
    await client.delete(`/groups/${id}`);
    await fetchingData(dataOffset, setData, setPageCount);
  };

  return (
    <ul className="list-group">
      {data?.map((el) => (
        <li
          key={el.id}
          className="list-group-item d-flex justify-content-between"
        >
          <div>{el?.name}</div>
          <button
            className="btn btn-outline-danger"
            onClick={() => deleteHandler(el.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}
