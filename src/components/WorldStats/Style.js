import { makeStyles } from "@material-ui/core/styles";

const myStyle = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  worldIcon: {
    marginRight: "10px",
    fontSize:'35px',
    color:theme.palette.primary.main,
  },

  tileWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: theme.spacing(3),
  },

  tile: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "200px",
    width: "100%",
    marginRight: "5px",
    borderRadius:'5px'
  },

  [theme.breakpoints.down("sm")]: {
    typo: {
      fontSize: "20px",
    },
    tile: {
      height: "150px",
    },
  },

  [theme.breakpoints.down("xs")]: {
    tileWrapper: {
      flexWrap:'wrap',
    },
    tile: {
      margin: '1%',
      width:'48%'
    },
  },
}));

export default myStyle;
