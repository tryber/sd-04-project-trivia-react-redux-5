import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setIsDisabled } from '../actions';
import { timeCount, setTimer } from '../actions/TimeAction';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time: 5,
    };
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.getTimer();
  }

  componentDidUpdate(prevProps) {
    const { timerID } = this.state;
    const { time, setIsDisableds, resetTime, position, isDisabled } = this.props;
    if (time <= 0) {
      resetTime();
      console.log(time);
      console.log(setIsDisableds);
      clearInterval(timerID);
      setIsDisableds();
    }
    if (!isDisabled) {
      clearInterval(timerID);
      resetTime();
    }
    if (prevProps.position !== position) this.getTimer();
  }

  getTimer() {
    const timerID = setInterval(this.countDown, 1000);
    this.setState((state) => ({ ...state, timerID }));
  }

  countDown() {
    const { setTime } = this.props;
    setTime();
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <h4>Tempo: {time}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.time,
  position: state.questionReducer.position,
  isDisabled: state.questionReducer.isDisabled,

});

const mapDispatchToProps = (dispatch) => ({
  setIsDisableds: () => dispatch(setIsDisabled()),
  setTime: () => dispatch(timeCount()),
  resetTime: () => dispatch(setTimer()),
});

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  setTime: PropTypes.func.isRequired,
  resetTime: PropTypes.func.isRequired,
  setIsDisableds: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
