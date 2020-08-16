import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ProductsIcon from "@material-ui/icons/LocalGroceryStoreRounded";
import BusinessIcon from "@material-ui/icons/BusinessCenter";
import store from "../redux/store";
import { logoutUser } from "../redux/actions/userActions";
import { withFirebase } from "../components/Firebase";
import GavelIcon from "@material-ui/icons/Gavel";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import Logo from "../assets/logo.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "hsla(43, 100%, 52%, 1)",
    background:
      "linear-gradient(135deg, hsla(43, 100%, 52%, 1) 0%, hsla(358, 97%, 31%, 1) 66%)",
    background:
      "-moz-linear-gradient(135deg, hsla(43, 100%, 52%, 1) 0%, hsla(358, 97%, 31%, 1) 66%)",
    background:
      "-webkit-linear-gradient(135deg, hsla(43, 100%, 52%, 1) 0%, hsla(358, 97%, 31%, 1) 66%)",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  divider: {
    backgroundColor: "#0f171b",
  },
  listIcon: {
    color: "white",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#1a252a",
    color: "white",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user.credentials);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bem vindo(a) {user.displayName}
          </Typography>
          <Button
            onClick={() => store.dispatch(logoutUser(props.firebase))}
            color="inherit"
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <figure class="image is-48x48">
            <img src={Logo} />
          </figure>
          <h1 className="title has-text-weight-bold is-size-5 is-marginless has-text-white">
            GOV.CS.UCP
          </h1>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon className={classes.listIcon} />
            ) : (
              <ChevronRightIcon className={classes.listIcon} />
            )}
          </IconButton>
        </div>
        <Divider className={classes.divider} />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon className={classes.listIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText className={classes.listText} primary="Inicio" />
          </ListItem>
          <ListItem button component={Link} to="/products">
            <ListItemIcon className={classes.listIcon}>
              <GavelIcon />
            </ListItemIcon>
            <ListItemText primary="Legislação" />
          </ListItem>
          <ListItem button component={Link} to="/suppliers">
            <ListItemIcon className={classes.listIcon}>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Fornecedores" />
          </ListItem>
          <ListItem button component={Link} to="/contracts">
            <ListItemIcon className={classes.listIcon}>
              <span className="icon">
                <i className="fas fa-lg fa-file-contract"></i>
              </span>
            </ListItemIcon>
            <ListItemText primary="Contratos" />
          </ListItem>
          <ListItem button component={Link} to="/contracts">
            <ListItemIcon className={classes.listIcon}>
              <span className="icon">
                <i className="fas fa-lg fa-handshake"></i>
              </span>
            </ListItemIcon>
            <ListItemText primary="Acordo-Quadro" />
          </ListItem>
          <ListItem button component={Link} to="/procedures">
            <ListItemIcon className={classes.listIcon}>
              <LowPriorityIcon />
            </ListItemIcon>
            <ListItemText primary="Procedimentos" />
          </ListItem>
        </List>

        <Divider className={classes.divider} />
        <List>
          <ListItem button component={Link} to="/signup-user">
            <ListItemIcon className={classes.listIcon}>
              <span className="icon">
                <i className="fas fa-lg fa-users"></i>
              </span>
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </main>
    </div>
  );
};

export default withFirebase(Layout);
