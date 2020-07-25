import React from 'react';
import { connect } from 'react-redux';

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
    const { time } = this.state;
    setTimeout(() => {
      this.setState({
        time: time - 1,
      });
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
    const { time } = this.state;
    return (
      <div>
        <h4>Tempo: {time}</h4>
      </div>
    );
  }
}

mapDispatchToProps(dispatch) ({
  time: event => dispatch(timeCount(event)),
})

mapStateToProps(state) ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
