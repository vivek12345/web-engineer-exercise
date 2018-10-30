import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SignIn from '../components/sign-in.jsx';

import { authenticate } from '../actions/sign-in';

const mapStateToProps = (state, router) => {
    const { error, requesting } = state.signIn;
    const redirect = router.history.push;
    
    return { error, requesting, redirect };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authenticate: (email, password) => dispatch(authenticate(email, password))
    }
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SignIn)
);