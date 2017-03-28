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
        // console.log('handleItemClick this',this,e)
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
            console.log('render this',this.props);
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
