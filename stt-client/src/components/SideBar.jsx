import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { storeClient } from "../redux/actions/clientActions";
import { storeProgram, storeAllPrograms, clearPrograms } from "../redux/actions/programsActions";
import { storeGoals } from "../redux/actions/goalsActions";
import { listPrograms, listGoals } from '../api';
import { onError } from "../libs/errorLib";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TableChartIcon from '@material-ui/icons/TableChart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import "bootstrap/dist/css/bootstrap.min.css";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
}));

function SideBar(props) {

  const { window, currentClient, clients, storeClient, storeAllPrograms, storeProgram, latestProgram, clearPrograms, storeGoals } = props;
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    loadGoals();
  }, [latestProgram]);

  const loadGoals = async () => {
    if (latestProgram) {
      try {
        await listGoals(latestProgram.programId).then((res) => {
          storeGoals(res);
        })
      }
      catch (e) {
        onError(e);
      }
    }
  }

  const handleDrawerToggle = () => {
    props.setMobileOpen(!props.mobileOpen);
  };
  const handleChangeClient = async (event) => {
    let client = event.target.value;
    storeClient(client);
    //load programs & goals for client
    if (client) {
      try {
        await listPrograms(client).then((data) => {
          storeAllPrograms(data)
          storeProgram(data[0]);
        });
      }
      catch (e) {
        onError(e);
      }
    }
    else{
      clearPrograms();
    }

  }


  const drawer = (props.auth.isAuthenticated) ? (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <FormControl variant="outlined" className={classes.grow}>
            <InputLabel id="client-select-label">Client</InputLabel>
            <Select
              labelId="client-select-label"
              id="client"
              value={currentClient}
              onChange={handleChangeClient}
              label="Client"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clients.map((c) => (
                <MenuItem key={c.clientId} value={c.clientId}>
                  {c.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem button key="Dashboard">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <Link to="/">
            <ListItemText primary={"Dashboard"} />
          </Link>
        </ListItem>
        <ListItem button key="Program Block">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <Link to="/program">
            <ListItemText primary={"Program Block"} />
          </Link>
        </ListItem>
        <ListItem button key="Sessions">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <Link to="/sessions">
            <ListItemText primary={"Sessions"} />
          </Link>
        </ListItem>
        <ListItem button key="Profile">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <Link to="/profile">
            <ListItemText primary={"Profile"} />
          </Link>
        </ListItem>
        <ListItem button key="Add Client">
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <Link to="/add-client">
            <ListItemText primary={"Add Client"} />
          </Link>
        </ListItem>
      </List>
      <Divider />
    </div >
  ) : null;

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={props.mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => ({
  latestProgram: state.prog.currentProgram,
  currentClient: state.client.currentClient,
  clients: state.client.clients,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  storeClient: (payload) => dispatch(storeClient(payload)),
  storeProgram: (payload) => dispatch(storeProgram(payload)),
  storeAllPrograms: (payload) => dispatch(storeAllPrograms(payload)),
  clearPrograms: (payload) => dispatch(clearPrograms()),
  storeGoals: (payload) => dispatch(storeGoals(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);