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
  CartesianGrid,
  XAxis,
  YAxis,
  Brush,
  LineChart,
  Line,
} from "recharts";
import ReactCountryFlag from "react-country-flag";
import myStyle from "./Style";

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
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={fontSize}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

class CountryStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: props.country,
      plotData: props.plotData,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const country = this.props.countries.filter(
      (country) => country.country === e.target.value
    )[0];

    fetch(
      `https://covid19globalstats.now.sh/api/data?ccode=${country.countryInfo.iso2}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          plotData: data.historicalData,
          country,
        });
      })
      .catch((err) => console.log(err.message));
  }

  render() {
    const { classes, countries } = this.props;
    const { country, plotData } = this.state;
    const CustomTooltip = ({ active, payload, label }) => {
      if (active) {
        return (
          <Box className={classes.tooltipContainer}>
            <p style={{ fontWeight: "bolder" }}>{`Date: ${label}`}</p>
            <p
              style={{ color: payload[0].color }}
            >{`Cases: ${payload[0].value}`}</p>
            <p
              style={{ color: payload[1].color }}
            >{`Deaths : ${payload[1].value}`}</p>
            <p
              style={{ color: payload[2].color }}
            >{`Recovered : ${payload[2].value}`}</p>
          </Box>
        );
      }

      return null;
    };

    if (country) {
      const data = [
        {
          name: "Active",
          value: country.cases - (country.deaths + country.recovered),
        },
        { name: "Deaths", value: country.deaths },
        { name: "Recovered", value: country.recovered },
      ];

      const legendData = data.map((item, index) => ({
        id: item.name,
        type: "circle",
        value: (
          <span>
            {item.name}
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
      }));

      return (
        <Box component={Paper} className={classes.container}>
          <Box display="flex" alignItems="center">
            <FlagOutlined className={classes.worldIcon} />
            <Typography variant="h4">Country stats</Typography>
          </Box>
          <Box className={classes.statsWrapper}>
            <Box className={classes.selectWrapper}>
              <Typography variant="h5" paragraph>
                Choose a country:
              </Typography>
              <Select
                variant="outlined"
                value={country.country}
                onChange={this.handleChange}
                className={classes.select}
              >
                {countries.map((country, index) => {
                  return (
                    <MenuItem key={index} value={country.country}>
                      {country.countryInfo.iso2 && (
                        <ReactCountryFlag
                          svg
                          countryCode={country.countryInfo.iso2}
                          className={classes.flag}
                        />
                      )}
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
              >{`Total cases: ${country.cases}`}</Typography>
              <Typography
                paragraph
                align="center"
                variant="h6"
                color="primary"
              >{`Today cases: ${country.todayCases}`}</Typography>
              <Typography
                paragraph
                align="center"
                variant="h6"
                color="secondary"
              >{`Today deaths: ${country.todayDeaths}`}</Typography>
              <Typography
                paragraph
                align="center"
                variant="h6"
                style={{ color: colors[2] }}
              >{`Today recovered: ${country.todayRecovered}`}</Typography>
            </Box>

            <Box
              width={{ xs: "100%", sm: "50%" }}
              height={{ xs: 300, sm: 400 }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    minAngle={3}
                    innerRadius={5}
                    outerRadius="95%"
                    data={data}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="top" payload={legendData} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box width={"100%"} height={400}>
            <ResponsiveContainer>
              <LineChart
                width={500}
                height={300}
                data={plotData}
                margin={{
                  top: 20,
                  right: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cases"
                  stroke="#039be5"
                  dot={false}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="deaths"
                  stroke="#f50057"
                  dot={false}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="recovered"
                  stroke="#00c853"
                  dot={false}
                  strokeWidth={3}
                />

                <Brush height={25} travellerWidth={20} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      );
    } else return null;
  }
}

export default withStyles(myStyle)(CountryStats);
