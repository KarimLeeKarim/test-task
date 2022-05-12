import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import client from "../../helpers/client";
import { fetchingData } from "../../helpers/fetchData";
import { FilterGroupList } from "../FilterGroupList/FilterGroupList";
import GroupList from "../GroupList/GroupList";
import { Modal } from "../ModalWindow/ModalWindow";

export default function GroupsPage() {
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modalWindowValue, setModalWindowValue] = useState("addGroup");
  const [acceptToDeleteGroup, setAcceptToDeleteGroup] = useState(false);
  const [deletedGroupID, setDeletedGroupID] = useState(null);
  const perPage = 5;

  useEffect(() => {
    fetchingData(offset, perPage, setData, setPageCount);
  }, [offset, perPage]);

  const handlePageClick = (event) => {
    const newOffset = event.selected;
    setOffset(newOffset);
  };

  const deleteHandler = async () => {
    setAcceptToDeleteGroup(true);
    setModalActive(true);
    if (acceptToDeleteGroup) {
      const deletedValue = await client.delete(`/groups/${deletedGroupID}`);
      setAcceptToDeleteGroup(false);
      if (deletedValue === "") {
        await fetchingData(offset, perPage, setData, setPageCount);
        setModalActive(false);
      }
    }
  };
  console.log('acceptToDeleteGroup', acceptToDeleteGroup);
  console.log('modalActive', modalActive);
  return (
    <div className="m-4">
      <h4 className="mb-3">Groups</h4>
      <FilterGroupList
        setModalActive={setModalActive}
        setModalWindowValue={setModalWindowValue}
      />
      <GroupList
        data={data}
        setDeletedGroupID={setDeletedGroupID}
        setModalActive={setModalActive}
        setModalWindowValue={setModalWindowValue}
        setAcceptToDeleteGroup={setAcceptToDeleteGroup}
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
      <Modal
        active={modalActive}
        setActive={setModalActive}
        perPage={perPage}
        setData={setData}
        setPageCount={setPageCount}
        offset={offset}
        modalWindowValue={modalWindowValue}
        setAcceptToDeleteGroup={setAcceptToDeleteGroup}
        deleteHandler={deleteHandler}
      />
    </div>
  );
}
