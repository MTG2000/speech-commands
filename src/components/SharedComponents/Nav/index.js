import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Hidden,
  Toolbar,
  AppBar,
  Drawer,
  Button,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import makeStyles from "./style.js";

const useStyles = makeStyles;

const Nav = () => {
  const classes = useStyles();
  const [modelOpen, setModleOpen] = useState(false);
  const sizeOfWindow = () => {
    if (window.innerWidth >= 600) setModleOpen(false);
  };
  useEffect(() => {
    window.addEventListener("resize", sizeOfWindow);
    return () => {
      window.removeEventListener("resize", sizeOfWindow);
    };
  }, [modelOpen]);
  const handleResponsaveNav = () => {
    setModleOpen(!modelOpen);
  };
  return (
    <nav className={classes.root}>
      <Hidden xsDown>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolBar}>
            <List className={classes.list}>
              <ListItem>
                <IconButton>
                  <NavLink
                    exact
                    activeClassName={classes.navIconButtonActive}
                    className={classes.navButton}
                    to="/"
                  >
                    <HomeIcon />
                  </NavLink>
                </IconButton>
              </ListItem>
              <ListItem>
                <Button>
                  <NavLink
                    exact
                    activeClassName={classes.navButtonActive}
                    className={classes.navButton}
                    to="/b"
                  >
                    NEWS
                  </NavLink>
                </Button>
              </ListItem>
            </List>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden smUp>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleResponsaveNav}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Drawer anchor="left" open={modelOpen} onClose={handleResponsaveNav}>
        <List className={classes.drawerList}>
          <ListItem>
            <IconButton>
              <NavLink
                exact
                activeClassName={classes.navIconButtonActive}
                className={classes.navButton}
                to="/"
              >
                <HomeIcon />
              </NavLink>
            </IconButton>
          </ListItem>
          <ListItem>
            <Button>
              <NavLink
                exact
                activeClassName={classes.navButtonActive}
                className={classes.navButton}
                to="/b"
              >
                NEWS
              </NavLink>
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default Nav;
