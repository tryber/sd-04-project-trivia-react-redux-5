import React from 'react';

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
      time === 0 ? this.endTimer(time) : this.getTimer();
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

export default Timer;
