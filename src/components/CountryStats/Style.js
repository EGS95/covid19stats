const myStyle = (theme) => ({
  container: {
    marginTop: theme.spacing(5),
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "24px 0",
  },
  statsWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: theme.spacing(3),
  },
  selectWrapper: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0 24px 24px 0",
  },
  [theme.breakpoints.down("xs")]: {
    statsWrapper: {
      flexDirection: "column",
    },
    selectWrapper: {
      width: "100%",
    },
  },
  worldIcon: {
    marginRight: "10px",
    fontSize: "35px",
    color: theme.palette.primary.main,
  },

  select: {
    margin: "10px 0 20px 0",
  },

  flag: {
    fontSize: "2em",
    lineHeight: "2em",
    marginRight: "10px",
  },
});

export default myStyle;
