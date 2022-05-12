import React from "react";

export const FilterGroupList = ({
  setModalActive,
  setModalWindowValue,
  debouncedResults
}) => {

  return (
    <div className="d-flex justify-content-between mb-3">
      <div className="col-9">
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Search Group"
          onChange={debouncedResults}
        />
      </div>
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => {
            setModalActive((prevState) => !prevState);
            setModalWindowValue("addGroup");
          }}
        >
          Add Group
        </button>
      </div>
    </div>
  );
};
