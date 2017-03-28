var LinkRow = React.createClass({
    getInitialState: function() {
         return {
            expaned:false
        };
    },
    expandRow: function(){
        this.setState(prevState => ({
              expanded: !prevState.expanded
        }));
    },
    render: function() {
        return (
            <div className={"col-sm-12"}>
                    <div className={"row styled" + (this.props.statusCode !== 200 && this.props.internal === true ? ' error ':' ') + (this.props.broken === true ? ' error ':' ') + (this.props.internal === true ? ' internal ':' external neutral ') + (this.props.status === 'pending' ? ' pending ':' ') + (this.props.status === 'complete' ? ' complete ':' ')}>
                    {this.props.internal === true &&
                        <div className={"col-50 padded xs-pad-top text-centered"}>
                            <span className={"small-pill status-pill " + (this.props.statusCode === 200 ? " status-good " : " ") + ((this.props.broken === true || this.props.statusCode !== 200) ? " status-bad " : " ")}>{this.props.statusCode}</span>
                        </div>
                    }
                    {this.props.internal !== true &&
                        <div className={"col-50 padded xs-pad-top text-centered"}>
                            <span className={"small-pill status-pill status-neutral"}>EXT</span>
                        </div>
                    }

                    <div className={"col-sm-2 padded xs-pad-top animate-open col-50-offset-left"}>
                        <div className={"inline-label offset-content row-title"} title={"This is a label"}>{this.props.tagName}</div>
                    </div>


                    <div className={"padded xs-pad-top animate-open" + (this.props.internal === true && this.props.statusCode === 200 ? ' col-sm-10  col-50-offset-right ':' col-sm-7 ')}>
                        <div className={"inline-label row-title" + (this.props.internal === true && this.props.statusCode === 200 ? ' offset-content ' : '')} title={"This is a label"}>{this.props.url}</div>
                    </div>
                    {(this.props.internal !== true || this.props.statusCode !== 200) &&
                    <div className={"col-sm-3 padded xs-pad-bottom  col-50-offset-right text-right hidden-xs"}>
                        <div className={"pull-right no-wrap offset-content"}>
                        {this.props.statusCode !== 200 && this.props.statusCode !== null && this.props.statusCode !== undefined &&
                            <div className={"small-pill " + (this.props.statusCode !== 200 ? 'error':'')}>{this.props.statusMessage}</div>
                        }
                        {this.props.internal !== true && !(this.props.statusCode !== 200 && this.props.statusCode !== null && this.props.statusCode !== undefined ) &&
                            <div className={"small-pill " + (this.props.internal !== true ? 'status-info':'')}>skipped</div>
                        }
                        </div>
                    </div>
                    }

                    <div className={"col-50 mr-15 pill-container col-65-offset-left no-pad-h sm-no-margin hidden-xs"}>
                        <div className={"col-sm-12 no-pad-h text-centered"}>
                            <div className={"col-50 sm-mr-0 "}>
                                <div className={"stacked"} onClick={this.expandRow}>
                                    <span className={"lnr lnr-chevron-right  animate-from row-height abs"}></span>
                                    <span className={"lnr lnr-chevron-down  animate-to row-height abs"}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={(this.state.expanded === true ? 'expanded': '')}>

                        {this.props.statusCode &&
                            <div className={"col-sm-12 expanded-row "}>
                                <div className={"col-sm-2 col"}>
                                   <div className={"inline-label"} title={"This is a label"}>Status</div>
                                </div>
                                <div className={"col-sm-10 col"}>
                                   <div className={"text-content"}>{this.props.statusCode} / {this.props.statusMessage}</div>
                                </div>
                            </div>
                        }

                        {this.props.contentType &&
                            <div className={"col-sm-12 expanded-row "}>
                                <div className={"col-sm-2 col"}>
                                   <div className={"inline-label"} title={"This is a label"}>Content-Type</div>
                                </div>
                                <div className={"col-sm-10 col"}>
                                   <div className={"text-content"}>{this.props.contentType}</div>
                                </div>
                            </div>
                        }

                        {this.props.brokenReason &&
                            <div className={"col-sm-12 expanded-row "}>
                                <div className={"col-sm-2 col"}>
                                   <div className={"inline-label"} title={"This is a label"}>Broken Reason</div>
                                </div>
                                <div className={"col-sm-10 col"}>
                                   <div className={"text-content"}>{this.props.brokenReason}</div>
                                </div>
                            </div>
                        }

                        {this.props.excludedReason &&
                            <div className={"col-sm-12 expanded-row "}>
                                <div className={"col-sm-2 col"}>
                                   <div className={"inline-label"} title={"This is a label"}>excluded</div>
                                </div>
                                <div className={"col-sm-10 col"}>
                                   <div className={"text-content"}>{this.props.excluded}</div>
                                </div>
                            </div>
                        }
                        <div className={"col-sm-12 expanded-row "}>
                            <div className={"col-sm-2 col"}>
                               <div className={"inline-label"} title={"This is a label"}>HTML Element</div>
                            </div>
                            <div className={"col-sm-10 col"}>
                               <div className={"text-content"}>{this.props.tag}</div>
                            </div>
                        </div>

                        <div className={"col-sm-12 expanded-row "}>
                            <div className={"col-sm-2 col"}>
                               <div className={"inline-label"} title={"This is a label"}>URL</div>
                            </div>
                            <div className={"col-sm-10 col"}>
                               <div className={"text-content"}>{this.props.url}</div>
                            </div>
                        </div>

                        <div className={"col-sm-12 expanded-row "}>
                            <div className={"col-sm-2 col"}>
                               <div className={"inline-label"} title={"This is a label"}>Selector</div>
                            </div>
                            <div className={"col-sm-10 col"}>
                               <div className={"text-content"}>{this.props.selector}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
