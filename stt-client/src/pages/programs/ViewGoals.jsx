import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddGoals from './AddGoals';
import UpdateGoal from "./UpdateGoal";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Moment from 'react-moment';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: "1",
    },
    formControl: {
        minWidth: 150,
    },
}));

function ViewGoals(props) {
    const classes = useStyles();
    const { goals, currentClient, currentProgram } = props;
    return (
        (currentClient && currentProgram) ? (
            < div className={classes.grow} >
                <Paper style={{ padding: '1rem' }}>
                    <Typography variant="h5">
                        Start Date: {(currentProgram) ? (<Moment format="MMMM D, YYYY">{currentProgram.startDate}</Moment>) : ''}
                    </Typography>
                    <Container>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography variant="h6">Current Goal Summary</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container spacing={1}>
                                    <Grid item className={classes.grow} >
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="left">Goal</TableCell>
                                                        <TableCell align="left">Target</TableCell>
                                                        <TableCell align="right"></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {goals.map((goal) => (
                                                        <TableRow className={classes.grow}>
                                                            <TableCell align="left">{goal.longTermGoal}</TableCell>
                                                            <TableCell align="left">{goal.target}</TableCell>
                                                            <TableCell>
                                                                <Button>
                                                                    <Link to={{ pathname: "/goal-edit", state: { "goal": goal } }} >
                                                                        Edit
                                                                    </Link>
                                                                </Button>
                                                            </TableCell>

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <AddGoals />
                    </Container>
                </Paper>
            </div >) : null
    );
}

const mapStateToProps = (state) => ({
    currentClient: state.client.currentClient,
    currentProgram: state.prog.currentProgram,
    goals: state.goals.goals,
});

export default connect(mapStateToProps)(ViewGoals);