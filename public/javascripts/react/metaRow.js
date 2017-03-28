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
