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
  withStyles,
} from "@material-ui/core";
import { TableChart } from "@material-ui/icons";
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
    return (
      <>
        <Box
          width="100%"
          mt={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center" mb={3}>
            <TableChart
              fontSize="large"
              className={classes.worldIcon}
              color="primary"
            />
            <Typography variant="h4">Detailed stats</Typography>
          </Box>
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
        </Box>

        <Hidden xsDown>
          <Box width="100%">
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
          <Box width="100%">
            <TableContainer className={classes.container} component={Paper}>
              <Table>
                <TableHead>
                  <TableRow
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className={classes.mainRow}
                  >
                    <TableCell
                      variant="head"
                      style={{ width: "100%" }}
                      align="center"
                      className={classes.cell}
                    >
                      Country
                    </TableCell>
                    <TableCell
                      style={{ width: "25%" }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Confirmed
                    </TableCell>
                    <TableCell
                      style={{ width: "25%", color: lightBlue[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Active
                    </TableCell>
                    <TableCell
                      style={{ width: "25%", color: pink[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Deaths
                    </TableCell>
                    <TableCell
                      style={{ width: "25%", color: amber[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Critical
                    </TableCell>
                    <TableCell
                      style={{ width: "33%", color: green[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Recovered
                    </TableCell>
                    <TableCell
                      style={{ width: "33%", color: lightBlue[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Today cases
                    </TableCell>
                    <TableCell
                      style={{ width: "33%", color: pink[500] }}
                      flex={1}
                      align="center"
                      className={classes.cell}
                    >
                      Today deaths
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow
                      classes={{ root: classes.row }}
                      key={row.country}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <TableCell
                        style={{ width: "100%" }}
                        align="center"
                        variant="head"
                        component="th"
                        scope="row"
                        className={classes.cell}
                      >
                        <ReactCountryFlag
                        svg
                        countryCode={row.countryInfo.iso2 || ""}
                        className={classes.flag}
                      />
                        {row.country}
                      </TableCell>
                      <TableCell
                        style={{ width: "25%" }}
                        flex={1}
                        align="center"
                        className={classes.cell}
                      >
                        {row.cases}
                      </TableCell>
                      <TableCell
                        style={{ color: lightBlue[500], width: "25%" }}
                        align="center"
                        flex={1}
                        className={classes.cell}
                      >
                        {row.active}
                      </TableCell>
                      <TableCell
                        flex={1}
                        style={{ color: pink[500], width: "25%" }}
                        align="center"
                        className={classes.cell}
                      >
                        {row.deaths}
                      </TableCell>
                      <TableCell
                        flex={1}
                        style={{ color: amber[500], width: "25%" }}
                        align="center"
                        className={classes.cell}
                      >
                        {row.critical}
                      </TableCell>
                      <TableCell
                        flex={1}
                        style={{ color: green[500], width: "33%" }}
                        align="center"
                        className={classes.cell}
                      >
                        {row.recovered}
                      </TableCell>
                      <TableCell
                        style={{ width: "33%", color: lightBlue[500] }}
                        flex={1}
                        align="center"
                        className={classes.cell}
                      >
                        +{row.todayCases}
                      </TableCell>
                      <TableCell
                        style={{ width: "33%", color: pink[500] }}
                        flex={1}
                        align="center"
                        className={classes.cell}
                      >
                        +{row.todayDeaths}
                      </TableCell>
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
