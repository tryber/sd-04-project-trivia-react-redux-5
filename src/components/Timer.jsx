import React from 'react';
import { connect } from 'react-redux';
import { timeCount } from '../actions/TimeAction';

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

  getTimer() {
    // const { time } = this.state;
    const { time, setTime } = this.props;
    setTimeout(() => {
      // this.setState({
      //   time: time - 1,
      // });
      setTime();
      if (time === 0) return this.endTimer(time);
      return this.getTimer();
    }, 1000);
  }

  endTimer() {
    this.setState({
      time: 0,
    });
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        {time >= 0 && <h4>Tempo: {time}</h4>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.timerReducer.time,
});

const mapDispatchToProps = (dispatch) => ({
  setTime: () => dispatch(timeCount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
