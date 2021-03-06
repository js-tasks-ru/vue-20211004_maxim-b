import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from "./MeetupCover.js";
import MeetupDescription from "./MeetupDescription.js";
import MeetupAgenda from "./MeetupAgenda.js";
import MeetupInfo from "./MeetupInfo.js";

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupCover,
    MeetupDescription,
    MeetupAgenda,
    MeetupInfo
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <meetup-cover :title="meetup.title" :image="meetup.image" />

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>

            <meetup-description :description="meetup.description" />

            <h3>Программа</h3>

            <template v-if="meetup.agenda">
              <meetup-agenda :agenda="meetup.agenda" />
            </template>
            <template v-else-if="meetup.agenda.length === 0">
              <ui-alert >Программа пока пуста...</ui-alert>
            </template>


          </div>
          <div class="meetup__aside">
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="meetup.date" />
          </div>
        </div>
      </ui-container>
    </div>`,
});
