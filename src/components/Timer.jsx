import React from 'react';
import { connect } from 'react-redux';
import { timeCount } from '../actions/TimeAction';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
    };
    this.getTimer = this.getTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
  }

  componentDidMount() {
    this.getTimer();
  }

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
        time: 5,
      });
      if (enableNxt) this.componentDidMount();
    }
  }

  render() {
    const { time } = this.state;
    // const { time } = this.props;
    console.log('TimerComponente: ', this.state.time);
    console.log('TimerComponente: ', this.props.time);
    console.log('Verificar se muda :', this.props.isDisabled);
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

export default Timer;
// export default connect(mapStateToProps, mapDispatchToProps)(Timer);
