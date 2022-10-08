import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Checkbox, TextField, Button } from "@mui/material";
import PaginationComponent from "./PaginationComponent";
import { useState } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const DashboardTable = ({
  userData,
  setUserData,
  handlePaginationClick,
  userDataPerPage,
  totalUserData,
  handleSearch,
  userDataAll,
}) => {
  const [toggleCheck, setToggleCheck] = useState(false);
  const checkBox = (
    <Checkbox
      onChange={(event) => {
        handleCheckedAll(event);
        setToggleCheck(!toggleCheck);
      }}
      checked={toggleCheck}
    />
  );

  const tableHead = [checkBox, "Name", "Email", "Role", "Actions"];
  const [searchText, setSearchText] = useState("");
  const [editId, setEditId] = useState(null);
  const [isChecked, setIsChecked] = useState([]);
  const [editFromData, setEditFromData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  // get search value
  const searchValue = (value) => {
    setSearchText(value);
    handleSearch(value);
  };
  // handle edit button
  const handleEdit = (event, data) => {
    event.preventDefault();
    setEditId(data.id);

    const formValue = {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    setEditFromData(formValue);
  };

  // handle edit from submission
  const handleEditFromChange = (event) => {
    event.preventDefault();
    // get attribute and value from input field and store it
    const name = event.target.getAttribute("name");
    const value = event.target.value;
    const newFormData = { ...editFromData };
    newFormData[name] = value;
    setEditFromData(newFormData);
  };

  //edit form submit
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editFromData.id,
      name: editFromData.name,
      email: editFromData.email,
      role: editFromData.role,
    };

    const newUserData = [...userDataAll];
    const index = userData.findIndex((Data) => Data.id === editId);
    newUserData[index] = editedContact;
    setUserData(newUserData);
    setEditId(null);
  };

  //handleCancel
  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = (ID) => {
    const newUserData = [...userDataAll];
    const index = userData.findIndex((data) => data.id === ID);
    newUserData.splice(index, 1);
    setUserData(newUserData);
  };

  //handleCheck
  const handleChecked = (event) => {
    const { value, checked } = event.target;
    console.log(checked);
    if (checked) {
      setIsChecked([...isChecked, value]);
    } else {
      setIsChecked(isChecked.filter((event) => event !== value));
    }
  };

  const handleCheckedAll = (event) => {
    const { checked } = event.target;
    const allIndex = userData.map((data) => {
      return data.id;
    });

    if (checked) {
      setIsChecked(allIndex);
    } else {
      setIsChecked([]);
    }
  };

  const handleAllDelete = () => {
    let newUserData = [...userDataAll];
    newUserData = newUserData.filter((data) => {
      if (isChecked.includes(data.id)) {
        return false;
      }
      return true;
    });
    setUserData(newUserData);
    if (isChecked.length === 10) {
      setToggleCheck(!toggleCheck);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <TextField
          fullWidth
          id="Search-Bar"
          label="Search by name, email or role"
          variant="filled"
          value={searchText}
          onChange={(event) => {
            searchValue(event.target.value);
          }}
        />
        <form onSubmit={handleEditFormSubmit}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHead?.map((data, index) => {
                  return (
                    <TableCell key={index} align="left">
                      {data}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.map((userData, index) =>
                editId === userData.id ? (
                  <EditableRow
                    key={`edit${userData.id}`}
                    editFromData={editFromData}
                    handleEditFromChange={handleEditFromChange}
                    handleCancel={handleCancel}
                  />
                ) : (
                  <ReadOnlyRow
                    key={`read${userData.id}`}
                    userData={userData}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleChecked={handleChecked}
                    isChecked={isChecked}
                    toggleCheck={toggleCheck}
                    setToggleCheck={setToggleCheck}
                  />
                )
              )}
            </TableBody>
          </Table>
        </form>

        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <PaginationComponent
            handlePaginationClick={handlePaginationClick}
            userDataPerPage={userDataPerPage}
            totalUserData={totalUserData}
          />
        </Paper>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ marginTop: "1rem" }}
        onClick={handleAllDelete}
      >
        Delete Selected
      </Button>
      <br></br>
      <br></br>
    </>
  );
};

export default DashboardTable;
