import Component, { tracked } from "@glimmer/component";

export default class Countdown extends Component {
  @tracked theme = 'dark';

  // Actions
  toggleTheme(e) {
    e.preventDefault();
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
  }
}
