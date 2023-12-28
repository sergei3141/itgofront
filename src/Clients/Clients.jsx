import { useLocation } from "react-router-dom";
import HeaderTeacher from "../Header/HeaderTeacher"
import css from './Clients.module.css'
import { NavLink } from "react-router-dom";
import { Button } from 'antd';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAllClients, deleteClientById } from "../API/API";
import Pagination from '@mui/material/Pagination';
import { Icon } from '@iconify/react';





function Clients () {

  const [rows, setRows] = React.useState([])
  const [page, setPage] = React.useState(1);
  const [countPages, setCountPages] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    getAllClients(value).then((data)=>{
      let row = [];
      for(let i = 0; i < data.data.length; i++){
        row.push(createData(data.data[i].id, data.data[i].ip, data.data[i].name, data.data[i].phone))
      }
      setRows(row)
    })
  };


  React.useEffect(()=>{
    getAllClients(1).then((data)=>{
      setCountPages(data.lastPage)
      let row = [];
      for(let i = 0; i < data.data.length; i++){
        row.push(createData(data.data[i].id, data.data[i].ip, data.data[i].name, data.data[i].phone))
      }
      setRows(row)
    })
  }, [])


  function createData(id, ip, name, phone) {
    return { id, ip, name, phone };
  }

  return(
    <div style={{backgroundColor: "rgb(216, 222, 236)", minHeight:"100vh"}}>
      <HeaderTeacher />
      <NavLink to="/admin"><Button style={{position:'absolute', top:'24px', right:'40px', zIndex:99999}}>Admin</Button></NavLink>

      <TableContainer component={Paper} style={{maxWidth:'1300px', margin:'auto'}}>
      <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">IP</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              id={row.id + 'clients'}
            >
              <TableCell component="th" scope="row">{row.id}</TableCell>
              <TableCell align="right">{row.ip}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right"><Icon icon="ph:trash" style={{cursor:'pointer', fontSize:'24px'}} onClick={()=>{deleteClientById(row.id);document.getElementById(`${row.id}clients`).remove()}}/></TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Pagination count={countPages} color="primary" onChange={handleChange} style={{marginTop:'10px'}}/>
    </div>
  )
}

export default Clients