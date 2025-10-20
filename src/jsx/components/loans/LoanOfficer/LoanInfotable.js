import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData(' First Lien  ', 'Subordinate Lien ', 6.0, 24, 4.0),
    createData(' First Lien   ', 'Subordinate Lien ', 9.0, 37, 4.3),
    createData(' First Lien  ', 'Subordinate Lien ', 16.0, 24, 6.0),
    createData(' First Lien  ', 'Subordinate Lien ', 3.7, 67, 4.3),
    createData(' First Lien  ', 'Subordinate Lien ', 16.0, 49, 3.9),
];

export default function DenseTable() {
    return (
        <TableContainer component={Paper} className='mb-3'>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{ background: 'cornflowerblue' }}>
                    <TableRow>
                        <TableCell>LienType</TableCell>
                        <TableCell align="right">b_2</TableCell>
                        <TableCell align="right">Monthly_Payment</TableCell>
                        <TableCell align="right">Loan_Amount_Amount_to_be_Drawn</TableCell>
                        <TableCell align="right">Credit_Limi_if_applicable</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" align="left">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        {row.name}
                                    </label>
                                </div>
                            </TableCell>
                            <TableCell align="left"> 
                            <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                    {row.calories}
                                    </label>
                                </div></TableCell>
                            <TableCell align="center">${row.fat}</TableCell>
                            <TableCell align="center">${row.carbs}</TableCell>
                            <TableCell align="center">${row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
