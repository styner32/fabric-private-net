import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import Document from "./Document";
import DocumentList from "./DocumentList";
import About from "./About";

// class Home extends Component {
//     render() {
//         return (
//             <div className="jumbotron">
//                 <Header/>
//                 <h1> Home </h1>
//                 <User/>
//             </div>
//         );
//     }
// }

const Home = ({isLoggedIn}) => {
    if (!isLoggedIn) {
        return (
            <Redirect to="/login"/>
        )
    }


    return (
        <Switch>
            <Route path="/home/about" component={About}/>
            <Route path="/home/documents" component={Document}/>
            <Route path="/home/documentList" component={DocumentList}/>
            <Redirect to="/home/documents"/>
        </Switch>
    )
};

const mapActionCreators = (dispatch) => ({});

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.users.isLoggedIn
    };
};

export default connect(mapStateToProps, mapActionCreators)(Home);
