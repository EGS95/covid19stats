import React, { Component } from "react";
import { Box, Typography, Select, MenuItem, Paper } from "@material-ui/core";
import { FlagOutlined } from "@material-ui/icons";
import { lightBlue, green, pink } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import myStyle from "./Style";
import countryNames from "../../countries";

const colors = [lightBlue[600], pink["A400"], green["A700"]];
const radian = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
    percent,
  } = props;
  let pos = 0.5;
  switch (payload.name) {
    case "Deaths":
      pos = 0.8;
      break;
    case "Recovered":
      pos = 0.65;
      break;
    default:
      pos = 0.5;
  }
  const radius = innerRadius + (outerRadius - innerRadius) * pos;
  const x = cx + radius * Math.cos(-midAngle * radian);
  const y = cy + radius * Math.sin(-midAngle * radian);
  let fontSize = cx < 200 ? "small" : "normal";
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={fontSize}
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

class CountryStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: null,
      countries:props.countries
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const path = `https://corona.lmao.ninja/countries/${e.target.value}`;
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          country: {
            name: e.target.value,
            confirmed: data.cases,
            deaths: data.deaths,
            recovered: data.recovered,
          },
        });
      });
  }

  componentDidMount() {
    fetch(`https://ipinfo.io/?token=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        let defaultCountry = countryNames[data.country];
        fetch(`https://corona.lmao.ninja/countries/${data.country}`)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              country: {
                name:
                  defaultCountry === "USA" ? "US" : defaultCountry,
                confirmed: data.cases,
                deaths: data.deaths,
                recovered: data.recovered,
              },
            });
          });
      });

      let sortedCountries = this.props.countries.sort((a,b)=> {
        if(a.country < b.country) return -1
        else return 1
      })

      this.setState({countries:sortedCountries})
  }

  render() {
    const { classes } = this.props;
    const { country,countries } = this.state;
    if(country){
      const data = [
        {
          name: "Infected",
          value: country.confirmed - (country.deaths + country.recovered),
        },
        { name: "Deaths", value: country.deaths },
        { name: "Recovered", value: country.recovered },
      ];
      return (
        <Box
          mt={5}
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          component={Paper}
          py={3}
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
            justifyContent="space-evenly"
            width="100%"
            mt={3}
          >
            <Box
              width={{ xs: "100%", sm: "50%" }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              mb={3}
              mr={3}
            >
              <Typography variant="h5" paragraph>
                Choose a country:
              </Typography>
              <Select
                variant="outlined"
                value={country.name}
                onChange={this.handleChange}
                className={classes.select}
              >
                {countries.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country.country}>
                      <ReactCountryFlag
                        svg
                        countryCode={country.countryInfo.iso2 || ""}
                        className={classes.flag}
                      />
                      {country.country}
                    </MenuItem>
                  );
                })}
              </Select>
              <Typography
                paragraph
                align="center"
                variant="h4"
                color="textPrimary"
              >{`Total cases: ${country.confirmed}`}</Typography>
            </Box>
  
            <Box
              width={{ xs: "100%", sm: "50%" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              height={400}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    minAngle={3}
                    activeIndex={0}
                    innerRadius={5}
                    outerRadius="95%"
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
                  <Legend
                    verticalAlign="top"
                    payload={data.map((item, index) => ({
                      id: item.name,
                      type: "circle",
                      value: (
                        <span>
                          {item.name}{" "}
                          <p
                            style={{
                              color: colors[index],
                              fontSize: "15px",
                              fontWeight: "bold",
                            }}
                          >
                            ( {item.value} )
                          </p>
                        </span>
                      ),
                      color: colors[index],
                    }))}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Box>
      );
    }

    else return null;
    
    
  }
  
}

export default withStyles(myStyle)(CountryStats);
