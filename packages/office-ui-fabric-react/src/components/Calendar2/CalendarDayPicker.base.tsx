import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  getId,
  getRTL,
  getRTLSafeKeyCode,
  customizable
} from '../../Utilities';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { ICalendarDayPickerProps, ICalendarDayPickerStyles, ICalendarDayPickerStyleProps } from './CalendarDayPicker.types';
import { CornerType } from './CalendarDay.types';
import { CalendarDay } from './CalendarDay';
import { CalendarDayBase } from './CalendarDay.base';
import { DayOfWeek, MonthOfYear, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { FocusZone } from '../../FocusZone';
import { Icon } from '../../Icon';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumber,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd
} from '../../utilities/dateMath/DateMath';
import TimeConstants from '../../utilities/dateValues/TimeConstants';
import {
  classNamesFunction
} from '../../Styling';

const DAYS_IN_WEEK = 7;
const getClassNames = classNamesFunction<ICalendarDayPickerStyleProps, ICalendarDayPickerStyles>();

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
  cornerType?: CornerType;
}

export interface ICalendarDayPickerState {
  activeDescendantId?: string;
  weeks?: IDayInfo[][];
}

export interface ICornerTypeInfo {
  weekIndex: number;
  dayIndex: number;
  cornerType: CornerType;
}

@customizable('CalendarDayPicker', ['getStyles', 'theme'])
export class CalendarDayPickerBase extends BaseComponent<ICalendarDayPickerProps, ICalendarDayPickerState> {
  /*
  public refs: {
    [key: string]: React.ReactInstance;
    navigatedDay: HTMLElement;
  };
  */

  private _dayPicker: HTMLElement;
  private _navigatedDay: HTMLElement;

  public constructor(props: ICalendarDayPickerProps) {
    super(props);

    this.state = {
      activeDescendantId: getId('DatePickerDay-active'),
      weeks: this._getWeeks(props)
    };

    this._onSelectNextMonth = this._onSelectNextMonth.bind(this);
    this._onSelectPrevMonth = this._onSelectPrevMonth.bind(this);
  }

  public componentWillReceiveProps(nextProps: ICalendarDayPickerProps) {
    this.setState({
      weeks: this._getWeeks(nextProps)
    });
  }

