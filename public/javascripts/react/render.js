    var InfiniteList = React.createClass({
        getInitialState: function() {
            return {
                elements: [],
                animating: false
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
            var that = this;
            /*
            Check if this is still correct
            Check if this is still correct
            Check if this is still correct
            Check if this is still correct
            */
            socket.on('scanData/'+ window.uid + '/'+ window.apiToken +'/' + item.props.requestId,function(links){
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
            /*
            Check if this is still correct
            Check if this is still correct
            Check if this is still correct
            Check if this is still correct
             */
            socket.emit('getScanData',{
              uid:window.uid,
              apiToken:window.apiToken,
              requestId:item.props.requestId
            });
        },
        addElement: function(){

        },
        updateItems: function(newItems) {
            function addRow(newItem,that){
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

            var that = this;
            var newItem = new Item(newItems);
            var allItems = that.state.elements;
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
                        allItems[idx] = addRow(newItem,this);
                    } else if(newItem.i_id !== null && item.props.i_id === newItem.i_id){
                        allItems[idx] = addRow(newItem,this);
                    } else if(newItem.requestId !== null && item.props.requestId === newItem.requestId){
                        allItems[idx] = addRow(newItem,this);
                    } else if(newItem.requestId !== null && item.props.i_id === newItem.requestId){
                        allItems[idx] = addRow(newItem,this);
                    }
                });
            } else {
                newItem =  addRow(newItem,this)
                allItems = [newItem].concat(allItems);
            }
            allItems.sort(function(a,b){
                var c = new Date(a.props.completedTime);
                var d = new Date(b.props.completedTime);
                return d-c;
            });
            that.setState({
                elements: allItems
            });
        },
        render: function() {
            return (
                <div>
                {this.state.elements}
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
        }
    });

var item = ReactDOM.render(<InfiniteList/>, document.getElementById('request_loop'));
