import React, { Component } from 'react';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

// import PropTypes from 'prop-types';

import Card from 'components/Card/Card.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';


import { connect } from 'react-redux';
import { loginAccountAdmin } from '../../redux/actions/auth.action';


class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            cardHidden: true,
            email: '',
            password: '',
            errors:''
        }
        this.onChange = this.onChange.bind(this);
       // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }
    
    componentDidMount(){
        
        setTimeout(function() { this.setState({cardHidden: false}); }.bind(this), 700);

        if(this.props.login.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }


    handleLoginSubmit(e){
        e.preventDefault();
        const accountAdmin = {
            email: this.state.email,
            password: this.state.password
        };
        console.log('submit login');
      //  alert(accountAdmin.password);
        this.props.loginAccountAdmin(accountAdmin);

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // update props:
    componentWillReceiveProps(nextProps){

        if(nextProps.login.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render(){

        const { errors } = this.props;

        return (
            <Grid>
                <Row>
                    <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                        <form onSubmit = { this.handleLoginSubmit.bind(this) } >
                            <Card
                                hidden={this.state.cardHidden}
                                textCenter
                                title="Login"
                                content={
                                    <div>
                                        <FormGroup>
                                            <ControlLabel>
                                                Email address
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Enter email"
                                                type="email"
                                                name="email" 
                                                onChange={ this.onChange } 
                                                value = { this.state.email } 
                                            />
                                            { errors.email && (<div  className="invalid-feedback">{errors.email}</div>) }
                                        </FormGroup>
                                        <FormGroup>
                                            <ControlLabel>
                                                Password
                                            </ControlLabel>
                                            <FormControl
                                                placeholder="Password"
                                                type="password"
                                                name="password" 
                                                onChange={ this.onChange } 
                                                value = { this.state.password }
                                            />
                                            { errors.password && (<div  className="invalid-feedback">{errors.password}</div>) }
                                        </FormGroup>
                                        <FormGroup>
                                            <Checkbox
                                                number="1"
                                                label="Remember password"
                                            />                                        
                                            <a href="">Forgot password ?</a>
                                        </FormGroup>
                                    </div>
                                }
                                legend={
                                    <Button bsStyle="info" fill wd type="submit" >
                                        Login
                                    </Button>
                                }
                                ftTextCenter
                            />
                        </form>
                    </Col>
                </Row>
            </Grid>   
        );
    }
}

// LoginPage.propTypes = {
//     loginAccountAdmin: PropTypes.func.isRequired,
//     login: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }

// get data from redux store and convert to props
const mapStateToProps = state => ({
    login: state.loginReducer, 
    errors: state.errorsReducer 
})

export default connect(mapStateToProps, { loginAccountAdmin })(LoginPage);
