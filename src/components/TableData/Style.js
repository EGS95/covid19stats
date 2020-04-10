const myStyle = (theme) => ({
  select: {
    margin: "10px 0 20px 0",
  },



  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#242a31",
    },
  },

  mainRow: {
    backgroundColor: "#1e1e1e",
  },
  cell: {
    padding: "10px 0",
    width: "33%"
  },
  worldIcon: {
    marginRight: "10px",
  },
  flag: {
    fontSize: "2em",
    lineHeight: "2em",
    marginRight: "10px",
  },
});

export default myStyle;