  public render() {
    let { activeDescendantId, weeks } = this.state;
    const {
      firstDayOfWeek,
      strings,
      navigatedDate,
      selectedDate,
      dateRangeType,
      navigationIcons,
      showWeekNumbers,
      firstWeekOfYear,
      dateTimeFormatter,
      showSixWeeksByDefault,
      minDate,
      maxDate,
      onHeaderSelect,
      isMonthPickerVisible,
      areCalendarsInline,
      theme,
      getStyles } = this.props;
    let dayPickerId = getId('DatePickerDay-dayPicker');
    let monthAndYearId = getId('DatePickerDay-monthAndYear');
    let leftNavigationIcon = navigationIcons.leftNavigation;
    let rightNavigationIcon = navigationIcons.rightNavigation;
    let weekNumbers = showWeekNumbers ? getWeekNumbersInMonth(weeks!.length, firstDayOfWeek, firstWeekOfYear, navigatedDate) : null;
    let selectedDateWeekNumber = showWeekNumbers ? getWeekNumber(selectedDate, firstDayOfWeek, firstWeekOfYear) : undefined;
    const headerToggleView = !!onHeaderSelect;
    const formattedNavigateMonthAndYear = dateTimeFormatter.formatMonthYear(navigatedDate, strings);

    // determine if previous/next months are in bounds
    const prevMonthInBounds = minDate ? compareDatePart(minDate, getMonthStart(navigatedDate)) < 0 : true;
    const nextMonthInBounds = maxDate ? compareDatePart(getMonthEnd(navigatedDate), maxDate) < 0 : true;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        showWeekNumbers: showWeekNumbers!,
        areCalendarsInline: areCalendarsInline,
        isMonthPickerVisible: isMonthPickerVisible,
        headerToggleView: headerToggleView,
        nextMonthInBounds: nextMonthInBounds,
        prevMonthInBounds: prevMonthInBounds
      }
    );

    return (
      <div className={ classNames.dayPicker } id={ dayPickerId } ref={ this._resolveRef('_day{Picker') }>
        <div className={ classNames.monthComponents }>
          <div className={ classNames.navContainer }>
            <span
              className={ classNames.prevMonth }
              onClick={ this._onSelectPrevMonth }
              onKeyDown={ this._onPrevMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.prevMonthAriaLabel ? strings.prevMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, -1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span >
            <span
              className={ classNames.nextMonth }
              onClick={ this._onSelectNextMonth }
              onKeyDown={ this._onNextMonthKeyDown }
              aria-controls={ dayPickerId }
              aria-label={ strings.nextMonthAriaLabel ? strings.nextMonthAriaLabel + ' ' + strings.months[addMonths(navigatedDate, 1).getMonth()] : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span >
          </div >
        </div >
        <div className={ classNames.header }>
          <div aria-live='polite' aria-relevant='text' aria-atomic='true' id={ monthAndYearId }>
            <div
              className={ classNames.monthAndYear }
              onClick={ headerToggleView ? this._onHeaderSelect : undefined }
              onKeyDown={ headerToggleView ? this._onHeaderKeyDown : undefined }
              aria-label={ headerToggleView ? formattedNavigateMonthAndYear : undefined }
              role={ headerToggleView ? 'button' : undefined }
              tabIndex={ headerToggleView ? 0 : undefined }
            >
              { formattedNavigateMonthAndYear }
            </div>
          </div>
        </div>
        <FocusZone>
          {
            showWeekNumbers ?
              <div className={ classNames.weekNumbers }>
                <table className={ classNames.table }>
                  <tbody>
                    { weekNumbers!.map((weekNumber, index) => {
                      return <tr key={ index }>
                        <CalendarDay
                          isSelectedWeek={ selectedDateWeekNumber === weekNumber }
                        >
                          <span>{ weekNumber }</span>
                        </CalendarDay>
                      </tr>;
                    }) }
                  </tbody>
                </table>
              </div>
              : null
          }
          <table
            className={ classNames.table }
            aria-readonly='true'
            aria-multiselectable='false'
            aria-labelledby={ monthAndYearId }
            aria-activedescendant={ activeDescendantId }
          >
            <thead>
              <tr>
                { strings.shortDays.map((val, index) =>
                  <th
                    className={ classNames.weekday }
                    role='grid'
                    scope='col'
                    key={ index }
                    title={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                    aria-label={ strings.days[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  >
                    { strings.shortDays[(index + firstDayOfWeek) % DAYS_IN_WEEK] }
                  </th>) }
              </tr>
            </thead>
            <tbody>
              { weeks!.map((week, weekIndex) =>
                <tr key={ weekIndex } role='row'>
                  { week.map((day, dayIndex) => {
                    const isNavigatedDate = compareDates(navigatedDate, day.originalDate);
                    return (
                      <CalendarDay
                        cornerType={ day.cornerType }
                        dateRangeType={ dateRangeType }
                        isInBounds={ day.isInBounds }
                        isToday={ day.isToday }
                        isSelected={ day.isSelected }
                        isInMonth={ day.isInMonth }
                        isNavigated={ isNavigatedDate }
                        ref={ isNavigatedDate ? this._resolveRef('_navigatedDay') : undefined }
                        onKeyDown={ this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) }
                        onClick={ day.isInBounds ? day.onSelected : undefined }
                        key={ day.key }
                        aria-label={ dateTimeFormatter.formatMonthDayYear(day.originalDate, strings) }
                        aria-selected={ day.isInBounds ? day.isSelected : undefined }
                        data-is-focusable={ day.isInBounds ? true : undefined }
                      >
                        <span aria-hidden='true'>{ dateTimeFormatter.formatDay(day.originalDate) }</span>
                      </CalendarDay>);
                    // return ;
                      /* className={ css(
                        {
                          ['ms-DatePicker-weekBackground ' + styles.weekBackground]: day.isSelected && dateRangeType === DateRangeType.Week,
                          ['ms-DatePicker-monthBackground ' + styles.monthBackground + ' ' + this._getHighlightedCornerStyle(weekCorners, dayIndex, weekIndex)]: day.isInMonth && day.isSelected && dateRangeType === DateRangeType.Month,
                          ['ms-DatePicker-dayBackground ' + styles.dayBackground]: day.isSelected && dateRangeType === DateRangeType.Day
                        }) }
                      >
                      <div
                        /* className={ css(
                          'ms-DatePicker-day',
                          styles.day,
                          {
                            ['ms-DatePicker-day--disabled ' + styles.dayIsDisabled]: !day.isInBounds,
                            ['ms-DatePicker-day--infocus ' + styles.dayIsFocused]: day.isInBounds && day.isInMonth,
                            ['ms-DatePicker-day--outfocus ' + styles.dayIsUnfocused]: day.isInBounds && !day.isInMonth,
                            ['ms-DatePicker-day--today ' + styles.dayIsToday]: day.isToday,
                            ['ms-DatePicker-day--highlighted ' + styles.dayIsHighlighted]: day.isSelected && dateRangeType === DateRangeType.Day
                          }) }

                        onKeyDown={ this._onDayKeyDown(day.originalDate, weekIndex, dayIndex) }
                        aria-label={ dateTimeFormatter.formatMonthDayYear(day.originalDate, strings) }
                        id={ isNavigatedDate ? activeDescendantId : undefined }
                        aria-selected={ day.isInBounds ? day.isSelected : undefined }
                        data-is-focusable={ day.isInBounds ? true : undefined }
                        ref={ isNavigatedDate ? 'navigatedDay' : undefined }
                        key={ isNavigatedDate ? 'navigatedDay' : undefined }
                      >
                        <span aria-hidden='true'>{ dateTimeFormatter.formatDay(day.originalDate) }</span>
                      </div>
                    </td>;
                  })*/ }) }
                </tr>
              ) }
            </tbody>
          </table>
        </FocusZone>
      </div >
    );
  }

  public focus() {
    if (this.refs.navigatedDay) {
      this._navigatedDay.tabIndex = 0;
      this._navigatedDay.focus();
    }
  }

  private _findCornerIndexes(week: IDayInfo[]): Array<number> {

    let cornerIndexes = [];

    for (let i = 0, length = week.length; i < length; i++) {
      let day = week[i];
      if (day.isInMonth) {
        cornerIndexes.push(i);
      }
    }

    if (cornerIndexes.length > 2) {
      cornerIndexes.splice(1, cornerIndexes.length - 2);
    }

    return cornerIndexes;
  }

  private _getWeekCornerTypes(
    weekIndex: number,
    cornerIndexes: Array<number>,
    singleCornerType: CornerType,
    leftCornerType: CornerType,
    rightCornerType: CornerType): Array<ICornerTypeInfo> {

    let corners = new Array<ICornerTypeInfo>();
    let cornersLength = cornerIndexes.length;

    if (cornersLength > 0) {

      if (cornersLength === 1) {
        corners.push({
          weekIndex: weekIndex,
          dayIndex: cornerIndexes[0],
          cornerType: singleCornerType
        });

      } else if (cornersLength === 2) {
        corners.push({
          weekIndex: weekIndex,
          dayIndex: cornerIndexes[0],
          cornerType: leftCornerType
        });
        corners.push({
          weekIndex: weekIndex,
          dayIndex: cornerIndexes[1],
          cornerType: rightCornerType
        });
      }
      if (weekIndex === 0) {
        // check if second week needs corner styles
        if (cornerIndexes[0] !== 0) {
          corners.push({
            weekIndex: 1,
            dayIndex: 0,
            cornerType: leftCornerType
          });
        }
      } else {
        // Assume we are on the last week. Check if second-to-last week needs corner styles
        const lastDayIndex = DAYS_IN_WEEK - 1;
        if (cornerIndexes[cornersLength - 1] !== lastDayIndex) {
          corners.push({
            weekIndex: weekIndex - 1,
            dayIndex: lastDayIndex,
            cornerType: rightCornerType
          });
        }
      }
    }

    return corners;
  }

  private _navigateMonthEdge(ev: React.KeyboardEvent<HTMLElement>, date: Date, weekIndex: number, dayIndex: number) {
    const { minDate, maxDate } = this.props;
    let targetDate: Date | undefined = undefined;

    if (weekIndex === 0 && ev.which === KeyCodes.up) {
      targetDate = addWeeks(date, -1);
    } else if (weekIndex === (this.state.weeks!.length - 1) && ev.which === KeyCodes.down) {
      targetDate = addWeeks(date, 1);
    } else if (dayIndex === 0 && ev.which === getRTLSafeKeyCode(KeyCodes.left)) {
      targetDate = addDays(date, -1);
    } else if (dayIndex === (DAYS_IN_WEEK - 1) && ev.which === getRTLSafeKeyCode(KeyCodes.right)) {
      targetDate = addDays(date, 1);
    }

    // Don't navigate to out-of-bounds date
    if (targetDate && (minDate ? compareDatePart(minDate, targetDate) < 1 : true) && (maxDate ? compareDatePart(targetDate, maxDate) < 1 : true)) {
      this.props.onNavigateDate(targetDate, true);
      ev.preventDefault();
    }
  }

  @autobind
  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  @autobind
  private _onDayKeyDown(originalDate: Date, weekIndex: number, dayIndex: number)
    : (ev: React.KeyboardEvent<HTMLElement>) => void {
    return (ev: React.KeyboardEvent<HTMLElement>): void => {
      this._navigateMonthEdge(ev, originalDate, weekIndex, dayIndex);
    };
  }

  @autobind
  private _onSelectDate(selectedDate: Date) {
    let { onSelectDate, dateRangeType, firstDayOfWeek, navigatedDate, autoNavigateOnSelection, minDate, maxDate } = this.props;

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (dateRangeType !== DateRangeType.Day) {
      dateRange = this._getBoundedDateRange(dateRange, minDate, maxDate);
    }

    if (onSelectDate) {
      onSelectDate(selectedDate, dateRange);
    }

    // Navigate to next or previous month if needed
    if (autoNavigateOnSelection && selectedDate.getMonth() !== navigatedDate.getMonth()) {
      let compareResult = compareDatePart(selectedDate, navigatedDate);
      if (compareResult < 0) {
        this._onSelectPrevMonth();
      } else if (compareResult > 0) {
        this._onSelectNextMonth();
      }
    }
  }

  @autobind
  private _onSelectNextMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, 1), false);
  }

  @autobind
  private _onSelectPrevMonth() {
    this.props.onNavigateDate(addMonths(this.props.navigatedDate, -1), false);
  }

  @autobind
  private _onHeaderSelect() {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
  }

  @autobind
  private _onHeaderKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    let { onHeaderSelect } = this.props;
    if (onHeaderSelect && (ev.which === KeyCodes.enter || ev.which === KeyCodes.space)) {
      onHeaderSelect(true);
    }
  }

  @autobind
  private _onPrevMonthKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectPrevMonth, ev);
  }

  @autobind
  private _onNextMonthKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectNextMonth, ev);
  }

  private _getWeeks(propsToUse: ICalendarDayPickerProps): IDayInfo[][] {
    let { navigatedDate, selectedDate, dateRangeType, firstDayOfWeek, today, minDate, maxDate, showSixWeeksByDefault } = propsToUse;
    let date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
    let todaysDate = today || new Date();
    let weeks: IDayInfo[][] = [];

    // Cycle the date backwards to get to the first day of the week.
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }

    // a flag to indicate whether all days of the week are in the month
    let isAllDaysOfWeekOutOfMonth = false;

    let selectedDates = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek);
    if (dateRangeType !== DateRangeType.Day) {
      selectedDates = this._getBoundedDateRange(selectedDates, minDate, maxDate);
    }

    let shouldGetWeeks = true;

    for (let weekIndex = 0; !isAllDaysOfWeekOutOfMonth; weekIndex++) {
      let week: IDayInfo[] = [];

      isAllDaysOfWeekOutOfMonth = true;

      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        let originalDate = new Date(date.toString());
        let dayInfo: IDayInfo = {
          key: date.toString(),
          date: date.getDate().toString(),
          originalDate: originalDate,
          isInMonth: date.getMonth() === navigatedDate.getMonth(),
          isToday: compareDates(todaysDate, date),
          isSelected: isInDateRangeArray(date, selectedDates),
          onSelected: this._onSelectDate.bind(this, originalDate),
          isInBounds: (minDate ? compareDatePart(minDate, date) < 1 : true) && (maxDate ? compareDatePart(date, maxDate) < 1 : true),
        };

        week.push(dayInfo);

        if (dayInfo.isInMonth) {
          isAllDaysOfWeekOutOfMonth = false;
        }

        date.setDate(date.getDate() + 1);
      }

      if (!isAllDaysOfWeekOutOfMonth) {
        weeks.push(week);
      }
    }

    // Determine corner types
    if (dateRangeType === DateRangeType.Month && selectedDate.getMonth() === navigatedDate.getMonth() && selectedDate.getFullYear() === navigatedDate.getFullYear()) {
      const numberOfWeeks = weeks.length;
      const indexesFirstWeek = this._findCornerIndexes(weeks[0]);
      const indexesLastWeek = this._findCornerIndexes(weeks[numberOfWeeks - 1]);
      const corners = [
        ...this._getWeekCornerTypes(0, indexesFirstWeek, CornerType.TopSingle, CornerType.TopLeft, CornerType.TopRight),
        ...this._getWeekCornerTypes(numberOfWeeks - 1, indexesLastWeek, CornerType.BottomSingle, CornerType.BottomLeft, CornerType.BottomRight)];

      for (let corner of corners) {
        weeks[corner.weekIndex][corner.dayIndex].cornerType = corner.cornerType;
      }
    }

    return weeks;
  }

  private _getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
    let boundedDateRange = [...dateRange];
    if (minDate) {
      boundedDateRange = boundedDateRange.filter((date) => compareDatePart(date, minDate as Date) >= 0);
    }
    if (maxDate) {
      boundedDateRange = boundedDateRange.filter((date) => compareDatePart(date, maxDate as Date) <= 0);
    }
    return boundedDateRange;
  }
}