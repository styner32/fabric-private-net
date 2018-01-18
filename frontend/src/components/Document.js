import React, {Component} from "react";
import {connect} from 'react-redux';
import {Dropdown, Header, Segment, List, Image, Button} from "semantic-ui-react";
import {Document, Page} from "react-pdf";
import {channelsGet, channelsDocsPost} from "../modules/channelsModule";
import {orgsChannelsPost} from "../modules/orgsModule";
import ReactLoading from 'react-loading';
import axios, {post} from 'axios';
import {CHANNELS_DOCS} from "../common/endpoints";

class DocumentComponent extends Component {


    constructor(props) {
        super(props);
        this.onSubmit = this._onSubmit.bind(this);
        this.handleChange = this._handleChange.bind(this);
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
        this.props.channelsGet();
        this.props.orgsChannelsPost({
            orgName: this.props.organization.value,
        });
    }

    onFileChange = event => {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.files[0].name,
            fileLoaded: true
        });
    };

    _onSubmit(e) {
        e.preventDefault(); // Stop form submit

        let data = new FormData();
        data.append('file', this.state.file);
        data.append('name', this.state.fileName);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${this.props.token}`
            }
        };
        post(CHANNELS_DOCS(this.state.channel), data, config)
            .then(res => {
                console.error("success upload %o", res);
                this.setState({
                    fileUploaded: true
                })
            })
            .catch(res => {
                console.error("failed upload %o", res)
            })


        // this.props.channelsDocsPost({
        //     file: data,
        //     channel: this.state.channel
        // });
    }

    _handleChange(field, value) {
        this.setState({[field]: value});
    }

    onDocumentLoadSuccess = ({numPages}) =>
        this.setState({
            numPages
        });

    render() {
        const {file, numPages} = this.state;
        const {orgs, channels, orgsLoading, channelsLoading} = this.props;

        if (orgsLoading || channelsLoading) {
            return <ReactLoading type={"bubbles"} color={"blue"}/>

        }

        return (
            <div>
                <div className="ui borderless fixed blue inverted pointing menu">
                    <div className="ui container">
                        <a className="header active item" href="blog.html#">Home</a>
                        {/*<a className="item" href="blog.html#">New feature</a>
                        <a className="item" href="blog.html#">Press</a>
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


                            {
                                this.state.fileLoaded &&
                                <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
                                {
                                    Array.from(
                                        new Array(numPages),
                                        (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1}/>
                                        )
                                    )
                                }
                                </Document>
                            }

                        </div>
                        <div className="four wide right floated column">
                            <form onSubmit={this.onSubmit}>
                                <Segment>
                                    <Header as="h4">
                                        File Upload
                                    </Header>
                                    <div className="Example__container__load">
                                        <label htmlFor="file">Load from file:</label>&nbsp;
                                        <input type="file" onChange={this.onFileChange}/>
                                    </div>
                                </Segment>
                                <Segment secondary>
                                    <Header as="h4">
                                        Organization
                                    </Header>
                                    <div>
                                        <p>{this.props.organization.text}</p>
                                    </div>
                                </Segment>
                                <Segment secondary>
                                    <Header as="h4">
                                        Channels
                                    </Header>
                                    <div>
                                        <Dropdown
                                            value={this.state.channel}
                                            placeholder="Select Channels"
                                            fluid
                                            selection
                                            onChange={(event, {value}) => this.handleChange("channel", value)}
                                            options={channels}
                                        />
                                    </div>
                                </Segment>
                                {
                                    !this.state.fileUploaded &&
                                    <Segment>
                                        <Button color='blue'
                                                fluid size='large'
                                                type="submit"
                                        >
                                            Upload
                                        </Button>
                                    </Segment>
                                }
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionCreators = (dispatch) => ({
    channelsGet: () => dispatch(channelsGet()),
    channelsDocsPost: (payload) => dispatch(channelsDocsPost(payload)),
    orgsChannelsPost: (payload) => dispatch(orgsChannelsPost(payload)),
});

const mapStateToProps = (state) => {
    return {
        organization: state.users.organization,
        channels: state.channels.items,
        orgsLoading: state.orgs.isLoading,
        channelsLoading: state.channels.isLoading,
        isLoggedIn: state.users.isLoggedIn,
        token: state.users.creds.token
    };
};

export default connect(mapStateToProps, mapActionCreators)(DocumentComponent);
