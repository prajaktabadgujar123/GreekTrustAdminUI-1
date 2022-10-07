import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import PaginationComponent from './PaginationComponent';
import { useState,useEffect } from 'react';
import ReadOnlyRow from './ReadOnlyRow';
import EditableRow from './EditableRow';


 const DashboardTable = ({userData,setUserData,handlePaginationClick,userDataPerPage,totalUserData,handleSearch}) => {
     const tableHead=['Tracking ID','Name','Email','Role','Actions'] 
     const [searchText,setSearchText]=useState("");
     const [editId,setEditId]=useState(null);
     const [editFromData,setEditFromData]=useState({
      "id": "",
      "name": "",
      "email": "",
      "role": "",
     })

  
     // get search value
    const searchValue=(value)=>
    {
        setSearchText(value);
        handleSearch(value);
    }
    // handle edit button
    const handleEdit=(event,data)=>
    {
    event.preventDefault();
    setEditId(data.id)

    const formValue={
      "id":data.id,
      "name":data.name ,
      "email":data.email,
      "role":data.role,
    }
    setEditFromData(formValue);

    }

    // handle edit from submission
    const handleEditFromChange=(event)=>
    {

      event.preventDefault();
      // get attribute and value from input field and store it
      const name=event.target.getAttribute("name");
      const value=event.target.value;
      const newFormData={...editFromData}
      newFormData[name]=value;
      setEditFromData(newFormData);

    }

    //edit form submit
    const handleEditFormSubmit=(event)=>
    {
    event.preventDefault();
    const editedContact={
      "id":editFromData.id,
      "name":editFromData.name ,
      "email":editFromData.email,
      "role":editFromData.role,
    }

    const newUserData=[...userData]
    const index=userData.findIndex((Data)=>Data.id===editId)
    newUserData[index]=editedContact;
    setUserData(newUserData);
    setEditId(null);
    }

    //handleCancel
    const handleCancel=()=>
    {
      setEditId(null)
    }

    const handleDelete=(ID)=>
    {
       const newUserData=[...userData];

       const index=userData.findIndex((data)=>data.id===ID)

       newUserData.splice(index,1);
       setUserData(newUserData);
    }


  return (
    <>
    <TableContainer component={Paper}>
    <TextField  fullWidth id="Search-Bar" label="Search by name, email or role" variant="filled" value={searchText} onChange={(event)=>{searchValue(event.target.value)}} />
       <form onSubmit={handleEditFormSubmit}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead?.map((data,index)=>
            {
                return(<TableCell key={index} align="left">{data}</TableCell> )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData?.map((userData) => (
            <>
            {editId===userData.id?<EditableRow key={`edit${userData.id}`} editFromData={editFromData} handleEditFromChange={handleEditFromChange} handleCancel={handleCancel}/>
            :<ReadOnlyRow key={`read${userData.id}`} userData={userData} handleEdit={handleEdit} handleDelete={handleDelete}/> 
            }
           </>
          ))}
        </TableBody>
      </Table>
      </form>

     <Paper sx={{display:'flex',justifyContent:'center',flexDirection:'row'}}>
     <PaginationComponent handlePaginationClick={handlePaginationClick} userDataPerPage={userDataPerPage} totalUserData={totalUserData}/>
     </Paper>
    </TableContainer>
    <br></br>
    </>
  )
}

export default DashboardTable
