import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as itemActions from '../actions/userActions';

class User extends Component {
  constructor(props, context) {
    super(props, context);

    this.onUpvote = this.onUpvote.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onChangeNewItem = this.onChangeNewItem.bind(this);
    this.state = {
      items: [],
      newItem: ''
    };
  }

  componentWillMount() {
  }

  onUpvote() {
  }

  onAdd() {
    const { instance, account, newItem } = this.state;
    const { dispatch } = this.props;

    dispatch(itemActions.create('sunjin', 'org1'));
  }

  onChangeNewItem(e) {
    this.setState({ newItem: e.target.value });
  }

  renderItem(item, index) {
    return (
      <li key={index}>
        <span>{item}</span>
        <span>(0)</span>
        <input
          type="submit"
          onClick={this.onUpvote}
          value="+" />
      </li>
    );
  }

  render() {
    const { items } = this.state;

    return (
      <div className="jumbotron">
        <h3> Vote List </h3>
        <ul>
          {_.map(items, (item, index) => {
            return this.renderItem(item, index);
          })}
        </ul>

        <div className="form">
          <input type="text"
            onChange={this.onChangeNewItem}
            value={this.state.newItem}
          />
          <input
            type="submit"
            onClick={this.onAdd}
            value="Add" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(User);
