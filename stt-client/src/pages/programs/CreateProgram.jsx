import React, { useState } from 'react';
import { connect } from "react-redux";
import { appendProgram } from "../../redux/actions/programsActions";
import { Link } from 'react-router-dom'
import { createProgram } from "../../api";
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
    const { currentClient, appendProgram } = props;
    const [startDate, setStartDate] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        //setIsLoading(true);
        if (currentClient) {
            try {
                await createProgram({
                    clientId: currentClient,
                    startDate: startDate,
                }).then((data) => {
                    appendProgram(data);
                    window.alert("New Program/Block added");
                });
                //clear form values after submit complete

            } catch (e) {
                console.log(e);
            }
        }
        else {
            window.alert("You must select a client");
        }
    }
    /*
    componentDidMount = async () => {

    }
    */
    return (
        <Wrapper>
            <Title>Add Program</Title>
            <Label>Start Date: </Label>
            <InputText
                type="date"
                id="startDate"
                value={startDate}
                style={{ maxWidth: '-moz-fit-content' }}
                onChange={(e) => { setStartDate(e.target.value) }}
            />
            <Button onClick={handleSubmit}>
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
const mapDispatchToProps = (dispatch) => ({
    appendProgram: (payload) => dispatch(appendProgram(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram);