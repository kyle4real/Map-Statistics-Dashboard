import React, { useState } from "react";
import pinSVG from "../../../pin.svg";
import { ShowChart as ShowChartIcon, Search as SearchIcon } from "@material-ui/icons";

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
    TextField,
    Typography,
    InputAdornment,
} from "@material-ui/core";

const Rankings = ({ allCountries, handleOnDisplayData, handleMapFocus }) => {
    const classes = useStyles();
    const [search, setSearch] = useState("");

    const countriesFilter = (country) => {
        if (search.length) {
            return country.country.toLowerCase().includes(search.toLowerCase()) ? true : false;
        } else {
            return true;
        }
    };
    const handleSearch = (value) => {
        setSearch(value);
    };

    return (
        <div className={classes.rankings}>
            <TextField
                autoComplete="off"
                autoCapitalize="words"
                value={search}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                placeholder="Search Countries"
                className={classes.searchBox}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <TableContainer component={Paper} className={classes.tableContainer} id="style-1">
                <Table>
                    <TableHead className={classes.tableHead}>
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
                        {!allCountries.filter(countriesFilter).length ? (
                            <div className={classes.noResults}>
                                <Typography variant="h5">No Results</Typography>
                            </div>
                        ) : (
                            allCountries.filter(countriesFilter).map((country) => (
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
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const HeaderTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.primary.main,
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
    tableContainer: {
        maxHeight: "35vh",
    },
    tableHead: {
        position: "sticky",
        top: "0",
        zIndex: "100",
    },
    searchBox: {
        minWidth: "20%",
        marginBottom: theme.spacing(2),
    },
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
