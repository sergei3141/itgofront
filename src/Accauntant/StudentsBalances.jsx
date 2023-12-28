import React from 'react'
import css from './Accauntant.module.css'
import { getAllUsersAccountantOnly } from '../API/API'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


  // FOR TABLE AND PAGINATION //
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  
  function createData(id, name, parents_phone, parents, balance ) {
    return {id, name,  parents_phone, parents, balance };
  }
    // FOR TABLE AND PAGINATION //


function StudentsBalances () {

    // FOR TABLE AND PAGINATION //
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [sort, setSort] = React.useState('asc');
    const [active, setActive] = React.useState(1);
    const [rows, setRows] = React.useState([])
    const [allRows, setAllRows] = React.useState(1)

  React.useEffect(() => {
    getAllUsersAccountantOnly(active, rowsPerPage, page + 1, sort)
      .then((data) => {
        let rows = [];
        setAllRows(data.totalCount);
        for (let i = 0; i < data.data.length; i++) {
          rows.push(createData(data.data[i].id, data.data[i].name, data.data[i].parents_phone,data.data[i].parents,data.data[i].balance));
        }
        setRows(rows);
      });
  }, []);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    let r = []
    getAllUsersAccountantOnly(active, rowsPerPage, newPage + 1, sort).then((data)=>{
      for(let i = 0; i < data.data.length; i++){
        r.push(createData(data.data[i].name, data.data[i].name, data.data[i].parents_phone, data.data[i].parents, data.data[i].balance))
      }
      setRows(r)
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    let r = []
    getAllUsersAccountantOnly(active, event.target.value, 1, sort).then((data)=>{
      for(let i = 0; i < data.data.length; i++){
        r.push(createData(data.data[i].id, data.data[i].name, data.data[i].parents_phone, data.data[i].parents, data.data[i].balance))
      }
      setRows(r)
    })
    setPage(0);
  };
  // FOR TABLE AND PAGINATION //

  return(
    <div  style={{width:'90%', margin: 'auto', paddingBottom:'50px'}}>
       <TableContainer component={Paper} >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>

        <TableRow key={'heade'}>
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                <b>ID</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Имя студента</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Телефон родителя</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Имя родителя</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <b>Баланс</b>
              </TableCell>
            </TableRow>

          {(rows).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                {row.id}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.parents_phone}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.parents}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.balance >= 0 ? <div style={{color: "green"}}><b>{row.balance}</b></div> : <div style={{color: 'red'}}><b>{row.balance}</b></div>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[50, 100, 200]}
              colSpan={3}
              count={allRows}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </div>
  )
}

export default StudentsBalances