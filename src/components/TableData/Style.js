const myStyle = (theme) => ({
  container: {
    width: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  tableCtrl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  [theme.breakpoints.down("xs")]: {
    tableCtrl: {
      flexDirection: "column",
    },
    select: {
      marginBottom: "20px",
    },
    mainRow: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
    },
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
    width: "33%",
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
