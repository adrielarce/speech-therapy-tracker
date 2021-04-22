import React from 'react';
import { connect } from "react-redux";
import { storeProgram } from "../../redux/actions/programsActions";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    formControl: {
        display: "block",
        marginTop: 3,
    },
    programSelect: {
        minWidth: 120,
    },
}));

function ViewProgram(props) {
    const { programs, currentProgram, setProgram } = props;
    const classes = useStyles();

    const handleChangeProgram = async (event) => {
        let program = event.target.value;
        console.log(program);
        setProgram(program);
    }

    return (
        <React.Fragment>
            {
                (programs.length > 0) ? (
                    <FormControl className={classes.formControl}>
                        <InputLabel id="program-select-label">Program</InputLabel>
                        <Select
                            labelId="program-select-label"
                            id="program"
                            value={currentProgram}
                            onChange={handleChangeProgram}
                            label="Program"
                            size="small"
                            className={classes.programSelect}
                        >
                            {programs.map((prog) => (
                                <MenuItem key={prog.programId} value={prog}>
                                    <Moment format="MMMM D, YYYY">{prog.startDate}</Moment>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>) : <h5>No programs yet...</h5>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    programs: state.prog.programs,
    currentProgram: state.prog.currentProgram,
});

const mapDispatchToProps = (dispatch) => ({
    setProgram: (payload) => dispatch(storeProgram(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewProgram);