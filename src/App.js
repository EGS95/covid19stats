import React, { Component } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  Select,
  MenuItem
} from "@material-ui/core";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  withStyles
} from "@material-ui/core/styles";
import { lightBlue, green, pink } from "@material-ui/core/colors";
import { PublicRounded, FlagOutlined } from "@material-ui/icons";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import myStyle from "./style";
import "./App.css";
import ReactCountryFlag from "react-country-flag";
import "./countries";
import countryNames from "./countries";
import CountUp from 'react-countup';

const appTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: lightBlue[600]
      },
      type: "dark"
    }
  })
);

const colors = [lightBlue[600], pink["A400"], green["A700"]];
const radian = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
  percent,
  value,
  index
}) => {
  console.log(payload)
  let pos = 0.5;
  switch(payload.name){
    case 'Confirmed': 
    pos = 0.5;
    break;
    case 'Deaths' : pos = 0.8;
    break;
    case 'Recovered' : pos = 0.65;
    break;
    default: pos = 0.5
  }
  const radius = innerRadius + (outerRadius - innerRadius) * pos;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      worldData: null,
      countries: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const path = `https://covid19.mathdro.id/api/countries/${e.target.value}`;
    fetch(path)
      .then(res => res.json())
      .then(data => {
        this.setState({
          country: {
            name: e.target.value,
            confirmed: data.confirmed.value,
            deaths: data.deaths.value,
            recovered: data.recovered.value
          }
        });
      });
  }

  componentDidMount() {
    fetch("https://covid19.mathdro.id/api/")
      .then(res => res.json())
      .then(data => {
        this.setState({
          worldData: {
            confirmed: data.confirmed.value,
            deaths: data.deaths.value,
            recovered: data.recovered.value
          }
        });
      });

    fetch("https://covid19.mathdro.id/api/countries")
      .then(res => res.json())
      .then(data => {
        this.setState({
          countries: data.countries
        });
      });

    fetch(`https://ipinfo.io/?token=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        let defaultCountry = countryNames[data.country];
        fetch(`https://covid19.mathdro.id/api/countries/${data.country}`)
          .then(res => res.json())
          .then(data => {
            this.setState({
              country: {
                name:
                  defaultCountry === "United States" ? "US" : defaultCountry,
                confirmed: data.confirmed.value,
                deaths: data.deaths.value,
                recovered: data.recovered.value
              }
            });
          });
      });
  }

  render() {
    const { classes } = this.props;
    const { country, countries, worldData } = this.state;
    if (country && countries && worldData) {
      const data = [
        { name: "Confirmed", value: country.confirmed },
        { name: "Deaths", value: country.deaths },
        { name: "Recovered", value: country.recovered }
      ];
      return (
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="100vh"
            alignItems="center"
            p={3}
            style={{overflowX:'hidden'}}
          >
            <Typography className={classes.title} variant="h2" color="primary">
              Covid<span className={classes.number}>19</span>{" "}
              <span className={classes.stats}>stats</span>
            </Typography>
            <Box
              mt={5}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <PublicRounded
                  fontSize="large"
                  className={classes.worldIcon}
                  color="primary"
                />
                <Typography variant="h4">World stats</Typography>
              </Box>

              <Box
                mt={3}
                display="flex"
                width="100%"
                alignItems="center"
                justifyContent="space-around"
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="primary.main"
                  width={{ xs: "100%", sm: "30%" }}
                  height="200px"
                >
                  <Typography className={classes.typo} variant="h3" paragraph>
                    Confirmed
                  </Typography>
                  <Typography className={classes.typo} variant="h3">
                  <CountUp end={worldData.confirmed}/>
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  bgcolor="secondary.main"
                  width={{ xs: "100%", sm: "30%" }}
                  height="200px"
                >
                  <Typography className={classes.typo} variant="h3" paragraph>
                    Deaths
                  </Typography>
                  <Typography className={classes.typo} variant="h3">
                    <CountUp end={worldData.deaths}/>
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                  bgcolor={green["A700"]}
                  width={{ xs: "100%", sm: "30%" }}
                  height="200px"
                >
                  <Typography className={classes.typo} variant="h3" paragraph>
                    Recovered
                  </Typography>
                  <Typography className={classes.typo} variant="h3">
                  <CountUp end={worldData.recovered}/>
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              mt={5}
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box display="flex" alignItems="center">
                <FlagOutlined
                  fontSize="large"
                  className={classes.worldIcon}
                  color="primary"
                />
                <Typography variant="h4">Country stats</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                alignItems="center"
                justifyContent="stretch"
                width="100%"
                mt={3}
              >
                <Box
                  width={{ xs: "100%", sm: "30%" }}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb={3}
                >
                  <Typography variant="h5" paragraph>
                    Choose a country:
                  </Typography>
                  <Select
                    variant="outlined"
                    value={country.name}
                    onChange={this.handleChange}
                  >
                    {countries.map((country, index) => {
                      return (
                        <MenuItem key={index} value={country.name}>
                          <ReactCountryFlag
                            svg
                            countryCode={country.iso2 || "CN"}
                            style={{
                              fontSize: "2em",
                              lineHeight: "2em",
                              marginRight: "10px"
                            }}
                          />
                          {country.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
                <Box
                  width={{ xs: "100%", sm: "70%" }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <PieChart width={400} height={400}>
                    <Pie
                      minAngle={3}
                      activeIndex={0}
                      innerRadius={5}
                      data={data}
                      labelLine={false}
                      label={renderCustomizedLabel}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index]} />
                      ))}
                    </Pie>
                    <Legend iconType="circle" verticalAlign="top" />
                    <Tooltip />
                  </PieChart>
                </Box>
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      );
    } else return null;
  }
}

export default withStyles(myStyle)(App);
