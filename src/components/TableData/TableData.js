import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TablePagination,
  Box,
  Paper,
  MenuItem,
  Select,
  Typography,
  TextField,
  InputAdornment,
  withStyles,
} from "@material-ui/core";
import { TableChart, Search } from "@material-ui/icons";
import ReactCountryFlag from "react-country-flag";
import myStyle from "./Style";

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.tableData,
      sort: "cases-D",
      currentPage: 0,
      itemsPerPage: 10,
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.tableTop = React.createRef();
  }

  handleChangePage(e, newPage) {
    this.setState({ currentPage: newPage });
    this.tableTop.current.scrollIntoView();
  }

  handleChangeRowsPerPage(e) {
    this.setState({ itemsPerPage: e.target.value });
  }

  handleSearch(e) {
    let input = e.target.value.trim();
    if (input === "" && !e.target.value)
      return this.setState({ tableData: this.props.tableData, currentPage: 0 });
    else if (input !== "") {
      let regex = new RegExp(`^${input}`, "gi");
      let newTableData = this.props.tableData.filter((item) => {
        return item.country.match(regex);
      });
      this.setState({ tableData: newTableData, currentPage: 0 });
    } else return;
  }

  handleSort(e) {
    const value = e.target.value;
    const sort = e.target.value.split("-");
    let tableData = this.state.tableData;
    if (sort[1] === "D") {
      tableData.sort((a, b) => {
        if (a[sort[0]] < b[sort[0]]) return 1;
        else return -1;
      });
    } else {
      tableData.sort((a, b) => {
        if (a[sort[0]] < b[sort[0]]) return -1;
        else return 1;
      });
    }

    this.setState({ tableData: tableData, sort: value, currentPage: 0 });
  }

  render() {
    const { classes } = this.props;
    const { tableData, sort, currentPage, itemsPerPage } = this.state;

    return (
      <>
        <Box className={classes.container}>
          <Box display="flex" alignItems="center" mb={3} ref={this.tableTop}>
            <TableChart className={classes.tableIcon} />
            <Typography variant="h4">Detailed stats</Typography>
          </Box>
          <Box className={classes.tableCtrl}>
            <Select
              variant="outlined"
              value={sort}
              onChange={this.handleSort}
              className={classes.select}
            >
              <MenuItem value="country-A">Sort by country A-Z</MenuItem>
              <MenuItem value="country-D">Sort by country Z-A</MenuItem>
              <MenuItem value="cases-D">Sort by cases desc</MenuItem>
              <MenuItem value="cases-A">Sort by cases asc</MenuItem>
              <MenuItem value="deaths-D">Sort by deaths desc</MenuItem>
              <MenuItem value="deaths-A">Sort by deaths asc</MenuItem>
              <MenuItem value="recovered-D">Sort by recovered desc</MenuItem>
              <MenuItem value="recovered-A">Sort by recovered asc</MenuItem>
            </Select>
            <TextField
              placeholder="Search by country"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              onChange={this.handleSearch}
            />
          </Box>
        </Box>

        <Box width="100%" mt={3} minHeight="100vh">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className={classes.mainRow}>
                  <TableCell className={classes.cell}>Country</TableCell>
                  <TableCell
                    className={classes.cell}
                    style={{ color: "white" }}
                  >
                    Cases
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    style={{ color: "#e91e63" }}
                  >
                    Deaths
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    style={{ color: "#4caf50" }}
                  >
                    Recovered
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    style={{ color: "#03a9f4" }}
                  >
                    Active
                  </TableCell>
                  <TableCell
                    className={classes.cell}
                    style={{ color: "#ffc107" }}
                  >
                    Critical
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData
                  .slice(
                    itemsPerPage * currentPage,
                    itemsPerPage * currentPage + itemsPerPage
                  )
                  .map((row, index) => (
                    <TableRow className={classes.row} key={row.country}>
                      <TableCell className={classes.cell}>
                        #{itemsPerPage * currentPage + index + 1}
                        <ReactCountryFlag
                          svg
                          countryCode={row.countryInfo.iso2 || ""}
                          className={classes.flag}
                        />
                        {row.country}
                      </TableCell>
                      <TableCell
                        className={classes.cell}
                        style={{ color: "white" }}
                      >
                        {row.cases} <br /> (+{row.todayCases})
                      </TableCell>
                      <TableCell
                        className={classes.cell}
                        style={{ color: "#e91e63" }}
                      >
                        {row.deaths} <br /> (+{row.todayDeaths})
                      </TableCell>
                      <TableCell
                        className={classes.cell}
                        style={{ color: "#4caf50" }}
                      >
                        {row.recovered} <br /> (+{row.todayRecovered})
                      </TableCell>
                      <TableCell
                        className={classes.cell}
                        style={{ color: "#03a9f4" }}
                      >
                        {row.cases - (row.deaths + row.recovered)}
                      </TableCell>
                      <TableCell
                        className={classes.cell}
                        style={{ color: "#ffc107" }}
                      >
                        {row.critical}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={tableData.length}
            page={currentPage}
            onChangePage={this.handleChangePage}
            rowsPerPage={itemsPerPage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Box>
      </>
    );
  }
}

export default withStyles(myStyle)(TableData);
