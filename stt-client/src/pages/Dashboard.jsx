import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';

const styles = theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
});


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            substeps: [],
            client: '',
            clients: [],
        }
    }

    handleChange = event => {
        const id = event.target.id;
        this.setState({
            [id]: event.target.value
        });
        console.log(this.state);
    }
    componentDidMount = async () => {

    }

    render() {
        const { classes } = this.props;
        const { clients } = this.state
        return (
            <div style={{ flexGrow: 1 }}>
                <Paper style={{ padding: '1rem' }}>
                    <Grid container spacing={3}>
                        <Grid item sm={4}>
                            <Card style={{ padding: 2, textAlign: 'center' }}>
                                <CardHeader title="Upcoming Sessions" style={{ backgroundColor: "#748ffc", color: 'white' }}></CardHeader>
                                <CardContent>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">Therapist</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Uliana Y.</TableCell>
                                                    <TableCell align="right" style={{ fontWeight: '600' }}>Nov. 27, 2020</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Uliana Y.</TableCell>
                                                    <TableCell align="right" style={{ fontWeight: '600' }}>Nov. 30, 2020</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Michelle O.</TableCell>
                                                    <TableCell align="right" style={{ fontWeight: '600' }}>Dec. 1, 2020</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Uliana Y.</TableCell>
                                                    <TableCell align="right" style={{ fontWeight: '600' }}>Dec. 2, 2020</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)