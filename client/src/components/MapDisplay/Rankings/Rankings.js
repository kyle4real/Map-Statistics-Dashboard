import React from "react";

import {
    makeStyles,
    withStyles,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@material-ui/core";

const Rankings = ({ allCountries }) => {
    const classes = useStyles();
    return (
        <div className={classes.rankings}>
            {/* <Paper> */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Country</StyledTableCell>
                            <StyledTableCell align="right">Rank</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCountries.map((country) => (
                            <StyledTableRow key={country.rank}>
                                <TableCell component="th" scope="row">
                                    {country.country}
                                </TableCell>
                                <TableCell align="right">#{country.rank}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </div>
    );
};

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    rankings: {},
}));

export default Rankings;
