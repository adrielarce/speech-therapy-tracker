import React, { Component } from 'react'
import api1 from '../api/sessions'
import api2 from '../api/program'
import { Link } from 'react-router-dom'
import { Switch, Select, MenuItem, Paper } from '@material-ui/core'

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

class SessionUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            date: this.props.match.params.date,
            goal: '',
            substep: '',
            completed: false,
            goals: [],
            substeps: [],
        }
    }

    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }
    handleChangeInputGoal = async event => {
        //const goal = event.target.value.name
        this.setState({ 
            goal: event.target.value
        })
        await api2.getGoalById(event.currentTarget.id).then(response => {
            this.setState({
                substeps: [
                    response.data.data.substep1,
                    response.data.data.substep2,
                    response.data.data.substep3
                ]
            })
        })
    }
    handleChangeInputSubstep = async event => {
        const substep = event.target.value
        this.setState({ substep })
    }
    handleChangeInputCompleted = async event => {
        const completed = event.target.value
        this.setState({ completed })
    }
    /*
    handleChangeInputSubsteps = (index) = event => {
        let newArr = [this.substeps]; 
        console.log(event.target.value)
        newArr[index] = event.target.value
        this.setState({ substeps: newArr })
    }
    */
    handleUpdateSession = async () => {
        const { id, date, goal, substep, completed } = this.state
        const payload = { date, goal, substep, completed }
        await api1.updateSessionById(id, payload).then(res => {
            window.alert(`Session updated successfully`)
            this.setState({
                date: null,
                goal: '',
                substep: '',
                completed: false,
            })
        })
    }
    componentDidMount = async () => {   
        const { id } = this.state
        const session = await api1.getSessionById(id)
        this.setState({
            date: session.data.data.date,
            goal: session.data.data.goal,
            substep: session.data.data.substep,
            completed: session.data.data.completed,
        })     
        await api2.getAllGoals().then(response => {  
            this.setState({
                goals: response.data.data
            })
        })
    }
    render() {
        const { date, goal, substep, completed, goals, substeps } = this.state
        return (
            <div>
            <Paper />
            <Wrapper>
                <Title>Update Session</Title>

                <Label>Date: </Label>
                <InputText
                    type="date"
                    value={date}
                    style={{maxWidth:'-moz-fit-content'}}
                    onChange={this.handleChangeInputDate}
                />
                <Label>Goal: </Label>
                <div style={{width:"100%"}}>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{minWidth:'30%',width:'fit-content',width:'-moz-fit-content',paddingLeft:'5px'}}
                    value={goal}
                    onChange={this.handleChangeInputGoal}
                    >
                        {
                        goals.map((item) => (
                        <MenuItem key={item._id} value={item.name} id={item._id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </div>
                <Label>Substep: </Label>
                <div style={{width:"100%"}}>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{minWidth:'30%',width:'fit-content',width:'-moz-fit-content',paddingLeft:'5px'}}
                    value={substep}
                    onChange={this.handleChangeInputSubstep}
                    >
                        {substeps.map((item,index) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                        ))}
                    </Select>
                </div>
                <div style={{display:'block'}}>
                    <Label>
                        Completed: 
                        <Switch
                            checked={completed}
                            onChange={this.handleChangeInputCompleted}
                            color="primary"
                            name="completed"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Label>
                </div>
                <Button onClick={this.handleUpdateSession}>
                        Update Session
                </Button>
                <CancelButton>
                    <Link to="/sessions" style={{color: "white",textDecoration: "none"}}>
                        Go Back
                    </Link>
                </CancelButton>
            </Wrapper>
            </div>
        )
    }
}

export default SessionUpdate