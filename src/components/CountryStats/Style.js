const myStyle = (theme) => ({
  container: {
    marginTop: theme.spacing(5),
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "24px 0",
  },

  worldIcon: {
    marginRight: "10px",
    fontSize: "35px",
    color: theme.palette.primary.main,
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
  },

  select: {
    margin: "10px 0 20px 0",
  },

  flag: {
    fontSize: "2em",
    margin: "0 10px 0 0",
  },

  tooltipContainer: {
    backgroundColor: "black",
    color: "white",
    opacity: 0.7,
    borderRadius: "10px",
    padding: "10px",
    width: "200px",
  },

  [theme.breakpoints.down("xs")]: {
    statsWrapper: {
      flexDirection: "column",
    },
    selectWrapper: {
      width: "100%",
    },
  },
});

export default myStyle;
