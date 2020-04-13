const myStyle = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
    userSelect: "none",
    padding: theme.spacing(3),
  },

  title: {
    fontStyle: "italic",
    fontWeight: "bold",
  },

  number: {
    color: theme.palette.secondary.main,
  },

  stats: {
    color: "white",
    fontStyle: "normal",
    fontSize: "0.9em",
    paddingLeft: theme.spacing(2),
  },

  "@keyframes logoSpin": {
    form: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },

  logo: {
    animation: "$logoSpin infinite 20s linear",
    marginTop: "20px",
    width: "128px",
  },
  [theme.breakpoints.down('sm')]:{
    logo:{
      width:'64px'
    }
  }
});

export default myStyle;
