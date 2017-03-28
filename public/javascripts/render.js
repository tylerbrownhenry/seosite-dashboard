var Dropdown = React.createClass({
    getInitialState: function(props) {
        return {
            expanded: false,
            value: 'Show Errors Only'
        }
    },
    expand: function() {
        this.setState({ expanded: true });
    },
    collapse: function() {
        //this.setState({ expanded: false });
    },
    handleItemClick: function(e) {
        // console.log('this',this,e)
        this.setState({
            expanded: false,
            value: e.target.innerText
        });
        this.props.filter(this.props.filterKey,this.props.parentKey,e.target.innerText,this.props.regenFunc);
    },
    handleTriggerClick: function() {
        this.setState({ expanded: !this.state.expanded });
    },
    render: function() {
        var that = this;
        var dropdown = undefined;
        if (this.state.expanded) {
            // console.log('this',this.props);
            var options = [];
               _.each(this.props.options,function(item){
                    options.push(<div onClick={that.handleItemClick} className="item">{item}</div>);
                });
            dropdown = (
                <div className="content">
                    {options}
                </div>
            );
        }

        return (
            <div className={`dropdown ${this.state.expanded ? 'active' : ''}`}
                tabIndex="0"
                onBlur={() => { this.collapse(); }}>
                <div className="trigger" onClick={this.handleTriggerClick}>
                    {this.state.value}
                </div>
                {dropdown}
            </div>
        );
    }
});

function formatDate(date){
    if(typeof date === 'undefined'){
        return null;
    }
    var seconds = Math.floor((new Date() - moment(date)) / 1000);
    var interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 2592000);
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return moment(date).format('MMMM Do - h:mm a').toString();
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    if(seconds < 10){
        return 'just now';
    } else if(seconds < 60) {
        return 'less than a minute ago';
    } else {
        return 'about a minute ago';
    }
}


var ToolTip = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                I have a tooltip.
                <div className="tooltip">
                    <div className="tt-left">
                        <span className="lnr lnr-link"></span>
                    </div>
                    <div className="tt-right">
                        <p>A <strong>link</strong> is a reference to another document.
                        <sub><a className="bottom-right-a" href="http://www.webopedia.com/TERM/L/link.html">Learn More</a></sub></p>
                    </div>
                </div>
            </div>
        );
    }
});

var StatisticRow  = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                I have a tooltip.
                <div className="tooltip">
                    <div className="tt-left">
                        <span className="lnr lnr-link"></span>
                    </div>
                    <div className="tt-right">
                        <p>A <strong>link</strong> is a reference to another document.
                        <sub><a className="bottom-right-a" href="http://www.webopedia.com/TERM/L/link.html">Learn More</a></sub></p>
                    </div>
                </div>
            </div>
        );
    }
});

var SummaryRow  = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                I have a tooltip.
                <div className="tooltip">
                    <div className="tt-left">
                        <span className="lnr lnr-link"></span>
                    </div>
                    <div className="tt-right">
                        <p>A <strong>link</strong> is a reference to another document.
                        <sub><a className="bottom-right-a" href="http://www.webopedia.com/TERM/L/link.html">Learn More</a></sub></p>
                    </div>
                </div>
            </div>
        );
    }
});

var SummaryColumn = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                I have a tooltip.
                <div className="tooltip">
                    <div className="tt-left">
                        <span className="lnr lnr-link"></span>
                    </div>
                    <div className="tt-right">
                        <p>A <strong>link</strong> is a reference to another document.
                        <sub><a className="bottom-right-a" href="http://www.webopedia.com/TERM/L/link.html">Learn More</a></sub></p>
                    </div>
                </div>
            </div>
        );
    }
});



