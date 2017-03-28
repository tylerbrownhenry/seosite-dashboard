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
