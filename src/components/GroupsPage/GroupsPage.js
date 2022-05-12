import { debounce } from "lodash";
import React, { useEffect, useState, useMemo } from "react";
import ReactPaginate from "react-paginate";
import client from "../../helpers/client";
import { fetchingData } from "../../helpers/fetchData";
import AddGroupModalWindow from "../AddGroupModalWindow/AddGroupModalWindow";
import { DeleteConfirmGroupModalWindow } from "../DeleteConfirmGroupModalWindow/DeleteConfirmGroupModalWindow";
import { FilterGroupList } from "../FilterGroupList/FilterGroupList";
import GroupList from "../GroupList/GroupList";

export default function GroupsPage() {
  const [data, setData] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [modalWindowValue, setModalWindowValue] = useState("addGroup");
  const [acceptToDeleteGroup, setAcceptToDeleteGroup] = useState(false);
  const [deletedGroupID, setDeletedGroupID] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const perPage = 10;
  let listToDisplay = data;

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

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    fetchingData(offset, perPage, setData, setPageCount);
  };

  if (searchTerm !== "") {
    listToDisplay = data.filter((group) => {
      return group.name.toLowerCase().includes(searchTerm);
    });
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 1500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [searchTerm]);

  return (
    <div className="m-4">
      <h4 className="mb-3">Groups</h4>
      <FilterGroupList
        setModalActive={setModalActive}
        setModalWindowValue={setModalWindowValue}
        debouncedResults={debouncedResults}
      />
      <GroupList
        data={listToDisplay}
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
      {modalWindowValue === "addGroup" ? (
        <AddGroupModalWindow
          modalActive={modalActive}
          setModalActive={setModalActive}
          setModalWindowValue={setModalWindowValue}
          perPage={perPage}
          setData={setData}
          setPageCount={setPageCount}
          offset={offset}
        />
      ) : (
        <DeleteConfirmGroupModalWindow
          modalActive={modalActive}
          setModalActive={setModalActive}
          setModalWindowValue={setModalWindowValue}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
}
