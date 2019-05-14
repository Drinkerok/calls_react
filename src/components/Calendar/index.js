import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import './styles.css';
import {connect} from 'react-redux';
import {changeDate} from './../../AC';

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Март',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
const WEEKDAYS_LONG = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];


class Calendar extends Component {
  static propTypes = {
    // from connect
    changeDate: PropTypes.func.isRequired
  };


  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.props.changeDate({from, to: this.state.to});
  }
  handleToChange(to) {
    this.setState({ to }, this.showFromMonth);
    this.props.changeDate({from: this.state.from, to});
  }



  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };

    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus(),
            locale:'ru',
            months: MONTHS,
            weekdaysLong: WEEKDAYS_LONG,
            weekdaysShort: WEEKDAYS_SHORT
          }}
          onDayChange={this.handleFromChange}
          firstDayOfWeek = {1}
          locale = {'ru'}
          months = {MONTHS}
          weekdaysLong = {WEEKDAYS_LONG}
          weekdaysShort = {WEEKDAYS_SHORT}
          placeholder = {'Дата начала'}
        />{' '}
        —{' '}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2,
              locale:'ru',
              months: MONTHS,
              weekdaysLong: WEEKDAYS_LONG,
              weekdaysShort: WEEKDAYS_SHORT
            }}
            onDayChange={this.handleToChange}
            firstDayOfWeek = {1}
            placeholder = {'Дата окончиания'}
          />
        </span>
      </div>
    )
  }
}



export default connect(null, { changeDate } )(Calendar);