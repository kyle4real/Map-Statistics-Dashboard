import React from "react";
import Title from "../Title";
import {
    makeStyles,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";

const createData = (id, key, value) => {
    return { id, key, value };
};

const DataTotals = ({ country, cases, deaths, recovered, active }) => {
    const classes = useStyles();

    const rows = [
        createData(0, "Cases", cases),
        createData(1, "Deaths", deaths),
        createData(2, "Recovered", recovered),
        createData(3, "Active", active),
    ];

    return (
        <div className={classes.dataTotals}>
            <Title>{country}</Title>
            <TableContainer>
                <Table>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.key.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </TableCell>
                                <TableCell align="right">
                                    {row.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    dataTotals: {},
}));

export default DataTotals;
