import React, { useEffect } from "react";
import { connect } from "react-redux";
import { storeAllClients } from "../redux/actions/clientActions";
import { loggedIn } from "../redux/actions/authActions";
import Routes from "../routes/Routes";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { listClients } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: "1",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App(props) {
  const { isAuthenticated, loggedIn, storeAllClients } = props;
  //const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    onLoad(props);
  }, [props]);
  async function onLoad(props) {
    try {
      await Auth.currentSession();
      loggedIn();
      //userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    if (isAuthenticated) {
      try {
        await listClients().then((res) => {
          storeAllClients(res);
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router history={history}>
        <NavBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <SideBar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Routes />
          </main>
        </>
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  storeAllClients: (payload) => dispatch(storeAllClients(payload)),
  loggedIn: () => dispatch(loggedIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
