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
