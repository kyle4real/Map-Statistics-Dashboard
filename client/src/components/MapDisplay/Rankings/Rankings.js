import React from "react";
import pinSVG from "../../../pin.svg";
import { ShowChart as ShowChartIcon } from "@material-ui/icons";

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
    Button,
} from "@material-ui/core";

const Rankings = ({ allCountries, handleOnDisplayData, handleMapFocus }) => {
    const classes = useStyles();
    return (
        <div className={classes.rankings}>
            {/* <Paper> */}
            <TableContainer
                component={Paper}
                style={{ overflow: "auto", maxHeight: "35vh", position: "relative" }}
            >
                <Table>
                    <TableHead style={{ position: "sticky", top: "0", zIndex: "100" }}>
                        <TableRow>
                            <HeaderTableCell>Country</HeaderTableCell>
                            <HeaderTableCell>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img src={pinSVG} alt="pinSVG" className={classes.pinSVG} />
                                </div>
                            </HeaderTableCell>
                            <HeaderTableCell>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <ShowChartIcon />
                                </div>
                            </HeaderTableCell>
                            <HeaderTableCell align="right">Rank</HeaderTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allCountries.map((country) => (
                            <StyledTableRow key={country.rank}>
                                <StyledTableCell component="th" scope="row">
                                    <div className={classes.countryCell}>
                                        <div className={classes.flagImgContainer}>
                                            <img
                                                src={country.countryInfo.flag}
                                                alt={`${country.country} flag`}
                                                className={classes.flagImg}
                                            />
                                        </div>
                                        {country.country}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        color="primary"
                                        size="small"
                                        onClick={() =>
                                            handleMapFocus([
                                                country.countryInfo.lat,
                                                country.countryInfo.long,
                                            ])
                                        }
                                    >
                                        Map Focus
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Button
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleOnDisplayData(country.country)}
                                    >
                                        Display Data
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="right" style={{ textAlign: "right" }}>
                                    #{country.rank}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </div>
    );
};

const HeaderTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: `10px 12px`,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
    root: {
        padding: 12,
    },
    body: {
        fontSize: 12,
        textAlign: "center",
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
    countryCell: {
        display: "flex",
        alignItems: "center",
    },
    flagImgContainer: {
        width: 40,
        marginRight: theme.spacing(2),
    },
    flagImg: {
        width: "100%",
        height: "auto",
        boxShadow: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`,
    },
    pinSVG: {
        width: 20,
        height: 20,
    },
}));

export default Rankings;
