import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Dropdown, Segment } from 'semantic-ui-react'
import _ from 'lodash';
import {connect} from 'react-redux';
import {userCreate} from '../modules/userModule';

const orgOptions = [
    {
        key: "sg",
        value: "sg",
        text: "Singapore"
    },
    {
        key: "au",
        value: "au",
        text: "Australia"
    },
    {
        key: "ch",
        value: "ch",
        text: "China"
    }
];

class LoginForm extends Component {
    constructor(props, context) {
        super(props, context);

        // this.onUpvote = this.onUpvote.bind(this);
        this.onAdd = this._onAdd.bind(this);
        // this.onChangeNewUser = this.onChangeNewUser.bind(this);
        this.state = {
            items: [],
            orgs: [],
            newUser: ""
        };
    }

    _onAdd() {
        const {instance, account, newUser} = this.state;
        this.props.userCreate({username: 'sunjin', orgName: 'org1'});
    }

    render(){
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
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='blue' textAlign='center'>
                            {' '}Log in
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    placeholder="username"
                                />
                                <Dropdown
                                    placeholder="Select Organization"
                                    fluid
                                    selection
                                    options={orgOptions}
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

const mapActionCreators = {
    userCreate: credential => userCreate(credential)
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, mapActionCreators)(LoginForm);