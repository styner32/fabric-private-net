import React, {Component} from "react";
import {connect} from 'react-redux';
import {Dropdown, Header, Segment, List, Image, Button} from "semantic-ui-react";
import {Document, Page} from "react-pdf";
import {channelsGet, channelsDocsPost, channelsDocsGet} from "../modules/channelsModule";
import {orgsChannelsPost} from "../modules/orgsModule";
import ReactLoading from 'react-loading';
import axios, {post} from 'axios';
import {CHANNELS_DOCS} from "../common/endpoints";
import {Link} from "react-router-dom";

class DocumentList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            file: "./sample.pdf",
            fileName: "no file",
            fileLoaded: false,
            numPages: null,
            channel: "mychannel",
            fileUploaded: false
        };
    }

    componentDidMount() {
        this.props.channelsDocsGet({
            channel: "mychannel"
        });
    }


    onDocumentLoadSuccess = ({numPages}) =>
        this.setState({
            numPages
        });

    render() {
        const {file, numPages} = this.state;
        const {docs, isLoadingDocs} = this.props;

        if (isLoadingDocs || docs === null) {
            return <ReactLoading type={"bubbles"} color={"blue"}/>

        }

        return (
            <div>
                <div className="ui borderless fixed blue inverted pointing menu">
                    <div className="ui container">
                        <Link className={`header item ${ location.pathname === '/home/documents'? "active": "" }`} to="/home/documents"> Upload </Link>
                        <Link className={`header item ${ location.pathname === '/home/documentList'? "active": "" }`} to="/home/documentList" >Doc List </Link>
                        {/*<a className="item" href="blog.html#">Press</a>
                        <a className="item" href="blog.html#">
                            New hires
                        </a><a className="item" href="blog.html#">About</a>*/}
                    </div>
                </div>
                <div className="ui grid container">
                    <div className="row" id="page-header">
                        <div className="ui basic segment">
                            <h1 className="ui sub header">Document Viewer</h1>
                            <span>{this.state.fileName}</span>
                        </div>
                    </div>
                    <div className="row" id="article">
                        <div className="eleven wide column">
                            <Document file={docs.base64} onLoadSuccess={this.onDocumentLoadSuccess}>
                                {
                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                                        )
                                    )
                                }
                            </Document>

                        </div>
                        <div className="four wide right floated column">
                            <div>
                                <Segment>
                                    <Header as="h4">
                                       File info
                                    </Header>
                                    <div className="Example__container__load">
                                        "some info"
                                    </div>
                                </Segment>

                                {/* <Segment>
                                <Header as="h4">
                                    History
                                </Header>
                                <List>
                                    <List.Item>
                                        <Image
                                            avatar
                                            src="/assets/images/avatar/small/rachel.png"
                                        />
                                        <List.Content>
                                            <List.Header as="a">Rachel</List.Header>
                                            <List.Description>Uploaded</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <Image
                                            avatar
                                            src="/assets/images/avatar/small/lindsay.png"
                                        />
                                        <List.Content>
                                            <List.Header as="a">Lindsay</List.Header>
                                            <List.Description>Rejected</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <Image
                                            avatar
                                            src="/assets/images/avatar/small/matthew.png"
                                        />
                                        <List.Content>
                                            <List.Header as="a">Matthew</List.Header>
                                            <List.Description>Approved</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionCreators = (dispatch) => ({
    channelsGet: () => dispatch(channelsGet()),
    channelsDocsGet: (payload) => dispatch(channelsDocsGet(payload)),
    orgsChannelsPost: (payload) => dispatch(orgsChannelsPost(payload)),
});

const mapStateToProps = (state) => {
    return {
        organization: state.users.organization,
        orgsLoading: state.orgs.isLoading,
        isLoadingDocs: state.channels.isLoadingDocs,
        docs: state.channels.docs,
        token: state.users.creds.token
    };
};

export default connect(mapStateToProps, mapActionCreators)(DocumentList);
