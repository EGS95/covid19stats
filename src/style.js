const myStyle = theme => ({
  "@keyframes logoSpin": {
    form: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  },

  logo: {
    animation: "$logoSpin infinite 20s linear",
    marginTop:'20px',
    width:'128px',
  },

  number: {
    color: theme.palette.secondary.main,
    margin: 0,
    padding: 0,
    display: "inline-block"
  },
  stats: {
    color: "white",
    fontStyle: "normal",
    fontSize: "0.9em"
  },
  title: {
    fontStyle: "italic",
    fontWeight: "bold",
  },

  worldIcon: {
    marginRight: "10px"
  },
  [theme.breakpoints.down("sm")]: {
    typo: {
      fontSize: "30px"
    },
    logo: {
      
      width:'64px',
    },
  },

  select: {
    margin: "10px 0 20px 0"
  },

  flag: {
    fontSize: "2em",
    lineHeight: "2em",
    marginRight: "10px"
  }
});

export default myStyle;
