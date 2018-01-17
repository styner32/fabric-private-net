import React, {Component} from 'react';
import Header from './Header';

import {Segment} from "semantic-ui-react";

class About extends Component {
  render() {
    return (
     <div>
         <div className="ui borderless fixed blue inverted pointing menu">
             <div className="ui container">
                 <a className="header active item" href="blog.html#">Home</a><a className="item" href="blog.html#">New feature</a><a className="item" href="blog.html#">Press</a><a className="item" href="blog.html#">New hires</a><a className="item" href="blog.html#">About</a>
             </div>
         </div>
         <div className="ui grid container">
             <div className="row" id="page-header">
                 <div className="ui basic segment">
                     <h1 className="ui sub header">
                         About
                     </h1>
                     <span>Some statements that we want to have</span>
                 </div>
             </div>
             <div className="row" id="article">
                 <div className="eleven wide column">
                     <h2 className="ui sub header">
                         Sample blog post
                     </h2>
                     <span>March 6, 2017 by <a href="blog.html">Jack</a></span>
                     <div className="ui hidden divider"></div>
                     <p>
                         This blog post shows a few different types of content that's supported and styled with Semantic-UI. Basic typesetting, list, and code are all supported.
                     </p>
                     <div className="ui divider"></div>
                     <p>
                         Cum sociis natoque penatibus et magnis <a href="blog.html">dis parturient montes</a>, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
                     </p>
                     <blockquote>Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</blockquote>
                     <p>
                         Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                     </p>
                     <h3 className="ui large header">
                         Heading
                     </h3>
                     <p>
                         Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                     </p>
                     <h4 className="ui medium header">
                         Sub-heading
                     </h4>
                     <p>
                         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                     </p>
                     <div className="ui secondary segment">
                         <code>Example code block</code>
                     </div>
                     <p>
                         Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.
                     </p>
                     <h4 className="ui medium header">
                         Sub-heading
                     </h4>
                     <p>
                         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
                     </p>
                     <div className="ui list">
                         <div className="item">
                             <div className="ui bulleted list">
                                 <div className="item">
                                     Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                 </div>
                                 <div className="item">
                                     Donec id elit non mi porta gravida at eget metus.
                                 </div>
                                 <div className="item">
                                     Nulla vitae elit libero, a pharetra augue.
                                 </div>
                             </div>
                         </div>
                     </div>
                     <p>
                         Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue.
                     </p>
                     <div className="ui list">
                         <div className="item">
                             <div className="ui ordered list">
                                 <div className="item">
                                     Vestibulum id ligula porta felis euismod semper.
                                 </div>
                                 <div className="item">
                                     Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                 </div>
                                 <div className="item">
                                     Maecenas sed diam eget risus varius blandit sit amet non magna.
                                 </div>
                             </div>
                         </div>
                     </div>
                     <p>
                         Cras mattis consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis.
                     </p>
                     <div className="ui hidden divider"></div>
                     <h2 className="ui sub header">
                         Another blog post
                     </h2>
                     <span>April 1, 2027 by <a href="blog.html">Mac</a></span>
                     <div className="ui hidden divider"></div>
                     <p>
                         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
                     </p>
                     <blockquote>Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</blockquote>
                     <p>
                         Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                     </p>
                     <p>
                         Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                     </p>
                     <div className="ui hidden divider"></div>
                     <h2 className="ui sub header">
                         New feature
                     </h2>
                     <span>Autumn 13, 2019 by <a href="blog.html">Semantic</a></span>
                     <div className="ui hidden divider"></div>
                     <p>
                         Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.
                     </p>
                     <div className="ui list">
                         <div className="item">
                             <div className="ui bulleted list">
                                 <div className="item">
                                     Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                 </div>
                                 <div className="item">
                                     Donec id elit non mi porta gravida at eget metus.
                                 </div>
                                 <div className="item">
                                     Nulla vitae elit libero, a pharetra augue.
                                 </div>
                             </div>
                         </div>
                     </div>
                     <p>
                         Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                     </p>
                     <p>
                         Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                     </p>
                     <div className="ui basic segment">
                         <div className="ui basic circular huge button">
                             <a href="blog.html#">Previous</a>
                         </div>
                         <div className="ui basic circular huge button">
                             <a href="blog.html#">Next</a>
                         </div>
                     </div>
                 </div>
                 <div className="four wide right floated column">

                     <Segment secondary>
                         <h4 className="ui header">
                             About
                         </h4>
                         <p>
                             Etiam porta <i>sem malesuada magna mollis euismod</i>. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.
                         </p>
                     </Segment>
                     <h4 className="ui header">
                         Archives
                     </h4>
                     <div className="ui list">
                         <a className="item">Septempber 2017</a><a className="item">August 2017</a><a className="item">June 2017</a><a className="item">April 2017</a><a className="item">March 2017</a><a className="item">February 2017</a><a className="item">January 2017</a><a className="item">December 2016</a><a className="item">October 2016</a><a className="item">July 2016</a><a className="item">July 2016</a><a className="item">May 2016</a><a className="item">April 2016</a><a className="item">January 2016</a><a className="item">May 2015</a>
                     </div>
                     <div className="ui hidden divider"></div>
                     <h4 className="ui header">
                         Elsewhere
                     </h4>
                     <div className="ui list">
                         <a className="item">GitHub</a><a className="item">Twitter</a><a className="item">Google+</a><a className="item">Facebook</a>
                     </div>
                 </div>
             </div>
         </div>
         <div className="ui footer secondary segment">
             <div className="ui center aligned container">
                 <p>
                     Blog template built for Semantic-UI by <a href="https://github.com/semantic-ui-forest">@Semantic-UI-Forest</a>.
                 </p>
                 <a href="blog.html#">Back to top</a>
             </div>
         </div>
     </div>
    );
  }
}

export default About;