var MetaRow = React.createClass({
    // getInitialState: function() {
    //     var status = this.props.item.type;
    //     var shortName = '';
    //     if(typeof status !== 'undefined' && typeof status === 'string'){
    //         var cleanStatus = status.split(';')[0].split(' ')[0];
    //         var shortName = _.find(_.keys(mimeTypes),function(key){
    //             if(mimeTypes[key] === cleanStatus){
    //                 return key;
    //             }
    //         });
    //         if(typeof shortName === 'undefined'){
    //             shortName = status;
    //         }
    //     }
    //     return {
    //         statusShortName:shortName
    //     };
    // },

// duration: 351


// start: "2017-02-23T02:39:43.456Z"
// status: 200
// timings: Object
// blocked: 0
// connect: -1
// dns: -1
// receive: 1
// send: 0
// ssl: -1
// wait: 350
// type: "font/ttf"
// url: "https://fonts.gstatic.com/s/roboto/v15/RxZJdnzeo3R5zSexge8UUSZ2oysoEQEeKwjgmXLRnTc.ttf"


                        // <span title={"Resource"} className={"inline-icon-label lnr lnr-database"}></span>

                    // <div className={"col-sm-2 padded xs-pad-top animate-open text-centered col-50-offset-left"}>
                    //     <div className={"inline-label offset-content row-title"}>{this.state.status}</div>
                    // </div>
    render: function() {
        return (
            <div className={"col-sm-12"}>
                <div className={"row styled " + (this.props.item.found !== true ? ' missing ':' ') + (this.props.item.error === true ? ' error ':' ')}>
                    <div className={"col-sm-8 padded xs-pad-top animate-open col-50-offset-left"}>
                        <div className={"inline-label offset-content row-title"} title={"This is a label"}>{this.props.label} - {this.props.item.text}</div>
                    </div>
                    <div className={"col-sm-4 padded xs-pad-bottom  col-50-offset-right text-right hidden-xs"}>
                        <div className={"pull-left no-wrap"}>
                            {this.props.item.message}
                        </div>
                    </div>
                    <div className={"col-50 mr-15 pill-container col-65-offset-left no-pad-h sm-no-margin hidden-xs"}>
                        <div className={"col-sm-12 no-pad-h text-centered"}>
                            <div className={"col-50 sm-mr-0 "}>
                                <div className={"stacked"}>
                                    <span className={"lnr lnr-chevron-right  animate-from row-height abs"}></span>
                                    <span className={"lnr lnr-chevron-down  animate-to row-height abs"}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-12 expanded-row "}>
                        <div className={"col-sm-2 col"}>
                           <div className={"inline-label"} title={"This is a label"}>HTML Element</div>
                        </div>
                        <div className={"col-sm-10 col"}>
                           <div className={"text-content"}>{this.props.item.element}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});



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



var ContentRow = React.createClass({
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
        // console.log('this resource',this.props.item);
        return (
            <div className={"col-sm-12"}>
                <div className={"row styled " + (this.props.item.status !== 200 ? ' error ':' ') + (this.props.item.cached === false ? ' error ':' ') + (this.props.item.gzip === false ? ' error ':' ') + (this.props.item.minified === false ? ' error ':' ') }>
                    <div className={"col-50 padded xs-pad-top text-centered"}>
                        <span className={"small-pill status-pill " + (this.props.item.status == 200 ? " status-good " : " ") + (this.props.item.status == 500 ? " status-bad " : " ") + (this.props.item.status == 301 ? " status-warning " : " ")}>{this.props.item.status}</span>
                    </div>
                    <div className={"col-sm-2 padded xs-pad-top animate-open col-50-offset-left"}>
                        <div className={"inline-label offset-content row-title"} title={"This is a label"}>{this.props.item.type}</div>
                    </div>
                    <div className={"col-sm-6 padded xs-pad-top animate-open"}>
                        <div className={"inline-label row-title"} title={"This is a label"}>{this.props.item.url}</div>
                    </div>
                    <div className={"col-sm-4 padded xs-pad-bottom  col-50-offset-right text-right hidden-xs"}>
                        <div className={"pull-left no-wrap"}>
                            <div className={"small-pill " + (this.props.item.minified === true ? ' neutral ':'') + (this.props.item.minified === false ? 'error':'') + (this.props.item.minified === null ? 'neutral':'')}>not minified</div>
                            <div className={"small-pill " + (this.props.item.gzip === true ? ' neutral ':'') + (this.props.item.gzip === false ? 'error':'') + (this.props.item.gzip === null ? 'neutral':'')}>not gziped</div>
                            <div className={"small-pill " + (this.props.item.cached === true ? ' neutral ':'') + (this.props.item.cached === false ? 'error':'') + (this.props.item.cached === null ? 'neutral':'')}>not cached</div>
                        </div>
                        <div className={"inline-label offset-content row-title pull-right"} title={"This is a label"}>{this.props.item.duration}ms</div>
                    </div>
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

                        <div className={"col-sm-12 expanded-row "}>
                            <div className={"col-sm-2 col"}>
                               <div className={"inline-label"} title={"This is a label"}>Fat</div>
                            </div>
                            <div className={"col-sm-10 col"}>
                               <div className={"text-content"}>It has all kinds of fat!</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var SelectedItem = React.createClass({
    getInitialState: function() {
         return {
            linkFilter: 'Show All',
            resourceFilter: 'Show All',
            metaFilter: 'Show All',
            summary:this.createSummaryRow(),
            statistics:this.createStatisticRow(),
            resources:this.createRow(),
            links:this.createLinkRow(),
            meta:this.createMetaRow()
        };
    },
    closeRow: function(){
        // console.log('this!',this.props.closeRow);
        this.props.closeRow(this);
        // handlScan('summary',this.props.requestId);
    },
    createSummaryRow : function(){
        // console.log('this.props.item',this.props.item);
        return(<SummaryRow></SummaryRow>)
    },
    createStatisticRow: function(){
        // console.log('this.props.item',this.props.item);
        return(<StatisticRow></StatisticRow>)
    },
    filterOptions: function(filterKey,key,selection,regenFunc){
        // console.log('test',filterKey,key,selection,regenFunc,this.state);
        this.setState({
            [filterKey]: selection
        });
        this.setState({
            [key]: this[regenFunc]()
        });
    },
    createLinkRow: function(item){
        var links = [];
        var that = this;
        _.each(this.props.item.links,function(link){
            // console.log('link',link);
            var selector,tag,tagName,internal,contentType,statusCode,statusMessage,samePage,broken,brokenReason,excluded,excludedReason;

            if(link.results){
                internal = link.results.internal
                samePage = link.results.samePage
                selector = link.results.selector,
                tag = link.results.tag,
                tagName = link.results.tagName;
                contentType = link.results["content-type"];
                statusCode = link.results.statusCode;
                statusMessage = link.results.statusMessage;
                excluded: link.results.excluded;
                excludedReason: link.results.excludedReason;
                broken: link.results.broken;
                brokenReason: link.results.brokenReason;
            }

            // console.log('this.state.linkFilter',that)
            if(that && that.state && that.state.linkFilter){
                // console.log('here');
                if(that.state.linkFilter === 'Show Errors Only'){
                        // console.log('filter on here here',link);
                    if(statusCode === 200){
                        // console.log('good here',link);
                        return;
                    }
                    if(internal !== true){
                        // console.log('interal here',link);
                        return
                    }
                }
            }

            links.push(<LinkRow
                status={link.status}
                linkId={link.linkId}
                selector={selector}
                url={link.url}
                broken={broken}
                brokenReason={brokenReason}
                excluded={excluded}
                excludedReason={excludedReason}
                internal={internal}
                contentType={contentType}
                statusCode={statusCode}
                statusMessage={statusMessage}
                tag={tag}
                tagName={tagName}
            ></LinkRow>);
        })
        return links;

    },
    createMetaRow: function(item){
        var metaData = [];
        var that = this;

        // console.log('this.props.item.meta',this.props.item.meta);
        var data = this.props.item.meta;
        _.each(_.keys(data),function(key){
            var item = data[key];
            if(that && that.state && that.state.metaFilter){
                if(that.state.metaFilter === 'Show Errors Only'){
                    /* add another error check for emta tags like length etc. */
                    if(item.found === true){
                        return;
                    }
                }
            }
            metaData.push(<MetaRow item={item} label={key}></MetaRow>);
        })
        // console.log('metaData',metaData);
        return metaData;

    },
    createRow: function(item){
        var resources = [];
        var that = this;
        _.each(this.props.item.resources,function(resource){
            if(that && that.state && that.state.resourceFilter){
                if(that.state.resourceFilter === 'Show Errors Only'){
                    if(resource.status === 200){
                        return;
                    }
                    if(resource.cached === false || resource.gzip === false || resource.minified === false){
                        return
                    }
                }
            }
            resources.push(<ContentRow item={resource}></ContentRow>);
        })
        // console.log('resources',resources);
        return resources;

    },
    render: function() {
        var that = this;
        return (
            <div>
                <div className="col-sm-12" onClick={this.closeRow}>
                    <h4>Summary</h4><button>Filter</button>
                </div>
                <div className="col-sm-12">
                    <h4>Statistics</h4>
                </div>
                <div className="col-sm-12">
                    <h4>Meta</h4>
                    <Dropdown filter={this.filterOptions} filterKey={"metaFilter"} parentKey={'meta'} regenFunc={'createMetaRow'} options={['Show Errors Only', 'Show All']} />
                </div>
                <div>{this.state && this.state.meta}</div>
                <div className="col-sm-12">
                    <h4>Resources</h4>
                    <Dropdown filter={this.filterOptions} filterKey={"resourceFilter"} parentKey={'resources'} regenFunc={'createRow'} options={['Show Errors Only', 'Show All']} />
                </div>
                <div>{this.state && this.state.resources}</div>
                <div className="col-sm-12">
                    <h4>Links</h4>
                    <Dropdown filter={this.filterOptions} filterKey={"linkFilter"} parentKey={'links'} regenFunc={'createLinkRow'} options={['Show Errors Only', 'Show All']} />
                </div>
                <div>{this.state && this.state.links}</div>
            </div>
        );
    }
});

var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var Rect = React.createClass({
    mixins: [SetIntervalMixin],
    getDefaultProps: function() {
        return {
            width: 0,
            height: 0,
            x: 0,
            y: 0
        }
    },
    getInitialState: function() {
      return {
        milliseconds: 0,
        height: 0
      };
    },
    shouldComponentUpdate: function(nextProps) {
      return this.props.height !== this.state.height;
    },
    componentWillMount: function() {
      // console.log('will mount');
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({milliseconds: 0, height: this.props.height});
    },
    componentDidMount: function() {
      this.setInterval(this.tick, 10);
    },
    tick: function(start) {
      this.setState({milliseconds: this.state.milliseconds + 10});
    },
    render: function() {
      var easyeasy = d3.ease('back-out');
      var height = this.state.height + (this.props.height - this.state.height) * easyeasy(Math.min(1, this.state.milliseconds/1000));
      var y = this.props.height - height + this.props.y;
        return (
          <rect className="bar"
                height={height}
                y={y}
                width={this.props.width}
                x={this.props.x}
          >
          </rect>
        );
    },
});

    var TodoList = React.createClass({
        render: function() {
            var createItem = function(item) {
                // console.log('item',item);
                          item.completedTime = item.completedTime || item.requestDate;
                item.message = item.message || item.failedReason;
                if(item.url && item.url.url){
                    item.url = item.url.url;
                }
                item.shortDate = formatDate(item.completedTime,true);
                item.longDate = formatDate(item.completedTime);
                return (
                    <TodoListItem
                    _id={item._id}
                    uid={item.uid}
                    expandRow={item.expandRow}
                    completedTime={item.completedTime}
                    requestDate={item.requestDate}
                    grade={item.grade}
                    issues={item.issues}
                    meta={item.meta}
                    resources={item.resources}
                    requestId={item.requestId}
                    i_id={item.i_id}
                    temp_id={item.temp_id}
                    status={item.status}
                    message={item.message}
                    links={item.links}
                    url={item.url}
                    emails={item.emails}
                    highlight={item.highlight}
                    redirects={item.redirects}
                    captures={item.captures}
                    />

                  );
            };
      return <div>{this.props.items.map(createItem)}</div>;
      }
    });

    function handlScan(name,requestId){
        socket.emit('handleScan', {
            uid:window.uid,
            token:window.apiToken,
            currentPage:window.currentPage,
            requestId:requestId,
            action:name
        });
    }


    var TodoListItem = React.createClass({
        deleteThis: function(){
            // console.log('this!',this)
            handlScan('delete',this.props.requestId);
        },
        retryThis: function(){
            // console.log('this!',this)
            handlScan('retry',this.props.requestId);
        },
        gotoSummary: function(){
            // console.log('this!',this.props.expandRow);
            this.props.expandRow(this);

            // handlScan('summary',this.props.requestId);
        },
        cancelThis: function(){
            // console.log('this!',this)
            handlScan('cancel',this.props.requestId);
        },
        performAction: function(event,name) {
            // console.log('performAction',event,'name',name,'this',this);
            // event.preventDefault(); // Let's stop this event.
            // event.stopPropagation(); // Really this time.
            this.setState(prevState => ({
              toolbarOpen: !prevState.toolbarOpen
            }));
        },

        openToolbar: function(event) {
            // console.log('expand row--',event);
            // event.preventDefault(); // Let's stop this event.
            // event.stopPropagation(); // Really this time.
            this.setState(prevState => ({
              toolbarOpen: !prevState.toolbarOpen
            }));
        },
        expandRow: function(){
            // console.log('expand row');
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
            // console.log('this',this.props);
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

    var TodoForm = React.createClass({
      getInitialState: function() {
        return {item: ''};
        },
      handleSubmit: function(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});
        React.findDOMNode(this.refs.item).focus();
        return;
      },
      onChange: function(e){
        this.setState({
          item: e.target.value
        });
      },
      render: function(){
        return (
          <form onSubmit={this.handleSubmit}>
            <input type='text' ref='item' onChange={this.onChange} value={this.state.item}/>
            <input type='submit' value='Add'/>
          </form>
        );
      }
    });



var ListItem = React.createClass({
    render: function() {

        return <div className="infinite-list-item">
          List Item {this.props.num}
        </div>;
    }
});


    function Item(input,data){
        var  resp = {
            data: [
                  {x: 'a', y: 20},
                  {x: 'b', y: 14},
                  {x: 'c', y: 12},
                  {x: 'd', y: 19},
                  {x: 'e', y: 18},
                  {x: 'f', y: 15},
                  {x: 'g', y: 10},
                  {x: 'h', y: 14}
            ],
            _id:null,
            uid:null,
            completedTime:null,
            requestDate:null,
            grade:{message: null, letter: null},
            issues:{
                meta: 0,
                security: 0,
                resources: 0,
                links: 0,
                tooManyLinks: false
            },
            meta:[],
            resources:[],
            requestId:null,
            links:[],
            url:{url: null, resolvedUrl: null},
            emails:[],
            redirects:[],
            captures:[],
            temp_id: null,
            i_id: null,
            status: 'complete',
            message: null,
            highlight: null
        }
        return newItem = _.extend(resp,input);

    }

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      data: []
    }
  },

  shouldComponentUpdate: function(nextProps) {
      return this.props.data !== nextProps.data;
  },

  render: function() {
    var props = this.props;
    // console.log('props',props);
    var data = props.data.data.map(function(d) {
      return d.y;
    });

    var yScale = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = data.map(function(point, i) {
      var height = yScale(point),
          y = props.height - height,
          width = xScale.rangeBand(),
          x = xScale(i);

      return (
        <Rect height={height}
              width={width}
              x={x}
              y={y}
              key={i} />
      )
    });

    return (
          <g>{bars}</g>
    );
  }
});


var Chart = React.createClass({
    render: function() {
        return (
            <svg width={this.props.width}
                 height={this.props.height} >
              {this.props.children}
            </svg>
        );
    }
});
var clone = {};

var count = 0;

var i = 0;

    var InfiniteList = React.createClass({
        getInitialState: function() {
              // console.log('getInitialState');
            return {
                elements: [],
                animating: false,
                isInfiniteLoading: false
            }
        },
        buildSummary: function(newItem,that){
            return <SummaryColumn
                    _id={newItem._id}
                    uid={newItem.uid}
                    closeRow={that.closeRow}
                    completedTime={newItem.completedTime}
                    shortDate={newItem.shortDate}
                    longDate={newItem.longDate}
                    requestDate={newItem.requestDate}
                    grade={newItem.grade}
                    issues={newItem.issues}
                    meta={newItem.meta}
                    resources={newItem.resources}
                    requestId={newItem.requestId}
                    i_id={newItem.i_id}
                    temp_id={newItem.temp_id}
                    status={newItem.status}
                    message={newItem.message}
                    links={newItem.links}
                    url={newItem.url.url}
                    emails={newItem.emails}
                    highlight={newItem.highlight}
                    redirects={newItem.redirects}
                    captures={newItem.captures}
                    />
        },
        closeRow: function(){
            // console.log('test');
            this.setState({
                animating: true,
                rowExpanded: false
            });
            var that = this;
            setTimeout(function() {
                that.setState({
                    animating: false,
                    selectedItem: null
                });
            },750);

        },
        buildSelectedColumn: function(that){
            return  <SelectedItem
                        closeRow={that.closeRow}
                        item={that.state.selectedItem.props}/>
        },
        expandRow: function(item){
            // console.log('you better emit it!',item.props.requestId);
            var that = this;
            socket.on('scanData/'+ window.uid + '/'+ window.apiToken +'/' + item.props.requestId,function(links){
                // console.log('links',links,'item',item);
                item.props.links = links;
                that.setState({
                    selectedItem: that.buildSummary(item.props,that)
                });
                that.setState({
                    animating: true,
                    rowExpanded: true,
                    selectedColumn: that.buildSelectedColumn(that)
                });
            });
            socket.emit('getScanData',{uid:window.uid,apiToken:window.apiToken,requestId:item.props.requestId});


        },
        buildElements: function(start, end) {

        },
        addElement: function(){

        },
        updateItems: function(newItems) {
            function toDoItem(newItem,that){
                // console.log('this.expandRow',newItem,that);
                newItem.completedTime = newItem.completedTime || newItem.requestDate;
                newItem.message = newItem.message || newItem.failedReason;
                if(typeof newItem.url !== 'undefined' && typeof newItem.url.url !== 'undefined'){
                    newItem.url = newItem.url.url;
                }
                newItem.shortDate = formatDate(newItem.completedTime,true);
                newItem.longDate = formatDate(newItem.completedTime);
                return <TodoListItem
                    _id={newItem._id}
                    uid={newItem.uid}
                    expandRow={that.expandRow}
                    completedTime={newItem.completedTime}
                    shortDate={newItem.shortDate}
                    longDate={newItem.longDate}
                    requestDate={newItem.requestDate}
                    grade={newItem.grade}
                    issues={newItem.issues}
                    meta={newItem.meta}
                    resources={newItem.resources}
                    requestId={newItem.requestId}
                    i_id={newItem.i_id}
                    temp_id={newItem.temp_id}
                    status={newItem.status}
                    message={newItem.message}
                    links={newItem.links}
                    url={newItem.url}
                    emails={newItem.emails}
                    highlight={newItem.highlight}
                    redirects={newItem.redirects}
                    captures={newItem.captures}
                    />
            }


            // console.log('newItems',newItems);
            var that = this;
            this.setState({
                isInfiniteLoading: true
            });

            var newItem = new Item(newItems);
            var allItems = that.state.elements;
            // console.log('newItem',newItem,'allItems',allItems);

            var existing = _.find(allItems,function(item){
                if(newItem.temp_id !== null && item.props.temp_id === newItem.temp_id){
                // console.log('exisint',item,newItem);
                    return true;
                } else if(newItem.i_id !== null && item.props.i_id === newItem.i_id){
                // console.log('exisint',item,newItem);
                    return true;
                } else if(newItem.requestId !== null && item.props.requestId === newItem.requestId){
                // console.log('exisint',item,newItem);
                    return true;
                } else if(newItem.requestId !== null && item.props.i_id === newItem.requestId){
                    return true;
                } else {
                    // console.log('exisint',item.props.requestId,newItem.requestId);
                }
            });
            if(existing){
                _.each(allItems,function(item,idx){
                    if(newItem.temp_id !== null && item.props.temp_id === newItem.temp_id){
                        allItems[idx] = toDoItem(newItem,this);
                        // console.log('exisint yep',item);
                    } else if(newItem.i_id !== null && item.props.i_id === newItem.i_id){
                        allItems[idx] = toDoItem(newItem,this);
                        // console.log('exisint yep',item);
                    } else if(newItem.requestId !== null && item.props.requestId === newItem.requestId){
                        allItems[idx] = toDoItem(newItem,this);
                        // console.log('exisint yep',item);
                    } else if(newItem.requestId !== null && item.props.i_id === newItem.requestId){
                        allItems[idx] = toDoItem(newItem,this);
                        // console.log('exisint yep',item);
                    } else {
                        // console.log('exisint nope',item,newItem);
                    }
                });
                // console.log('existing',existing,'that.state.elements',allItems);
            } else {
                newItem =  toDoItem(newItem,this)
                allItems = [newItem].concat(allItems);
            }

            allItems.sort(function(a,b){
                var c = new Date(a.props.completedTime);
                var d = new Date(b.props.completedTime);
                return d-c;
            });

            that.setState({
                isInfiniteLoading: false,
                elements: allItems
            });
        },
        // handleInfiniteLoad: function() {
            // console.log('handleInfiniteLoad');
            // var that = this;

        // },
        // elementInfiniteLoad: function() {
        //     return <div className="infinite-list-item">
        //         <div className={"row styled interactive padded complete"}>
        //             Loading...
        //         </div>
        //     </div>;
        // },
        render: function() {
            return (
                <div>
                <Infinite elementHeight={81}
                className={(this.state.rowExpanded)? "col-sm-3 animate-all hide-mobile" + ((this.state.animating)?' animating ': ' ') : "col-sm-12 animate-all" + ((this.state.animating)?' animating ': ' ') }
                useWindowAsScrollContainer>
                {this.state.elements}
                </Infinite>
                <div className={(this.state.rowExpanded === true)? "col-sm-9 animate-all":"animate-all animate-close"}>
                    <div className="overflow-container">
                    <button className="show-mobile" onClick={this.closeRow}>Close On Mobile</button>

                    {this.state.selectedItem && this.state.selectedColumn &&
                            <SelectedItem
                            closeRow={this.closeRow}
                            incomingUpdates={this.outGoingUpdates}
                            item={this.state.selectedItem.props}
                            />
                    }
                    </div>
                </div>
            </div>
            );
        },
      __old__render: function() {
      return (
        <div>
            <TodoList items={this.state.items}/>
            <TodoForm onFormSubmit={this.updateItems}/>
        </div>
      );
      }
    });

var item = ReactDOM.render(<InfiniteList/>, document.getElementById('request_loop'));
