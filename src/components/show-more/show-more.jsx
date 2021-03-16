import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {showMore} from '../../store/action';

const ShowMore = ({increaseShowedFilmsCount}) => {
  return (
    <div className="catalog__more" onClick={increaseShowedFilmsCount}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  increaseShowedFilmsCount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  increaseShowedFilmsCount() {
    dispatch(showMore());
  },
});

export {ShowMore};
export default connect(null, mapDispatchToProps)(ShowMore);
