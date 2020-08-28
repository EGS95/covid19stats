const myStyle = (theme) => ({
  container: {
    width: "100%",
    marginTop: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  tableIcon: {
    marginRight: "10px",
    fontSize: "35px",
    color: theme.palette.primary.main,
  },

  tableCtrl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },

  mainRow: {
    backgroundColor: "#1e1e1e",
  },

  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#242a31",
    },
  },

  flag: {
    fontSize: "2em",
    marginRight: "10px",
    marginLeft: "5px",
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
    cell: {
      padding: "10px 0",
      width: "33%",
      textAlign: "center",
      "&:nth-child(1)": {
        width: "100%",
      },
      "&:nth-child(5)": {
        width: "49.5%",
      },
      "&:nth-child(6)": {
        width: "49.5%",
      },
    },
  },
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "10px",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default myStyle;
