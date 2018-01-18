import React, {Component} from 'react'
import {Button, Dropdown, Form, Grid, Header, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {orgsUsersPost} from '../modules/userModule';
import {orgsGet} from '../modules/orgsModule';
import {push} from "react-router-redux";

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        // this.onUpvote = this.onUpvote.bind(this);
        this.onAdd = this._onAdd.bind(this);
        this.handleChange = this._handleChange.bind(this);
        // this.onChangeNewUser = this.onChangeNewUser.bind(this);
        this.state = {
            username: "",
            orgName: "org1",
        };
    }

    componentDidMount() {
        this.props.orgsGet();
    }

    componentWillUpdate(nextProps) {
        const {isLoggedIn, goToDashboard} = nextProps;
        if (isLoggedIn) {
            console.log("I am logged in");
            goToDashboard();
        }
    }

    _handleChange(field, value) {
        this.setState({[field]: value});
    }

    _onAdd() {
        this.props.orgsUsersPost({...this.state});
    }

    render() {
        if (this.props.orgsLoading) {
            return <div>Loading...</div>
        }

        return (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='blue' textAlign='center'>
                            {' '}Log in
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    placeholder="username"
                                    onChange={(event, {value}) => this.handleChange("username", value)}
                                />
                                <Dropdown
                                    placeholder="Select Organization"
                                    fluid
                                    selection
                                    onChange={(event, {value}) => this.handleChange("orgName", value)}
                                    options={this.props.orgs}
                                />
                                <br/>
                                <Button color='blue'
                                        fluid size='large'
                                        onClick={this.onAdd}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

const mapActionCreators = (dispatch) => ({
    orgsUsersPost: credential => dispatch(orgsUsersPost(credential)),
    orgsGet: () => dispatch(orgsGet()),
    goToDashboard: () => dispatch(push("/home"))
});

const mapStateToProps = (state) => {
    return {
        orgs: state.orgs.items,
        orgsLoading: state.orgs.isLoading,
        isLoggedIn: state.users.isLoggedIn
    };
};

export default connect(mapStateToProps, mapActionCreators)(LoginForm);