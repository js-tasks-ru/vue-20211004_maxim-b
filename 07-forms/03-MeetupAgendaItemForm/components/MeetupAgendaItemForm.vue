<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash"/>
    </button>

    <ui-form-group>
      <ui-dropdown title="Тип" v-model="localAgendaItem.type" :options="$options.agendaItemTypeOptions" name="type"/>
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input type="time" placeholder="00:00" name="startsAt" v-model="localAgendaItem.startsAt"/>
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input type="time" placeholder="00:00" name="endsAt" v-model="localAgendaItem.endsAt"/>
        </ui-form-group>
      </div>
    </div>

    <template v-if="localAgendaItem.type === 'talk'">
      <ui-form-group label="Тема">
        <ui-input name="title" v-model="localAgendaItem.title"/>
      </ui-form-group>
      <ui-form-group label="Докладчик">
        <ui-input name="speaker" v-model="localAgendaItem.speaker"/>
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input multiline name="description" v-model="localAgendaItem.description"/>
      </ui-form-group>
      <ui-form-group label="Язык">
        <ui-dropdown title="Язык" :options="$options.talkLanguageOptions" name="language"
                     v-model="localAgendaItem.language"/>
      </ui-form-group>
    </template>
    <template v-else-if="localAgendaItem.type === 'other'">
      <ui-form-group label="Заголовок">
        <ui-input name="title" v-model="localAgendaItem.title"/>
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input multiline name="description" v-model="localAgendaItem.description"/>
      </ui-form-group>
    </template>
    <template v-else="">
      <ui-form-group label="Нестандартный текст (необязательно)">
        <ui-input name="title" v-model="localAgendaItem.title"/>
      </ui-form-group>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';

import { isEqual } from 'lodash-es';
import { cloneDeep } from 'lodash-es';

const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
  {value: null, text: 'Не указано'},
  {value: 'RU', text: 'RU'},
  {value: 'EN', text: 'EN'},
];

const zeroPad = (num, places) => String(num).padStart(places, '0')

export default {
  name: 'MeetupAgendaItemForm',

  agendaItemTypeOptions,
  talkLanguageOptions,

  components: {UiIcon, UiFormGroup, UiInput, UiDropdown},
  watch: {
    'localAgendaItem.startsAt':  function(val, oldVal) {
      this.changeAgendaItemEndsAt(val, oldVal);
    },
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },
    agendaItem: {
      // Добавим immediate для инициализации
      immediate: true,
      handler(newValue) {
        if (!isEqual(this.localAgendaItem, newValue)) {
          this.localAgendaItem = { ...newValue };
        }
      },
    },
  },
  methods: {
    changeAgendaItemEndsAt(val, oldVal) {
      if(!oldVal) {
        return;
      }
      const curTime = parseInt(val);
      const oldTime = parseInt(oldVal);
      const diffTime = curTime - oldTime;
      let [endAtHour, endAtTime] = this.localAgendaItem.endsAt.split(":");
      let hour = parseInt(endAtHour);
      if(hour > 0) {
        hour += parseInt(diffTime);
        if(hour < 0 || hour > 23) {
          hour = Math.abs(24 - Math.abs(hour));
        }
        this.localAgendaItem.endsAt = [zeroPad(hour,2), endAtTime].join(":");
      }
    }
  },
  data() {
    return {
      localAgendaItem: undefined
    }
  },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}

.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}

.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}

.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}

.agenda-item-form__col:first-child {
  margin-left: 0;
}

@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }

  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }

  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }

  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }

  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }

  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
