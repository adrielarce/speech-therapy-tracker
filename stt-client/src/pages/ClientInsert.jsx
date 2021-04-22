import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from "../api";

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

class ClientInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            date: null,
        }
    }
    handleChange = event => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value
        });
    };
    handleSubmit = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            await createClient({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dob: this.state.dob,
            }).then((data) => {
                console.log(data);
                //let clients = this.listClients();
                //console.log(clients);
            });
            //clear form values after submit complete
            this.setState({
                firstName: "",
                lastName: "",
                dob: null,
            });
        } catch (e) {
            console.log(e);
        }
    }
    /*
    componentDidMount = async () => {

    }
    */
    render() {
        const { firstName, lastName, dob } = this.state
        return (
            <Wrapper>
                <Title>Add Client</Title>
                <Label>First Name: </Label>
                <InputText
                    type="text"
                    id="firstName"
                    value={firstName}
                    style={{ maxWidth: '-moz-fit-content' }}
                    onChange={this.handleChange}
                />
                <Label>Last Name: </Label>
                <InputText
                    type="text"
                    id="lastName"
                    value={lastName}
                    style={{ maxWidth: '-moz-fit-content' }}
                    onChange={this.handleChange}
                />
                <Label>Date of Birth: </Label>
                <InputText
                    type="date"
                    id="dob"
                    value={dob}
                    style={{ maxWidth: '-moz-fit-content' }}
                    onChange={this.handleChange}
                />
                <Button onClick={this.handleSubmit}>
                    Add
                </Button>
                <CancelButton>
                    <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Cancel</Link>
                </CancelButton>
            </Wrapper>
        )
    }
}

export default ClientInsert