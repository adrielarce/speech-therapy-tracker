import React, { useState } from 'react'
import { updateGoal } from "../../api";
import { Link } from 'react-router-dom'
import { useFormFields } from "../../libs/hooksLib";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: "1",
    },
    formControl: {
        minWidth: 150,
    },
}));


function UpdateGoal(props) {
    const classes = useStyles();
    const { goalId } = props;
    console.log(props);
    const [fields, handleFieldChange] = useFormFields({
        longTermGoal: '',
        subGoals: [],
        target: '',
    });
    const [category, setCategory] = useState('');

    async function handleInputChange(event) {
        const name = event.target.value
        this.setState({ name })
    }

    async function handleUpdateGoal() {
        const payload = {
            category: category,
            longTermGoal: fields.longTermGoal,
            target: fields.target,
        };
        await updateGoal(goalId, payload).then(res => {
            window.alert(`Goal updated successfully`);
        })
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }
    return (
        <div>
            <Typography variant="h1">Update Goal</Typography>

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

            <InputLabel>Goal: </InputLabel>
            <TextField
                type="text"
                value={fields.goal}
                onChange={handleFieldChange}
            />
            <Button onClick={handleUpdateGoal}>
                Update Program
            </Button>
            <Button>
                <Link to="/program" style={{ color: "white", textDecoration: "none" }}>
                    Go Back
                </Link>
            </Button>
        </div>
    )
}

export default UpdateGoal