import {defineComponent} from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import {fetchMeetupById} from './meetupService.js';
import MeetupView from "./MeetupView.js";

export default defineComponent({
  name: 'PageMeetup',
  data() {
    return {
      meetup: {},
      error: false,
      errorText: '',
      loading: true
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
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.error = false;
      fetchMeetupById(this.meetupId)
        .then(data => {
          this.meetup = data;
        })
        .catch(error => {
          this.error = true;
          this.errorText = error.message;
        }).finally(() => {
        this.loading = false;
      });
    }
  },
  template: `
    <div class="page-meetup">

  <template v-if="meetup && !loading && !error">
    <meetup-view :meetup="meetup" />
    </template>

    <template v-if="loading">
      <ui-container>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
    </template>

    <template v-if="error">
      <ui-container>
        <ui-alert>{{ errorText }}</ui-alert>
      </ui-container>
    </template>
    </div>`,
});
