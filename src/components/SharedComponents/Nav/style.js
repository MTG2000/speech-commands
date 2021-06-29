import { makeStyles } from "@material-ui/core/styles";

const navHeight = 45;

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "relative",
    zIndex: "100",
    height: 0,
    marginBottom: navHeight,
  },
  appBar: {
    height: navHeight,
    opacity: ".8",
    backgroundColor: "var(--primary)",
  },
  toolBar: {
    minHeight: navHeight,
  },
  list: {
    display: "flex",
  },
  navButton: {
    color: " white",
    textDecoration: "none",
    fontSize: "20px",
    padding: "0 7px",
  },
  drawerList: {
    backgroundColor: "var(--primary)",
    opacity: ".7",
  },
  DrawerNavButton: {
    textDecoration: "none",
    fontSize: "20px",
    padding: "0 7px",
    color: "var(--primary)",
  },
  navButtonActive: {
    fontWeight: "bold",
    color: " black",
  },

  DrawerNavButtonActive: {
    fontWeight: "bold",
    fontSize: "25px",
  },
}));
