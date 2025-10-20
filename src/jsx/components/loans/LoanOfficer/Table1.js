/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-target-blank */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Baseurl from '../../../../Baseurl';
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function DenseTable() {
  const [data,setData] = useState()
  const Token = useSelector((state) => state.auth.auth.idToken);
  const handleget = () => {
    var config = {
        method: "get",
        url: `${Baseurl.baseurl}get/all/agreement/documents`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${Token}`,
        },
    };
    axios(config)
        .then(function (response) {
            console.log(response, 'response')
            setData(response?.data?.data)
        })
        .catch((error) => {
        })
}

useEffect(() => { handleget() }, [])
  return (
    <TableContainer component={Paper} className='mb-3'>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead className='shadow bg-primary' style={{height:'40px'}}>
          <TableRow>

            <TableCell  style={{color:'white'}}>borrower_id </TableCell>
            <TableCell align="center"  style={{color:'white'}}>File_path</TableCell>
            <TableCell align="center"  style={{color:'white'}}>File_name </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow
              key={row?.borrower_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.borrower_id}
              </TableCell>
              <TableCell align="center"><a href={`https://bankerbroker.dev-mn.xyz/uploads/broker/agreement/documents/${row?.file}`} target='_blank'>{row?.file}</a></TableCell>
              <TableCell align="center">{row?.filename}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
