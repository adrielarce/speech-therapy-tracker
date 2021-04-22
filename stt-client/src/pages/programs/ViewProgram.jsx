import React from 'react';
import { Link } from 'react-router-dom';
import ViewGoals from './ViewGoals';
import ProgramSelect from "./ProgramSelect";


/*
class UpdateGoal extends Component {
    updateUser = event => {
        event.preventDefault()
        window.location.href = `/program/update/${this.props.id}`
    }
    render() {
        const updateLink = `/program/update/${this.props.id}`;
        return (
            <Link to={updateLink}>
                Update
            </Link>
        )
    }
}
class DeleteGoal extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the goal ${this.props.name} permanently?`,
            )
        ) {
            api.deleteGoalById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}
*/
function ViewProgram(props) {
    return (
        <React.Fragment>
            <Link to="/program/create">
                Add Program
            </Link>
            <ProgramSelect />
            <br />
            <ViewGoals />
        </React.Fragment>
    )
}

export default ViewProgram;