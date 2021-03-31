import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus} from '../../utils/const';

const AuthorizedUser = ({avatarUrl}) => {
  return (
    <div className="user-block__avatar">
      <Link to={`/mylist`}><img src={avatarUrl} alt="User avatar" width="63" height="63" /></Link>
    </div>
  );
};

const UnauthorizedUser = () => {
  return (
    <Link to="/login" className="user-block__link">Sign in</Link>
  );
};

const UserBlock = () => {
  const {authorizationStatus, user} = useSelector((state) => state.USER);
  const {avatarUrl} = user;

  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH
        ? <AuthorizedUser avatarUrl={avatarUrl} />
        : <UnauthorizedUser />
      }
    </div>
  );
};

AuthorizedUser.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
};

export default React.memo(UserBlock);
