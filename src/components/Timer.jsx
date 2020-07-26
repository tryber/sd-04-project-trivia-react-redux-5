import React from 'react';
import { connect } from 'react-redux';
// import { timeCount } from '../actions/TimeAction';
import { setIsDisabled } from '../actions';
import { timeCount, setTimer } from '../actions/TimeAction';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // time: 5,
    };
    // this.getTimer = this.getTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    // this.endTimer = this.endTimer.bind(this);
  }

  componentDidMount() {
    this.getTimer();
    // const timerID = setInterval(this.countDown, 1000);
    // this.setState((state) => ({ ...state, timerID: timerID }));
  }

  getTimer() {
    const timerID = setInterval(this.countDown, 1000);
    this.setState((state) => ({ ...state, timerID: timerID }));
  }

  countDown() {
    const { setTime } = this.props;
    setTime();
    // this.setState((state) => ({ time: state.time - 1 }));
  }

  componentDidUpdate(prevProps, ) {
    const { timerID } = this.state;
    const { time, enableNxt, setIsDisableds, resetTime, position, isDisabled } = this.props;
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

  // getTimer() {
  //   const { time } = this.state;
  //   // const { time, setTime } = this.props;
  //   setTimeout(() => {
  //     this.setState({
  //       time: time - 1,
  //     });
  //     // setTime();
  //     if (time <= 1) return this.endTimer(time);
  //     return this.getTimer();
  //   }, 1000);
  // }

  // endTimer() {
  //   const { enableButtons, isDisabled, enableNxt } = this.props;
  //   console.log('enableNxt do Timer: ', enableNxt);
  //   if (isDisabled) {
  //     enableButtons();
  //     this.setState({
  //       time: 5,
  //     });
  //     if (enableNxt) this.componentDidMount();
  //   }
  // }

  render() {
    // const { time } = this.state;
    const { time } = this.props;
    // const { time } = this.props;
    // console.log('TimerComponente: ', this.state.time);
    // console.log('Verificar se muda :', this.props.isDisabled);
    return (
      <div>
        <h4>Tempo: {time}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isDisabled: state.questionReducer.isDisabled,
  time: state.timerReducer.time,
  position: state.questionReducer.position,
  isDisabled: state.questionReducer.isDisabled,

});

const mapDispatchToProps = (dispatch) => ({
  setIsDisableds: () => dispatch(setIsDisabled()),
  setTime: () => dispatch(timeCount()),
  resetTime: () => dispatch(setTimer()),
});

// export default Timer;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);
