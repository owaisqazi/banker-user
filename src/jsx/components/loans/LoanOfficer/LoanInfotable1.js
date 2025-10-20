import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs};
}

const rows = [
    createData(6.0, 'Deposited', 6.0, 24, 4.0),
    createData(6.2, 'Deposited', 9.0, 37, 4.3),
    createData(6.3, 'Deposited', 16.0, 24, 6.0),
    createData(6.5, 'Deposited', 3.7, 67, 4.3),
];

export default function DenseTable() {
    return (
        <TableContainer component={Paper} className='mb-3'>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ background: 'cornflowerblue' }}>
                    <TableRow>
                        <TableCell>Asset_Type_Cash_Gift_Gift_of_Equity_Grant </TableCell>
                        <TableCell align="right">Deposited_Not+Deposited </TableCell>
                        <TableCell align="right">Source_use_list_above </TableCell>
                        <TableCell align="right">Cash_or_Market_Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="left">
                                        {row.name}
                            </TableCell>
                            <TableCell align="left"> 
                            <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                    {row.calories}
                                    </label>
                                </div>
                            <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                    {row.calories}
                                    </label>
                                </div>
                                </TableCell>
                            <TableCell align="center">${row.fat}</TableCell>
                            <TableCell align="center">${row.carbs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
