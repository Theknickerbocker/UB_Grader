import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getStudentGrades, getProfessorGrades, getUserInfo } from './GradebookActions';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class Gradebook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false,
            userData: {},
            submissions: {},
        }
    }

    componentDidMount() {
        this.setState({
            render: false,
            userData: {},
            submissions: {},
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log("NEXT PROPS");
        console.log(nextProps);
        var courseNum = nextProps.params.course;
        var email = nextProps.user.email;
        console.log(nextProps.assignments);
        for(var assignment in nextProps.assignments) {
            var assignmentNum = nextProps.assignments[assignment].assignment_num;
            console.log("Getting: " + courseNum + " " + assignmentNum + " " + email)
            this.props.getStudentGrades(courseNum, assignmentNum, email);
        }
        // console.log(this.props.submissions);
    }

    render() {
        
        // console.log(this.props);
        return (
            this.studentBook()
        );
    }

    instructorBook() {
        return (
        <Card>
            <CardTitle title="Grades" />
            <CardMedia>
                <Table>
                    <TableHeader>

                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>
            </CardMedia>
        </Card>
        )
    }

    studentBook() {
        console.log(this.props.submissions);
        var rows = [];
        for (var submission in this.props.submissions) {
            var data = this.props.submissions[submission];
            row.push(
                <TableRow>
                    <TableRowColumn>{data}.</TableRowColumn>
                    <TableRowColumn>{data.version}</TableRowColumn>
                    <TableRowColumn>{(data.scores.length == 0) ? "Waiting for feedback" : data.scores.reduce((a, b) => a + b, 0)}</TableRowColumn>
                </TableRow>
            );
        }
        return (
        <Card>
            <CardTitle title="Grades" />
            <CardMedia>
                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableHeaderColumn>Assignment</TableHeaderColumn>
                        <TableHeaderColumn>Score</TableHeaderColumn>
                        <TableHeaderColumn>Version</TableHeaderColumn>
                    </TableHeader>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </CardMedia>
        </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.app.user,
        assignments: state.assignments.assignmentsData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getStudentGrades: getStudentGrades,
        getProfessorGrades: getProfessorGrades,
        getUserInfo: getUserInfo,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);