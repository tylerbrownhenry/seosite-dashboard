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
        console.log('this resource',this.props.item);
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
