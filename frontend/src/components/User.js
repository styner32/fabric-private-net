import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as userActions from '../modules/userModule';

class User extends Component {
    constructor(props, context) {
        super(props, context);

        this.onUpvote = this.onUpvote.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChangeNewUser = this.onChangeNewUser.bind(this);
        this.state = {
            items: [],
            orgs: [],
            newUser: ""
        };
    }

    componentWillMount() {
    }

    onUpvote() {
    }

    onAdd() {
        const {instance, account, newUser} = this.state;

        this.props.dispatch(userActions.createUser('sunjin', 'org1'));
    }

    onChangeNewUser(e) {
        this.setState({newUser: e.target.value});
    }

    renderItem(item, index) {
        return (
            <li key={index}>
                <span>{item}</span>
                <span>(0)</span>
                <input type="submit"
                       onClick={this.onUpvote}
                       value="+"/>
            </li>
        );
    }

    renderOrgs() {
        const promise = this.props.dispatch(userActions.retrieveOrgs());
        promise.then((orgs) => console.log("orgs", orgs));
        // return this.props.dispatch(userActions.retrieveOrgs())
        //     .then((orgs) => console.log('orgs', orgs));
        // return ["sg", "au", "ch"]
        //     .map(it => {
        //         return (<option value={it}>{it}</option>);
        //     })
    }

    render() {
        const {items} = this.state;

        return (
            <div className="jumbotron">
                <h3> Initialize User </h3>
                <ul>
                    {_.map(items, (item, index) => {
                        return this.renderItem(item, index);
                    })}
                </ul>

                <div className="form">
                    <input type="text"
                           placeholder="username"
                           onChange={this.onChangeNewUser}
                           value={this.state.newUser}
                    />
                    <select>
                        <option value="--">-Select Organization-</option>
                        {this.renderOrgs()}
                    </select>
                    <input type="submit"
                           onClick={this.onAdd}
                           value="Init"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(User);