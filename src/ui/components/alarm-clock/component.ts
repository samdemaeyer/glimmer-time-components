import Component, { tracked } from '@glimmer/component';

export default class AlarmClock extends Component {
  @tracked theme = 'dark';
  @tracked time;
  @tracked weekdays;

  constructor(options) {
    super(options);
    this.loadTime();
    if (this.args.theme) {
      this.theme = this.args.theme;
    }
  }

  loadTime() {
    let time = new Date().toISOString().split('T')[1].split('.')[0];
    this.time = this.convertTimeToArray(time);
    let currentDay = new Date().getDay();
    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.weekdays = days.map((day, i) => {
      let cssClass = '';
      let oneBasedIndex = i + 1;
      if (oneBasedIndex === currentDay) {
        cssClass = 'active';
      }
      return { cssClass, day };
    });
    setTimeout(() => this.loadTime(), 1000);
  }

  // Actions
  toggleTheme(e) {
    e.preventDefault();
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }

  // Methods
  convertTimeToArray(time) {
    let times = {};
    time.split(':').forEach((time, i) => {
      let key = 'hours';
      if (i === 1) { key = 'minutes'; }
      if (i === 2) { key = 'seconds'; }
      times[key] = [`dig-${time[0]}`, `dig-${time[1]}`];
    });
    return times;
  }
};
