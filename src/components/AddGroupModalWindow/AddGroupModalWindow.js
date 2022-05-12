import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import client from "../../helpers/client";
import { fetchingData } from "../../helpers/fetchData";

export default function AddGroupModalWindow({
  modalActive,
  setModalActive,
  setModalWindowValue,
  offset,
  perPage,
  setData,
  setPageCount,
}) {
  const [inputValue, setInputValue] = React.useState("");

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
    <div>
      <Dialog open={modalActive}>
        <DialogTitle>Group form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new group, please enter new group of name and submit.
          </DialogContentText>
          <TextField
            onChange={(e) => handler(e)}
            autoFocus
            margin="dense"
            id="name"
            label="Enter group name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            disabled={inputValue === "" ? true : false}
            onClick={() => {
              setModalActive((prevState) => !prevState);
              subMitForm();
            }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setModalActive((prev) => !prev);
              setModalWindowValue("addGroup");
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
