import React, { useState } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { createGoal } from "../api";
import { useFormFields } from "../libs/hooksLib";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem";

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

function CreateProgram(props) {
    const { currentClient } = props;
    const [fields, handleFieldChange] = useFormFields({
        name: "",
        description: "",
        type: "",
    });
    /*
    async function handleSubmit(event) {
        event.preventDefault();
        //setIsLoading(true);
        try {
            await createGoal({
                name: name,
                description: description,
                duration: duration,
            }).then((data) => {
                console.log(data);
            });
            //clear form values after submit complete

        } catch (e) {
            console.log(e);
        }
    }
    /*
    componentDidMount = async () => {

    }
    */
    return (
        <Wrapper>
            <Title>Add Goal</Title>
            <FormControl variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    value={fields.category}
                    onChange={handleFieldChange}
                    label="Category"
                >
                    <MenuItem value="ss">
                        <em>Social Skils</em>
                    </MenuItem>
                    <MenuItem value="rs">
                        <em>Receptive Skils</em>
                    </MenuItem>
                    <MenuItem value="ss">
                        <em>Social Skils</em>
                    </MenuItem>
                </Select>
            </FormControl>
            <Button>
                Add
                </Button>
            <CancelButton>
                <Link to="/program" style={{ color: "white", textDecoration: "none" }}>Cancel</Link>
            </CancelButton>
        </Wrapper>
    )
}
const mapStateToProps = (state) => ({
    currentClient: state.client.currentClient,
});

export default connect(mapStateToProps)(CreateProgram);