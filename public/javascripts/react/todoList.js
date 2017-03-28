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
