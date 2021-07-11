import React from "react";

import {
    makeStyles,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";

const Rankings = ({ allCountries }) => {
    const classes = useStyles();
    return (
        <div className={classes.rankings}>
            <TableContainer>
                <Table>
                    <TableBody>
                        {allCountries.map((country) => (
                            <TableRow key={country.rank}>
                                <TableCell component="th" scope="row">
                                    {country.country}
                                </TableCell>
                                <TableCell align="right">{country.rank}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    rankings: {},
}));

export default Rankings;
