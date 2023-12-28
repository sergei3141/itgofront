import React from 'react'
import css from './Accauntant.module.css'
import { getTransactions } from '../API/API'
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
  
  function createData(q,w,e,r,t,y,u,i,o,p,a,s) {
    return {q,w,e,r,t,y,u,i,o,p,a,s};
  }
    // FOR TABLE AND PAGINATION //


function StudentsBalances () {

    // FOR TABLE AND PAGINATION //
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [sort, setSort] = React.useState('asc');
    const [rows, setRows] = React.useState([])
    const [allRows, setAllRows] = React.useState(1)

  React.useEffect(() => {
    getTransactions(rowsPerPage, page + 1, sort)
      .then((data) => {
        let rows = [];
        setAllRows(data.totalCount);
        for (let i = 0; i < data.data.length; i++) {
          rows.push(createData(data.data[i].id, data.data[i].created_at, data.data[i].student, data.data[i].student_phone, data.data[i].percent_sale, data.data[i].fixed_sale, data.data[i].user_paid, data.data[i].add_to_balance, data.data[i].balance_was, data.data[i].total_balance, data.data[i].personal_sale_info, data.data[i].ip));
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
    getTransactions(rowsPerPage, newPage + 1, sort).then((data)=>{
      for(let i = 0; i < data.data.length; i++){
        r.push(createData(data.data[i].id, data.data[i].created_at, data.data[i].student, data.data[i].student_phone, data.data[i].percent_sale, data.data[i].fixed_sale, data.data[i].user_paid, data.data[i].add_to_balance, data.data[i].balance_was, data.data[i].total_balance, data.data[i].personal_sale_info, data.data[i].ip));
      }
      setRows(r)
    })
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    let r = []
    getTransactions(event.target.value, 1, sort).then((data)=>{
      for(let i = 0; i < data.data.length; i++){
        r.push(createData(data.data[i].id, data.data[i].created_at, data.data[i].student, data.data[i].student_phone, data.data[i].percent_sale, data.data[i].fixed_sale, data.data[i].user_paid, data.data[i].add_to_balance, data.data[i].balance_was, data.data[i].total_balance, data.data[i].personal_sale_info, data.data[i].ip));
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
                <b>Дата транзакции</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Получатель</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Телефон получателя</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Скидка %</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Фиксированная скидка</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Оплачено</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Начисленно</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <b>Баланс был</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
               <b>Баланс стал</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>Комментарий к скидкам</b>
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <b>IP</b>
              </TableCell>
            </TableRow>

          {(rows).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                {row.q}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {new Date(row.w).toString().substring(0,25)}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.e}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.r}
              </TableCell>
              <TableCell component="th" scope="row" style={{ width: 10 }}>
                {row.t}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.y}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.u}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.i}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
              {row.o >= 0 ? <b style={{color:'green'}}>{row.o}</b>:<b style={{color:'red'}}>{row.o}</b>}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.p >= 0 ? <b style={{color:'green'}}>{row.p}</b>:<b style={{color:'red'}}>{row.p}</b>}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.a}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                {row.s}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
    <TablePagination
             style={{width:'1000px'}}
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
    </div>
  )
}

export default StudentsBalances