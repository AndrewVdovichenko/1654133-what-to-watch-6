import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../utils';

const AuthorizedUser = ({avatarUrl}) => {
  return (
    <div className="user-block__avatar">
      <img src={avatarUrl} alt="User avatar" width="63" height="63" />
    </div>
  );
};

const UnauthorizedUser = () => {
  return (
    <Link to="/login" className="user-block__link">Sign in</Link>
  );
};

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH
        ? <AuthorizedUser avatarUrl={`img/avatar.jpg`}/>
        : <UnauthorizedUser />
      }
    </div>
  );
};

AuthorizedUser.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

export {UserBlock};
export default connect(mapStateToProps, null)(UserBlock);
