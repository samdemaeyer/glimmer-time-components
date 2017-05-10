import Component, { tracked } from '@glimmer/component';

export default class CountdownComponent extends Component {
  @tracked countdownTime;
  @tracked countdownDays;
  @tracked countdownMonths;
  countdownDateTime: string

  constructor(options) {
    super(options);
    this._loadTime();
    let date = new Date();
    date.setDate(date.getDate() + 10);
    let dateStr = date.toISOString().split('T')[0];
    let time = '12:00:00';
    if (this.args.countdownDate) {
      dateStr = this.args.countdownDate;
    }
    if (this.args.countdownTime) {
      time = this.args.countdownTime;
    }
    this.countdownDateTime = `${dateStr}T${time}`;
  }

  // Methods
  _loadTime() {
    let now = +new Date();
    let expireDate = +new Date(this.countdownDateTime);
    let diffSeconds = (expireDate - now) / 1000
    let months = Math.floor((diffSeconds / 86400) / 30.4167);
    let monthsInSeconds = months * 2592000;
    let days = Math.floor((diffSeconds - monthsInSeconds) / 86400);

    this.countdownTime = this._secondsToTime(diffSeconds);
    this.countdownDays = days;
    this.countdownMonths = months;
    setTimeout(() => this._loadTime(), 1000);
  }

  _secondsToTime(sec) {
    let hours = Math.floor((sec % 86400) / 3600).toString();
    let minutes = Math.floor(((sec % 86400) % 3600) / 60).toString();
    let seconds = Math.floor(((sec % 86400) % 3600) % 60).toString();
    let time = { hours, minutes, seconds };
    for (let key in time) {
      if (time[key].length === 1) {
        time[key] = ['dig-0', `dig-${time[key]}`];
      } else {
        time[key] = [`dig-${time[key][0]}`, `dig-${time[key][1]}`];
      }
    }
    return time;
  }
};
