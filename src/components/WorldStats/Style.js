import { makeStyles } from "@material-ui/core/styles";

const myStyle = makeStyles((theme) => ({
  worldIcon: {
    marginRight: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    typo: {
      fontSize: "30px",
    },
  },
}));

export default myStyle;
