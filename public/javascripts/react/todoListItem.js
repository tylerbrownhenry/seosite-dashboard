var TodoListItem = React.createClass({
       deleteThis: function(){
           console.log('this!',this)
           handlScan('delete',this.props.requestId);
       },
       retryThis: function(){
           console.log('this!',this)
           handlScan('retry',this.props.requestId);
       },
       gotoSummary: function(){
           console.log('this!',this.props.expandRow);
           this.props.expandRow(this);

           // handlScan('summary',this.props.requestId);
       },
       cancelThis: function(){
           console.log('this!',this)
           handlScan('cancel',this.props.requestId);
       },
       performAction: function(event,name) {
           console.log('performAction',event,'name',name,'this',this);
           // event.preventDefault(); // Let's stop this event.
           // event.stopPropagation(); // Really this time.
           this.setState(prevState => ({
             toolbarOpen: !prevState.toolbarOpen
           }));
       },

       openToolbar: function(event) {
           console.log('expand row--',event);
           // event.preventDefault(); // Let's stop this event.
           // event.stopPropagation(); // Really this time.
           this.setState(prevState => ({
             toolbarOpen: !prevState.toolbarOpen
           }));
       },
       expandRow: function(){
           console.log('expand row');
           this.setState(prevState => ({
             rowExpanded: !prevState.rowExpanded
           }));
       },
       closeToolbar: function(){
           this.setState(prevState => ({
             toolbarOpen: false
           }));
       },
       getInitialState: function() {
           return {toolbarOpen:false};
       },
       setTime: function(){
           console.log('this',this.props);
           this.setState({
               shortDate: formatDate(this.props.completedTime,true),
               longDate: formatDate(this.props.completedTime)
           });
       },

       componentWillMount: function(){
           this.setTime();
       },
       componentDidMount: function(){
           window.setInterval(function () {
             this.setTime();
           }.bind(this), 1000);
       },
     render: function(){

       // return (<div className="row">{this.props.requestId}</div>);
       var thumbStyle = {
             backgroundImage: 'url(' + this.props.captures.thumb + ')',
       };


return(<div onMouseLeave={this.closeToolbar} onClick={this.gotoSummary} className={ 'row styled interactive padded ' + (this.state.rowExpanded ? ' row-expanded ' : ' ') + (this.state.toolbarOpen ? ' toolbar-open ' : ' ') + ((this.props.status === 'failed' || this.props.status === 'error') ? ' error ' : ' ') + (this.props.status === 'pending' ? ' pending init ' : ' ') + (this.props.status === 'init' ? ' init ' : ' ') + (this.props.status === 'complete' ? ' complete ' : ' ') + (this.props.status === 'init' ? ' init ' : ' ') + (this.props.highlight === true ? ' success ' : ' ') + ' js_temp_request_'+ this.props.temp_id +' js_request_'+ this.props.requestId +' js_request_'+ this.props.i_id }>

           <div className={"toolbar col-sm-1"} onClick={this.openToolbar}>
           <ul className={"toolbar-options abs"}>
               {(this.props.status !== 'init') &&
                   <div className={"list-wrapper"}>
                       <li onClick={this.deleteThis} className={"toolbar-option trash"}><a>Delete</a></li>
                       <li onClick={this.retryThis} className={"toolbar-option redo"}><a>Redo</a></li>
                       <li onClick={this.gotoSummary} className={"toolbar-option summary"}><a>Summary</a></li>
                   </div>
                   }
               {(this.props.status === 'init') &&
                   <div className={"list-wrapper"}>
                       <li onClick={this.deleteThis} className={"toolbar-option trash"}><a onClick={this.deleteThis}>Delete</a></li>
                       <li className={"toolbar-option redo"}><a onClick={this.retryThis} className={""}>Retry</a></li>
                       <li className={"toolbar-option cancel"}><a onClick={this.cancelThis} className={""}>Cancel</a></li>
                   </div>
               }
           </ul>
           </div>
               {(this.props.status !== 'failed' && this.props.status !== 'error' && this.props.status !== 'init') &&
                   <div className={"col-50 col-abs ml-15 toolbar-effect-ml-260"}>
                       <a  style={thumbStyle} className={"pic"}></a>
                   </div>
               }
            <div className={"col-sm-12 main-content " + ((this.props.status !== 'failed' && this.props.status !== 'error' && this.props.status !== 'init')  ? "col-50-offset-right col-50-offset-left" : "")}>
               <div className={"col-sm-12"}>
                  <div className={"info offset-content animate-open toolbar-effect"}>
                       <div className={"col-sm-12 no-pad-h"}>
                           <h4 className={"blue-title"}>{this.props.url}  {this.props.requestId} <span className={"init-message"}>Request sent, awaiting response</span></h4>

                       </div>
                       <div className={"col-sm-12 no-pad-h"}>
                           <div className={"col-xs-3 no-pad-h"}>
                           <p className={"sub-title sm-hide"}>
                               {(this.props.status === 'init') &&
                                   <span>Request was initated </span>
                               }
                               {this.props.longDate}</p>
                           <p className={"sub-title sm-show"}>{this.props.shortDate}</p>
                       </div>
                       <div className={"col-xs-9 no-pad-h "}>
                           {(this.props.status !== 'failed' && this.props.status !== 'error' && this.props.status !== 'init') &&
                               <p className={"sub-title align-right"}>
                                   { this.props.issues.meta > 0 &&
                                       <a className={"small-pill meta"}><span className={"inline-icon-label lnr lnr-code"}></span><span className={"text-error-"}>{ this.props.issues.meta }</span></a>
                                   }
                                   { this.props.issues.resources > 0 &&
                                       <a className={"small-pill resource"}><span className={"inline-icon-label lnr lnr-database"}></span><span className={"text-error-"}>{ this.props.issues.resources }</span></a>
                                   }
                                   { this.props.issues.links > 0 &&
                                       <a className={"small-pill links"}><span className={"inline-icon-label lnr lnr-link"}></span><span className={"text-error-"}>{ this.props.issues.links }</span></a>
                                   }
                                   { this.props.issues.security > 0 &&
                                       <a className={"small-pill links"}><span className={"inline-icon-label lnr lnr-link"}></span><span className={"text-error-"}>{ this.props.issues.security }</span></a>
                                   }
                               </p>
                           }
                           {(this.props.status === 'failed' || this.props.status === 'error') &&
                               <p className="sub-title align-right error-text"><strong>{this.props.message}</strong></p>
                           }
                         </div>
                       </div>
                  </div>
               </div>
               {(this.props.status !== 'failed' && this.props.status !== 'error' && this.props.status !== 'init') &&
                   <div className={"col-50 mr-15 pill-container col-65-offset-left no-pad-h sm-no-margin"}>
                       <div className={"col-sm-12 no-pad-h"}>
                           <div className={"col-50 sm-mr-0 "}>
                               <div className={"message"}>{ this.props.grade.letter }<sup>+</sup></div>
                           </div>
                      </div>
                   </div>
               }
            </div>
       </div>);

       return (
           <div className={ 'row' + (this.props.status === 'failed' ? 'failed' : '') + ' ' + (this.props.status === 'complete' ? 'complete' : 'js-loading') + (this.props.highlight === true ? ' highlight' : '') + ' js_temp_request_'+ this.props.temp_id +' js_request_'+ this.props.requestId +' js_request_'+ this.props.i_id }>
               {this.props.requestId}
               {this.props.i_id}
               <span>{this.props.status}</span>
               <span>{this.props.requestDate}</span>
               <div class="init">
                   <span className={'js_message ' + this.props.status }>{this.props.message}</span>
                   <span>{this.props.url}</span>
                   <span>{this.props.completedTime}</span>
               </div>
            <span className="js_message"></span>
           </div>
       );
     }
   });
