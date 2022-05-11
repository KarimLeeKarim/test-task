import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchingData } from "../../helpers/fetchData";
import GroupList from "../GroupList/GroupList";
import { Modal } from "../ModalWindow/ModalWindow";

export default function GroupsPage() {
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [dataOffset, setDataOffset] = useState(0);
  const perPage = 10;

  useEffect(() => {
    fetchingData(dataOffset, setData, setPageCount, perPage);
  }, [dataOffset, 5]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * perPage) % data.length;
    setDataOffset(newOffset);
  };

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
      <GroupList
        data={data}
        setData={setData}
        setPageCount={setPageCount}
        dataOffset={dataOffset}
      />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <Modal active={modalActive} setActive={setModalActive} />
    </div>
  );
}
