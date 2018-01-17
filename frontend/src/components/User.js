import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as userActions from '../actions/userActions';

class User extends Component {
    constructor(props, context) {
        super(props, context);

        this.onUpvote = this.onUpvote.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChangeNewUser = this.onChangeNewUser.bind(this);
        this.state = {
            items: [],
            newUser: ""
        };
    }

    componentWillMount() {
    }

    onUpvote() {
    }

    onAdd() {
        const {instance, account, newUser} = this.state;
        const {dispatch} = this.props;

        dispatch(userActions.create('sunjin', 'org1'));
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
                        <option value="au">AU</option>
                        <option value="ch">CH</option>
                        <option value="sg">SG</option>
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