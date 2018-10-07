import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Media,
    FormControl, FormGroup
} from 'react-bootstrap';

import Card from '../../components/Card/Card.jsx';

import Button from '../../elements/CustomButton/CustomButton.jsx';

class RegisterPage extends Component{

    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email:'',
            phone:'',
            gender:'',
            role:'',
            birthDay:''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name] : e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(e);
        console.log(this.state);
    }

    render(){
        return (
            <Grid>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <div className="header-text">
                            <h2>Pay app management</h2>
                            <h4>Register an account</h4>
                            <hr />
                        </div>
                    </Col>
                    <Col md={4} mdOffset={2}>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-user"></i>
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    Free Account
                                </Media.Heading>
                                Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-graph1"></i>
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    Awesome Performances
                                </Media.Heading>
                                Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                            </Media.Body>
                        </Media>
                        <Media>
                            <Media.Left>
                                <div className="icon">
                                    <i className="pe-7s-headphones"></i>
                                </div>
                            </Media.Left>
                            <Media.Body>
                                <Media.Heading>
                                    Global Support
                                </Media.Heading>
                                Here you can write a feature description for your dashboard, let the users know what is the value that you give them.
                            </Media.Body>
                        </Media>
                    </Col>
                    <Col md={4}>
                        <form onSubmit = { this.onSubmit }>
                            <Card                               
                                plain
                                content={
                                    <div>
                                        {/* First name */}
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Your First Name"
                                                value = { this.state.firstName }
                                                onChange = { this.onChange }
                                                name="firstName"
                                            />
                                        </FormGroup>
                                        {/* Last name */}
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Your Last Name"
                                                value = { this.state.lastName }
                                                onChange = { this.onChange }
                                                name="lastName"
                                            />
                                        </FormGroup>
                                        {/* Email */}
                                        <FormGroup>
                                            <FormControl
                                                type="email"
                                                placeholder="Enter Email"
                                                value = { this.state.email }
                                                onChange = { this.onChange }
                                                name="email"
                                            />
                                        </FormGroup>
                                        {/* Birth day */}
                                        <FormGroup>
                                            <FormControl
                                                type="date"
                                                placeholder="Date"
                                                value = { this.state.birthDay }
                                                onChange = { this.onChange }
                                            />
                                        </FormGroup>
                                        {/* Phone number */}
                                        <FormGroup>
                                            <FormControl
                                                type="text"
                                                placeholder="Phone number"
                                                value = { this.state.phone }
                                                onChange = { this.onChange }
                                                name="phone"
                                            />
                                        </FormGroup>
                                        {/* Gender */}
                                        <FormGroup>
                                            <FormControl componentClass="select" placeholder="select">
                                                <option value="select">Gender</option>
                                                <option value="other">Male</option>
                                                <option value="other">Female</option>
                                            </FormControl>
                                        </FormGroup>
                                        {/* Role */}
                                        <FormGroup>
                                            <FormControl componentClass="select" placeholder="select" >
                                                <option value="select">Role</option>
                                                <option value="other">Admin</option>
                                                <option value="other">Director</option>
                                                <option value="other">Employee accounting</option>
                                            </FormControl>
                                        </FormGroup>
                                        {/* Default password */}
                                        <FormGroup>
                                            <FormControl
                                                type="password"
                                                placeholder="Default Password"
                                            />
                                        </FormGroup>
                                    </div>
                                }
                                ftTextCenter
                                legend={
                                    <Button wd fill neutral type="submit">
                                        Create Account
                                    </Button>
                                }
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default RegisterPage;
