import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ReadOnlyRow = ({userData,handleEdit,handleDelete}) => {
  return (
    <TableRow
    key={userData.id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {userData.id}
    </TableCell>
    <TableCell align="left">{userData.name}</TableCell>
    <TableCell align="left">{userData.email}</TableCell>
    <TableCell align="left">{userData.role}</TableCell>
    <TableCell align="left"><EditIcon onClick={(event)=>handleEdit(event,userData)}/>  <DeleteIcon onClick={(event)=>handleDelete(userData.id)}/></TableCell>
  </TableRow>
  )
}

export default ReadOnlyRow