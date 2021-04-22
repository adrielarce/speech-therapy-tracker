import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
class UpdateSession extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/sessions/update/${this.props.id}`
    }
    render() {
        const updateLink = `/sessions/update/${this.props.id}`;
        return (
            <Link to={updateLink}>
              Update
            </Link>
        )
    }
}
class DeleteSession extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the goal ${this.props.name} permanently?`,
            )
        ) {
            //api.deleteSessionById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class ViewSessions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sessions: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {

        
    }
    render() {
        const { sessions } = this.state
        //console.log('TCL: SessionsList -> render -> sessions', sessions)
        //console.log(sessions.data)
        return (
            <React.Fragment>
            <Typography variant="h4">
                Sessions
            </Typography>
            <br/>
            <Typography variant="h5">
                Client: <b>Jacob Williams</b> <br/>Date of Birth: <b>12/1/2016</b>
            </Typography>
            <br/>
            <Typography variant="h5">
                Start Date: <b>07/09/2020</b>
            </Typography>

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan="2" align="right">
                        <Link to="/sessions/create">
                            New Session
                        </Link>
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Goal</TableCell>
                        <TableCell align="right">Substep</TableCell>
                        <TableCell align="right">Completed</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {sessions.map((row,index) => (
                        <TableRow key={row.name} style={{textAlign: "top"}}>
                            <TableCell align="left">Session {index+1}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.goal}</TableCell>
                            <TableCell align="right">{row.substep}</TableCell>
                            <TableCell align="right">{row.completed.toString()}</TableCell>
                            <TableCell align="right"><DeleteSession id={row._id} /></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </React.Fragment>
        )
    }
}

export default ViewSessions