import React, { useState } from 'react'
import { connect } from "react-redux";
import { appendGoal } from "../../redux/actions/goalsActions";
import { onError } from "../../libs/errorLib";
import { addGoal } from '../../api';
import { useFormFields } from "../../libs/hooksLib";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: "1",
    },
    formControl: {
        minWidth: 150,
    },
}));



function AddGoals(props) {
    const classes = useStyles();
    const { currentClient, currentProgram, appendGoal } = props;
    const [fields, handleFieldChange] = useFormFields({
        longTermGoal: "",
        subGoals: [],
        target: [],
    });
    const [category, setCategory] = useState('');


    async function insertGoal() {
        try {
            await addGoal({
                goal: {
                    category: category,
                    longTermGoal: fields.longTermGoal,
                    target: fields.target,
                },
                programId: currentProgram.programId,
                clientId: currentClient,
            }).then((data) => {
                console.log(data);
                appendGoal(data);
            });
            //clear form values after submit complete
            setCategory('');
            handleFieldChange({longTermGoal: ''});
        } catch (e) {
            onError(e);
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }



    /*componentDidMount = async () => {

    }*/
    return (
        <div style={{ flexGrow: 1 }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<AddCircleIcon />}
                >
                    <Typography variant="h6">Add Long-Term Goal</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={1}>
                        <Grid item className={classes.grow}>
                            <Card style={{ padding: 2, textAlign: 'center' }}>
                                <CardContent>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <FormControl variant="outlined" className={classes.formControl}>
                                                            <InputLabel id="goal-category-label">Category</InputLabel>
                                                            <Select
                                                                labelId="goal-category-label"
                                                                id="category"
                                                                value={category}
                                                                onChange={handleCategoryChange}
                                                                label="Category"
                                                            >
                                                                <MenuItem value="">
                                                                    <em></em>
                                                                </MenuItem>
                                                                <MenuItem value="articulation">
                                                                    <em>Articulation</em>
                                                                </MenuItem>
                                                                <MenuItem value="expressive">
                                                                    <em>Expressive Communication</em>
                                                                </MenuItem>
                                                                <MenuItem value="receptive">
                                                                    <em>Receptive Communication</em>
                                                                </MenuItem>
                                                                <MenuItem value="social_skills">
                                                                    <em>Social Skills</em>
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <TextField fullWidth multiline="true" id="longTermGoal" label="Goal" variant="outlined" value={fields.longTermGoal} onChange={handleFieldChange} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">
                                                        <TextField id="target" label="Target" variant="outlined" value={fields.target} onChange={handleFieldChange} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left"><Button variant="contained" color="primary" onClick={insertGoal}>Add</Button></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentClient: state.client.currentClient,
    currentProgram: state.prog.currentProgram,
});

const mapDispatchToProps = (dispatch) => ({
    appendGoal: (payload) => dispatch(appendGoal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoals);