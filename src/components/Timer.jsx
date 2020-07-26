import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 30,
    };
    this.getTimer = this.getTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  componentDidMount() {
    this.getTimer();
  }

  // componentDidUpdate() {
  //   this.getTimer();
  // }

  getTimer() {
    const { time } = this.state;
    // const { time, setTime } = this.props;
    setTimeout(() => {
      this.setState({
        time: time - 1,
      });
      // setTime();
      if (time <= 1) return this.endTimer(time);
      return this.getTimer();
    }, 1000);
  }

  endTimer() {
    const { enableButtons, isDisabled, enableNxt } = this.props;
    console.log('enableNxt: ', enableNxt);
    if (isDisabled) {
      enableButtons();
      this.setState({
        time: 0,
        enableNxt: !enableNxt,
      });
      if (enableNxt) this.componentDidMount();
    }
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        <h4>Tempo: {time}</h4>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   time: state.timerReducer.time,
// });

// const mapDispatchToProps = (dispatch) => ({
//   setTime: () => dispatch(timeCount()),
// });

Timer.propTypes = {
  enableButtons: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  enableNxt: PropTypes.bool.isRequired,
};

export default Timer;
// export default connect(mapStateToProps, mapDispatchToProps)(Timer);
