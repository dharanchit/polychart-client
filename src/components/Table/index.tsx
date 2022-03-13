import { Dialog } from '@material-ui/core';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PolicyDialog from '../Dialog';
import { TableProps } from './types';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TableData({ setNoOfPages, searchString, currentPage }: TableProps) {
  const classes = useStyles();
  const [ rowData, setRowData ] = useState<any[]>([]);
  const [ modalOpen, setModalOpen ] = useState<boolean>(false);
  const [ documentId, setDocumentId] = useState<string>("");

  const fetchPolicyData = async() => {
    try{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/`, {
        params: {
          searchString: searchString,
          pageNo: currentPage,
        }
      });
      if(response.status === 200){
        const { data } = response.data;
        setRowData(data.hits);
        setNoOfPages(data.nbPages);
      }
    } catch(err: any){
      console.log('Error Occurred while fetching data ', err);
    }
  }

  useEffect(() => {
    fetchPolicyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[searchString, currentPage]);

  return (
    <>
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Policy Id</StyledTableCell>
            <StyledTableCell align="center">Date of purchase</StyledTableCell>
            <StyledTableCell align="center">Customer Id</StyledTableCell>
            <StyledTableCell align="center">Fuel</StyledTableCell>
            <StyledTableCell align="center">Vehicle Segment</StyledTableCell>
            <StyledTableCell align="center">Premium</StyledTableCell>
            <StyledTableCell align="center">Collisions</StyledTableCell>
            <StyledTableCell align="center">Comprehensive</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, idx) => (
            <StyledTableRow key={idx} onClick={() => {setModalOpen(true); setDocumentId(row.objectID)}}>
              <StyledTableCell align="center">
                {row.policyId}
              </StyledTableCell>
              <StyledTableCell align="center">{row.dateOfPurchase}</StyledTableCell>
              <StyledTableCell align="center">{row.customerId}</StyledTableCell>
              <StyledTableCell align="center">{row.fuel}</StyledTableCell>
              <StyledTableCell align="center">{row.vehicleSegment}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
              <StyledTableCell align="center">{row.collision}</StyledTableCell>
              <StyledTableCell align="center">{row.comprehensive}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
      <PolicyDialog documentId={documentId} closeModal={() => setModalOpen(false)} />
    </Dialog>
    </>
  );
}
