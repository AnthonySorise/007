import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';

function FilmTable(props) {
    const [selectedColumn, setSelectedColumn] = useState(null);

    const useStyles = makeStyles({
        tableContainer: {
            height: '100vh',
            '&::-webkit-scrollbar': {
              width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#6c7a86',
              outline: '2px solid #6c7a86',
            }
        },
        tableLabel: {
            fontWeight: 'bold',
            background: 'black',
            color: 'white',
        },
        isComparisonColumn: {
            color: '#b28116',
        },
        selectedRow: {
            background: '#b28116',
            '& td': {
                color: 'white',
            },
        },
        tableData: {
            cursor: 'pointer',
            '&:hover': {
                background: '#f9ebce',
                color: 'black',
            },
        },
        icon: {
            pointerEvents: 'none',
        },
    });

    const handleSelectTableCell = (e) => {
        let tableCell = e.target;

        let key = tableCell.getAttribute("datakey");
        let value = tableCell.getAttribute("datavalue");
        props.setselectedKeyValuePair({ key, value });

        let index = tableCell.getAttribute("index");
        setSelectedColumn(index);
    }

    const isSelectedRow = (iRow) => {
        let thisRowsData = props.data[iRow];
        let selectedKey = props.selectedKeyValuePair.key;
        let selectedValue = props.selectedKeyValuePair.value;

        return thisRowsData && thisRowsData.hasOwnProperty(selectedKey) && thisRowsData[selectedKey] == selectedValue;
    }

    const classes = useStyles();
    return (
        <TableContainer className={classes.tableContainer} component={Paper} align="center">
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={selectedColumn == 0 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Title</TableCell>
                        <TableCell className={selectedColumn == 1 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Year</TableCell>
                        <TableCell className={selectedColumn == 2 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Bond</TableCell>
                        <TableCell className={selectedColumn == 3 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">M</TableCell>
                        <TableCell className={selectedColumn == 4 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">MoneyPenny</TableCell>
                        <TableCell className={selectedColumn == 5 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Q</TableCell>
                        <TableCell className={selectedColumn == 6 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Director</TableCell>
                        <TableCell className={selectedColumn == 7 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">SPECTRE</TableCell>
                        <TableCell className={selectedColumn == 8 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Cold War</TableCell>
                        <TableCell className={selectedColumn == 9 ? classes.tableLabel + " " + classes.isComparisonColumn : classes.tableLabel} align="center">Bond's Wife</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row, i) => (
                        <TableRow key={i} className={isSelectedRow(i) ? classes.selectedRow : ""}>
                            <TableCell className={classes.tableData} align="center"
                                index="0"
                                datakey="Title"
                                datavalue={row && row.Title ? row.Title : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.Title ? row.Title : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="1"
                                datakey="Year"
                                datavalue={row && row.Year ? row.Year : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.Year ? row.Year : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="2"
                                datakey="Bond"
                                datavalue={row && row.Bond ? row.Bond : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.Bond ? row.Bond : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="3"
                                datakey="M"
                                datavalue={row && row.M ? row.M : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.M ? row.M : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="4"
                                datakey="MoneyPenny"
                                datavalue={row && row.MoneyPenny ? row.MoneyPenny : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.MoneyPenny ? row.MoneyPenny : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="5"
                                datakey="Q"
                                datavalue={row && row.Q ? row.Q : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.Q ? row.Q : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="6"
                                datakey="Director"
                                datavalue={row && row.Director ? row.Director : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.Director ? row.Director : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="7"
                                datakey="SPECTRE"
                                datavalue={row && row.SPECTRE ? row.SPECTRE : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.SPECTRE == 1 ?
                                    <CheckIcon className={classes.icon} />
                                    : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="8"
                                datakey="ColdWar"
                                datavalue={row && row.ColdWar ? row.ColdWar : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.ColdWar == 1 ?
                                    <CheckIcon className={classes.icon} />
                                    : ""}
                            </TableCell>
                            <TableCell className={classes.tableData} align="center"
                                index="9"
                                datakey="BondsWife"
                                datavalue={row && row.BondsWife ? row.BondsWife : ""}
                                onClick={handleSelectTableCell}>
                                {row && row.BondsWife == 1 ?
                                    <CheckIcon className={classes.icon} />
                                    : ""}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FilmTable;