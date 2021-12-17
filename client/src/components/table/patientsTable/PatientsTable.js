import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles,IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles( theme => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    [theme.breakpoints.down("sm")]: {
    
      maxWidth: `52%`
    }
  },
  img : {
    border: '1px solid rgb(126,118,254)',
      width : '50px',
      height:'50px',
      borderRadius:'50%',

  },
}));




function PatientsTable({data}) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    
    <TableContainer className={classes.tableContainer} component={Paper}>
     
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">BMI</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Encounter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow >
        </TableRow>
        {
            data.length === 0 ? 'No Search Result' : data?.map((row,i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center"><img className={classes.img} src={row.image} alt='profileImg'/></TableCell>
                <TableCell align="center">{`${row.name}  ${row.surname}`}</TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">{row.gender}</TableCell>
                <TableCell align="center">{row.bmi}</TableCell>
                <TableCell align="center">{row.state}</TableCell>
                <TableCell align="center"><Link to={`/encounter/${row._id}`}> <IconButton color="primary" component="span"><ArrowForwardIosIcon/></IconButton></Link></TableCell>
    
              </TableRow>
            ))
          }
          {}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
   
  );
}
export default PatientsTable