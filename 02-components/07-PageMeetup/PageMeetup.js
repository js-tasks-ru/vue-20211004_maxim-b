import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from "./MeetupView.js";

export default defineComponent({
  name: 'PageMeetup',
  data(){
    return {
      meetup: {},
      error: false,
      errorText: ''
    }
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupView
  },
  watch: {
    meetupId() {
      fetchMeetupById(this.meetupId)
        .then(data => {
          this.meetup = Object.assign({}, data);
          console.log(this.meetup);
        })
        .catch(error => {
          this.error = true;
          this.errorText = error
        });
    }
  },
  template: `
    <div class="page-meetup">

<!--      <meetup-view :meetup="this.meetup" />-->

      <ui-container>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container>
        <ui-alert>error</ui-alert>
      </ui-container>
    </div>`,
});
