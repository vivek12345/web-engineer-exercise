import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchApps } from '../actions/apps';
import Apps from '../components/apps.jsx';


function mapStateToProps(state) {
    const { items, error } = state.apps;
    
    return { error, items };
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchApps: () => dispatch(fetchApps())
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Apps)
);