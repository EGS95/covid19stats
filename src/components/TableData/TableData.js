import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  Hidden,
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
import { lightBlue, green, pink, amber } from "@material-ui/core/colors";
import myStyle from "./Style";

class TableData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.tableData,
      sort: "cases-D",
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    let input = e.target.value.trim();
    if (input === "") return this.setState({ tableData: this.props.tableData });
    else {
      let regex = new RegExp(`^${input}`, "gi");
      let newTableData = this.props.tableData.filter((item) => {
        return item.country.match(regex);
      });
      this.setState({ tableData: newTableData });
    }
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

    this.setState({ tableData: tableData, sort: value });
  }

  render() {
    const { classes } = this.props;
    const { tableData, sort } = this.state;
    const MobTableCell = (props) => {
      const { color, head, children } = props;
      if (head)
        return (
          <TableCell
            variant="head"
            style={{ width: "100%" }}
            align="center"
            className={classes.cell}
            component="th"
            scope="row"
          >
            {children}
          </TableCell>
        );
      else
        return (
          <TableCell
            style={{ color: color }}
            flex={1}
            align="center"
            className={classes.cell}
          >
            {children}
          </TableCell>
        );
    };
    return (
      <>
        <Box className={classes.container}>
          <Box display="flex" alignItems="center" mb={3}>
            <TableChart
              fontSize="large"
              className={classes.worldIcon}
              color="primary"
            />
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
              <MenuItem value="cases-D">Sort by confirmed desc</MenuItem>
              <MenuItem value="cases-A">Sort by confirmed asc</MenuItem>
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

        <Hidden xsDown>
          <Box width="100%" mt={3} minHeight="100vh">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className={classes.mainRow}>
                    <TableCell>Country</TableCell>
                    <TableCell align="left">Confirmed</TableCell>
                    <TableCell align="left">Active</TableCell>
                    <TableCell align="left">Deaths</TableCell>
                    <TableCell align="left">Critical</TableCell>
                    <TableCell align="left">Recovered</TableCell>
                    <TableCell align="left">Today cases</TableCell>
                    <TableCell align="left">Today deaths</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow classes={{ root: classes.row }} key={row.country}>
                      <TableCell component="th" scope="row">
                        <ReactCountryFlag
                          svg
                          countryCode={row.countryInfo.iso2 || ""}
                          className={classes.flag}
                        />
                        {row.country}
                      </TableCell>
                      <TableCell align="left">{row.cases}</TableCell>
                      <TableCell style={{ color: lightBlue[500] }} align="left">
                        {row.active}
                      </TableCell>
                      <TableCell style={{ color: pink[500] }} align="left">
                        {row.deaths}
                      </TableCell>
                      <TableCell style={{ color: amber[500] }} align="left">
                        {row.critical}
                      </TableCell>
                      <TableCell style={{ color: green[500] }} align="left">
                        {row.recovered}
                      </TableCell>
                      <TableCell align="left" style={{ color: lightBlue[500] }}>
                        +{row.todayCases}
                      </TableCell>
                      <TableCell align="left" style={{ color: pink[500] }}>
                        +{row.todayDeaths}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Hidden>

        <Hidden smUp>
          <Box width="100%" mt={3} minHeight="100vh">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow className={classes.mainRow}>
                    <MobTableCell head>Country (Confirmed)</MobTableCell>
                    <MobTableCell color={lightBlue[500]}>Active</MobTableCell>
                    <MobTableCell color={pink[500]}>Deaths</MobTableCell>
                    <MobTableCell color={amber[500]}>Critical</MobTableCell>
                    <MobTableCell color={green[500]}>Recovered</MobTableCell>
                    <MobTableCell color={lightBlue[500]}>
                      Today cases
                    </MobTableCell>
                    <MobTableCell color={pink[500]}>Today deaths</MobTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow classes={{ root: classes.row }} key={row.country}>
                      <MobTableCell head>
                        <ReactCountryFlag
                          svg
                          countryCode={row.countryInfo.iso2 || ""}
                          className={classes.flag}
                        />
                        {row.country} ({row.cases})
                      </MobTableCell>
                      <MobTableCell color={lightBlue[500]}>
                        {row.active}
                      </MobTableCell>
                      <MobTableCell color={pink[500]}>
                        {row.deaths}
                      </MobTableCell>
                      <MobTableCell color={amber[500]}>
                        {row.critical}
                      </MobTableCell>
                      <MobTableCell color={green[500]}>
                        {row.recovered}
                      </MobTableCell>
                      <MobTableCell color={lightBlue[500]}>
                        +{row.todayCases}
                      </MobTableCell>
                      <MobTableCell color={pink[500]}>
                        +{row.todayDeaths}
                      </MobTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Hidden>
      </>
    );
  }
}

export default withStyles(myStyle)(TableData);
