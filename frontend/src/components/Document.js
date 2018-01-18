import React, {Component} from "react";
import {connect} from 'react-redux';
import {Dropdown, Header, Segment, List, Image} from "semantic-ui-react";
import {Document, Page} from "react-pdf";
import {channelsGet} from "../modules/channelsModule";

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

const channelOptions = [
    {
        key: "ch1",
        value: "ch1",
        text: "Channel1"
    }
];

class DocumentComponent extends Component {
    state = {
        file: "./sample.pdf",
        fileName: "upload file here",
        fileLoaded: false,
        numPages: null
    };

    componentDidMount(){
        this.props.channelsGet();
    }

    onFileChange = event => {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.files[0].name,
            fileLoaded: true
        });
    };

    onDocumentLoadSuccess = ({numPages}) =>
        this.setState({
            numPages
        });

    render() {
        const {file, numPages} = this.state;

        return (
            <div>
                <div className="ui borderless fixed blue inverted pointing menu">
                    <div className="ui container">
                        <a className="header active item" href="blog.html#">Home</a>
                        <a className="item" href="blog.html#">New feature</a>
                        <a className="item" href="blog.html#">Press</a>
                        <a className="item" href="blog.html#">
                            New hires
                        </a><a className="item" href="blog.html#">About</a>
                    </div>
                </div>
                <div className="ui grid container">
                    <div className="row" id="page-header">
                        <div className="ui basic segment">
                            <h1 className="ui sub header">
                                Document viewer
                            </h1>
                            <span>{this.state.fileName}</span>
                        </div>
                    </div>
                    <div className="row" id="article">
                        <div className="eleven wide column">
                            {!this.state.fileLoaded &&
                            <div className="Example__container__load">
                                <label htmlFor="file">Load from file:</label>&nbsp;
                                <input type="file" onChange={this.onFileChange}/>
                            </div>}

                            {this.state.fileLoaded &&
                            <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                                ))}
                            </Document>}

                        </div>
                        <div className="four wide right floated column">
                            <Segment secondary>
                                <Header as="h4">
                                    Organization
                                </Header>
                                <div>
                                    <Dropdown
                                        placeholder="Select Organization"
                                        fluid
                                        selection
                                        options={orgOptions}
                                    />
                                </div>
                            </Segment>
                            <Segment secondary>
                                <Header as="h4">
                                    Channels
                                </Header>
                                <div>
                                    <Dropdown
                                        placeholder="Select Channels"
                                        fluid
                                        selection
                                        options={channelOptions}
                                    />
                                </div>
                            </Segment>
                            <Segment>
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
                            </Segment>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionCreators = (dispatch) => ({
    channelsGet: () => dispatch(channelsGet()),
});

const mapStateToProps = (state) => {
    return {
        orgs: state.orgs.items,
        orgsLoading: state.orgs.isLoading,
        isLoggedIn: state.users.isLoggedIn
    };
};

export default connect(mapStateToProps, mapActionCreators)(DocumentComponent);
