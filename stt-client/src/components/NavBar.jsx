import React from 'react'
import { connect } from "react-redux";
import { loggedOut } from "../redux/actions/authActions";
import { clearClients } from "../redux/actions/clientActions";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: "1",
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: theme.palette.secondary,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
}));

function NavBar(props) {
    const classes = useStyles();
    const history = useHistory();
    const handleDrawerToggle = () => {
        props.setMobileOpen(!props.mobileOpen);
    };
    async function handleLogout() {
        await Auth.signOut();
        //userHasAuthenticated(false);
        props.loggedOut();
        //remove clients & currentClient from store
        props.clearClients();
        //redirect
        history.push("/login");
    }
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.grow}>
                    Speech Therapy Tracker
                        </Typography>
                {props.isAuthenticated ? (
                    <>
                        <div>
                            <Link onClick={handleLogout}>
                                <Typography
                                    variant="button"
                                    noWrap
                                    className={classes.grow}
                                    color="secondary"
                                >
                                    Logout
                                    </Typography>
                            </Link>
                        </div>
                    </>
                ) : (
                        <>
                            <div>
                                <Link to="/signup">
                                    <ListItemText primary={"Signup"} />
                                </Link>
                            </div>
                            <div>
                                <Link to="/login">
                                    <ListItemText primary={"Login"} />
                                </Link>
                            </div>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    loggedOut: () => dispatch(loggedOut()),
    clearClients: () => dispatch(clearClients()),
});


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);