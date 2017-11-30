/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { mount, shallow } from 'enzyme';

import { Calendar } from './Calendar';
import { CalendarBase } from './Calendar.base';
import { DateRangeType, DayOfWeek, ICalendarProps } from './Calendar.types';
import { addDays, compareDates } from '../../utilities/dateMath/DateMath';

class CalendarWrapper extends React.Component<ICalendarProps, {}> {
  public render(): JSX.Element {
    return <Calendar { ...this.props } />;
  }
}

describe('Calendar', () => {
  let dayPickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],

    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],

    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],

    shortDays: [
      'S',
      'M',
      'T',
      'W',
      'T',
      'F',
      'S'
    ],

    goToToday: 'Go to today'
  };

  it('can handle invalid starting dates', () => {
    let defaultDate = new Date('invalid');
    let renderedComponent = ReactTestUtils.renderIntoDocument(
      <CalendarWrapper
        strings={ dayPickerStrings }
        isMonthPickerVisible={ true }
        value={ defaultDate }
      />);
    let domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);

    let today = domElement.querySelector('.ms-DatePicker-day--today');
    expect(+today!.textContent!).toEqual(new Date().getDate());
  });

  it('renders simple calendar correctly', () => {
    const date = new Date(2000, 1, 1);
    const component = renderer.create(
      <Calendar
        strings={ dayPickerStrings }
        isMonthPickerVisible
        value={ date }
      />
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Test rendering simplest calendar', () => {
    let renderedComponent: any;
    let domElement: Element;

    beforeAll(() => {
      renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          isMonthPickerVisible={ false }
        />);
      domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
    });

    it('Verify day picker header', () => {
      let today = new Date();
      let monthName = dayPickerStrings.months[today.getMonth()];
      let year = today.getFullYear();
      let dayPickerMonth = domElement.querySelector('.ms-DatePicker-monthAndYear');

      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth!.textContent).toEqual(monthName + ' ' + year.toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = domElement.querySelectorAll('.ms-DatePicker-weekday');

      expect(dayHeaders.length).toEqual(7);
      expect(dayHeaders[0].textContent).toEqual(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[1].textContent).toEqual(dayPickerStrings.shortDays[1]);
      expect(dayHeaders[2].textContent).toEqual(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[3].textContent).toEqual(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[4].textContent).toEqual(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[5].textContent).toEqual(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[6].textContent).toEqual(dayPickerStrings.shortDays[6]);
    });

    it('Verify go to today', () => {
      let goToToday = domElement.querySelector('.ms-DatePicker-goToday');

      expect(goToToday).toBeDefined();
      expect(goToToday!.textContent).toEqual(dayPickerStrings.goToToday);
    });
  });

  describe('Test rendering most complicated calendar', () => {
    let renderedComponent: any;
    let domElement: Element;
    let defaultDate: Date;
    let lastSelectedDateRange: Date[] | null = null;

    beforeAll(() => {
      defaultDate = new Date(2017, 2, 16);
      let onSelectDate = (): (date: Date, dateRangeArray: Date[]) => void => {
        return (date: Date, dateRangeArray: Date[]): void => {
          lastSelectedDateRange = dateRangeArray;
        };
      };

      renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          isMonthPickerVisible={ true }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Tuesday }
          dateRangeType={ DateRangeType.Week }
          autoNavigateOnSelection={ true }
          onSelectDate={ onSelectDate() }
        />);
      domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
    });

    it('Verify day picker header', () => {
      let monthName = dayPickerStrings.months[defaultDate.getMonth()];
      let dayPickerMonth = domElement.querySelector('.ms-DatePicker-monthAndYear');

      expect(dayPickerMonth).toBeDefined();
      expect(dayPickerMonth!.textContent).toEqual(monthName + ' ' + defaultDate.getFullYear().toString());
    });

    it('Verify first day of week', () => {
      let dayHeaders = domElement.querySelectorAll('.ms-DatePicker-weekday');

      expect(dayHeaders.length).toEqual(7);
      expect(dayHeaders[0].textContent).toEqual(dayPickerStrings.shortDays[2]);
      expect(dayHeaders[1].textContent).toEqual(dayPickerStrings.shortDays[3]);
      expect(dayHeaders[2].textContent).toEqual(dayPickerStrings.shortDays[4]);
      expect(dayHeaders[3].textContent).toEqual(dayPickerStrings.shortDays[5]);
      expect(dayHeaders[4].textContent).toEqual(dayPickerStrings.shortDays[6]);
      expect(dayHeaders[5].textContent).toEqual(dayPickerStrings.shortDays[0]);
      expect(dayHeaders[6].textContent).toEqual(dayPickerStrings.shortDays[1]);
    });

    it('Verify month picker seen', () => {
      let monthPicker = domElement.querySelector('.ms-DatePicker-monthPicker') as HTMLElement;

      expect(monthPicker).toBeDefined();
      expect(monthPicker.style.display).not.toEqual('none');
    });

    it('Verify month picker header', () => {
      let currentYear = domElement.querySelector('.ms-DatePicker-currentYear');

      expect(currentYear).toBeDefined();
      expect(currentYear!.textContent).toEqual(defaultDate.getFullYear().toString());
    });

    it('Verify month picker months', () => {
      let months = domElement.querySelectorAll('.ms-DatePicker-monthOption');

      expect(months.length).toEqual(12);
      for (let i = 0; i < 12; i++) {
        expect(months[i].textContent).toEqual(dayPickerStrings.shortMonths[i]);
      }
    });

    it('Verify go to today', () => {
      let goToToday = domElement.querySelector('.ms-DatePicker-goToday');

      expect(goToToday).toBeDefined();
      expect(goToToday!.textContent).toEqual(dayPickerStrings.goToToday);
    });

    it('Verify navigate to different week in same month', () => {
      lastSelectedDateRange = null;
      let days = domElement.querySelectorAll('.ms-DatePicker-day');
      let day = days[8]; // 03/08/2017
      ReactTestUtils.Simulate.click(day);

      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, new Date(2017, 2, 7 + i))).toEqual(true));
    });

    it('Verify navigate to day in different month', () => {
      lastSelectedDateRange = null;
      let days = domElement.querySelectorAll('.ms-DatePicker-day');
      let day = days[34]; // 04/03/2017
      let firstDate = new Date(2017, 2, 28);
      ReactTestUtils.Simulate.click(day);

      expect(lastSelectedDateRange).not.toBeNull();
      expect(lastSelectedDateRange!.length).toEqual(7);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(firstDate, i))).toEqual(true));
    });
  });

  describe('render with date boundaries', () => {
    it('out-of-bounds days should be disabled', () => {
      const defaultDate = new Date('Mar 16 2017');
      const minDate = new Date('Mar 6 2017');
      const maxDate = new Date('Mar 24 2017');
      let renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          dateRangeType={ DateRangeType.Day }
          minDate={ minDate }
          maxDate={ maxDate }
        />);
      const domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
      const days = Array.from(domElement.querySelectorAll('.ms-DatePicker-day'));

      expect(days.slice(0, 7).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(true);
      expect(days.slice(8, 26).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(false);
      expect(days.slice(27).every(e => e.classList.contains('ms-DatePicker-day--disabled'))).toBe(true);
    });

    it('out-of-bounds days should not be part of selected range', () => {
      let lastSelectedDateRange: Date[] = new Array();
      const defaultDate = new Date('Mar 16 2017');
      const minDate = new Date('Mar 6 2017');
      const maxDate = new Date('Mar 24 2017');
      const onSelectDate = (): (date: Date, dateRangeArray: Date[]) => void => {
        return (date: Date, dateRangeArray: Date[]): void => {
          lastSelectedDateRange = dateRangeArray;
        };
      };
      const renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          dateRangeType={ DateRangeType.Month }
          minDate={ minDate }
          maxDate={ maxDate }
          onSelectDate={ onSelectDate() }
        />);
      const domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
      const days = Array.from(domElement.querySelectorAll('.ms-DatePicker-day'));
      ReactTestUtils.Simulate.click(days[18]);

      expect(lastSelectedDateRange!.length).toEqual(19);
      lastSelectedDateRange!.forEach((val, i) => expect(compareDates(val, addDays(minDate, i))).toEqual(true));
    });

    it('navigators to out-of-bounds months should be disabled', () => {
      const defaultDate = new Date('Mar 15 2017');
      const minDate = new Date('Mar 1 2017');
      const maxDate = new Date('Mar 31 2017');
      const renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          dateRangeType={ DateRangeType.Day }
          minDate={ minDate }
          maxDate={ maxDate }
        />);
      const domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
      const prevMonth = domElement.querySelector('.ms-DatePicker-prevMonth');
      const nextMonth = domElement.querySelector('.ms-DatePicker-nextMonth');

      expect(prevMonth!.classList.contains('ms-DatePicker-prevMonth--disabled')).toBe(true);
      expect(nextMonth!.classList.contains('ms-DatePicker-nextMonth--disabled')).toBe(true);
    });

    it('out-of-bounds months should be disabled', () => {
      const defaultDate = new Date('Mar 15 2017');
      const minDate = new Date('Mar 1 2017');
      const maxDate = new Date('Oct 1 2017');
      const renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          dateRangeType={ DateRangeType.Day }
          minDate={ minDate }
          maxDate={ maxDate }
        />);
      const domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
      const months = Array.from(domElement.querySelectorAll('.ms-DatePicker-monthOption'));

      expect(months.slice(0, 1).every(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(true);
      expect(months.slice(2, 9).some(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(false);
      expect(months.slice(10).every(e => e.classList.contains('ms-DatePicker-monthOption--disabled'))).toBe(true);
    });

    it('navigators to out-of-bounds years should be disabled', () => {
      const defaultDate = new Date('Mar 15 2017');
      const minDate = new Date('Jan 1 2017');
      const maxDate = new Date('Dec 31 2017');
      const renderedComponent = ReactTestUtils.renderIntoDocument(
        <CalendarWrapper
          strings={ dayPickerStrings }
          value={ defaultDate }
          firstDayOfWeek={ DayOfWeek.Sunday }
          dateRangeType={ DateRangeType.Day }
          minDate={ minDate }
          maxDate={ maxDate }
        />);
      const domElement = ReactDOM.findDOMNode(renderedComponent as React.ReactInstance);
      const prevMonth = domElement.querySelector('.ms-DatePicker-prevYear');
      const nextMonth = domElement.querySelector('.ms-DatePicker-nextYear');

      expect(prevMonth!.classList.contains('ms-DatePicker-prevYear--disabled')).toBe(true);
      expect(nextMonth!.classList.contains('ms-DatePicker-nextYear--disabled')).toBe(true);
    });
  });

  describe('component state', () => {
    it('selected & navigated date defaults should be today', () => {
      // When not passed in selected & navigated dates default to current date
      // These dates will be ms different, so just compare their day, month, and year
      // This test will likely fail around midnight.

      const component = shallow(
        <CalendarBase
          strings={ dayPickerStrings }
          isMonthPickerVisible={ false }
        />).dive();

      const today = new Date();
      const selectedDate = component.state('selectedDate') as Date;
      const navigatedDate = component.state('navigatedDate') as Date;

      expect(selectedDate.getDate()).toEqual(today.getDate());
      expect(selectedDate.getMonth()).toEqual(today.getMonth());
      expect(selectedDate.getFullYear()).toEqual(today.getFullYear());
      expect(navigatedDate.getDate()).toEqual(today.getDate());
      expect(navigatedDate.getMonth()).toEqual(today.getMonth());
      expect(navigatedDate.getFullYear()).toEqual(today.getFullYear());
    });

    it('selected & navigated date should be value of "value" prop', () => {
      const defaultDate = new Date(2017, 2, 16);
      const component = shallow(
        <CalendarBase
          strings={ dayPickerStrings }
          isMonthPickerVisible={ false }
          value={ defaultDate }
        />).dive();

      const selectedDate = component.state('selectedDate') as Date;
      const navigatedDate = component.state('navigatedDate') as Date;

      expect(selectedDate).toEqual(defaultDate);
      expect(navigatedDate).toEqual(defaultDate);
    });
  });
});
