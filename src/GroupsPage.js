import React, { useEffect, useState } from "react";
import client from "./client";
import { Modal } from "./ModalWindow";
import "./styles.css";

export default function GroupsPage() {
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    client
      .get("/groups", { limit: 0, offset: 10 })
      .then((el) => setData(el.data));
  }, []);
  console.log(data);

  return (
    <div className="m-4">
      <h4 className="mb-3">Groups</h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="col-9">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Group"
          />
        </div>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => setModalActive(true)}
          >
            Add Group
          </button>
        </div>
      </div>
      <ul className="list-group">
        {data?.map((el) => (
          <li
            key={el.id}
            className="list-group-item d-flex justify-content-between"
          >
            <div>{el?.name}</div>
            <button className="btn btn-outline-danger">
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
      <nav className="mt-3" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item">
            <div className="page-link">1</div>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
      <Modal active={modalActive} setActive={setModalActive} />
    </div>
  );
}
