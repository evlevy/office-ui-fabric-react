import * as React from 'react';
import {
  ICalendar,
  ICalendarProps,
  ICalendarStrings,
  ICalendarIconStrings,
  ICalendarFormatDateCallbacks,
  ICalendarStyles,
  ICalendarStyleProps
} from './Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { CalendarDayPicker } from './CalendarDayPicker';
import { CalendarDayPickerBase } from './CalendarDayPicker.base';
import { CalendarDay } from './CalendarDay';
import { CalendarMonth } from './CalendarMonth';
import { compareDates, getDateRangeArray } from '../../utilities/dateMath/DateMath';
import {
  autobind,
  BaseComponent,
  KeyCodes,
  customizable
} from '../../Utilities';
import {
  classNamesFunction
} from '../../Styling';

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

let iconStrings: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down'
};

let dateTimeFormatterCallbacks: ICalendarFormatDateCallbacks = {
  formatMonthDayYear: (date: Date, strings: ICalendarStrings) => (strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()),
  formatMonthYear: (date: Date, strings: ICalendarStrings) => (strings.months[date.getMonth()] + ' ' + date.getFullYear()),
  formatDay: (date: Date) => date.getDate().toString(),
  formatYear: (date: Date) => date.getFullYear().toString()
};

export interface ICalendarState {
  /**
   *  The currently focused date in the calendar, but not necessarily selected
   */
  navigatedDate?: Date;

  /**
   *  The currently selected date in the calendar
   */
  selectedDate?: Date;

  /**
   *  State used to show/hide month picker
   */
  isMonthPickerVisible?: boolean;

  /**
   *  State used to show/hide day picker
   */
  isDayPickerVisible?: boolean;
}

@customizable('Calendar', ['theme'])
export class CalendarBase extends BaseComponent<ICalendarProps, ICalendarState> implements ICalendar {

  public static defaultProps: ICalendarProps = {
    autoNavigateOnSelection: false,
    dateRangeType: DateRangeType.Day,
    dateTimeFormatter: dateTimeFormatterCallbacks,
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    highlightCurrentMonth: false,
    isDayPickerVisible: true,
    isMonthPickerVisible: true,
    navigationIcons: iconStrings,
    onDismiss: undefined,
    onSelectDate: undefined,
    showGoToToday: true,
    showMonthPickerAsOverlay: false,
    showSixWeeksByDefault: false,
    showWeekNumbers: false,
    strings: null,
    today: new Date(),
    value: undefined
  };

  private _calendar: HTMLElement;
  private _dayPicker: CalendarDayPickerBase;
  private _monthPicker: CalendarMonth;
  private _focusOnUpdate: boolean;

  constructor(props: ICalendarProps) {
    super(props);
    let currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : (props.today || new Date());

    this.state = {
      selectedDate: currentDate,
      navigatedDate: currentDate,

      /** When showMonthPickerAsOverlay is active it overrides isMonthPickerVisible/isDayPickerVisible props (These props permanently set the visibility of their respective calendars). */
      isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
      isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible
    };

    this._focusOnUpdate = false;
  }

  public componentWillReceiveProps(nextProps: ICalendarProps) {
    let { autoNavigateOnSelection, value, today = new Date() } = nextProps;

    // Make sure auto-navigation is supported for programmatic changes to selected date, i.e.,
    // if selected date is updated via props, we may need to modify the navigated date
    let overrideNavigatedDate = (autoNavigateOnSelection && !compareDates(value!, this.props.value!));
    if (overrideNavigatedDate) {
      this.setState({
        navigatedDate: value
      });
    }

    this.setState({
      selectedDate: value || today
    });
  }

  public componentDidUpdate() {
    if (this._focusOnUpdate) {
      // if the day picker is shown, focus on it
      if (this._dayPicker) {
        this._dayPicker.focus();
      } else if (this._monthPicker) {
        this._monthPicker.focus();
      }
      this._focusOnUpdate = false;
    }
  }

  public render() {
    const {
      autoNavigateOnSelection,
      className,
      dateRangeType,
      dateTimeFormatter,
      firstDayOfWeek,
      firstWeekOfYear,
      getDayStyles,
      getStyles,
      highlightCurrentMonth,
      maxDate,
      minDate,
      navigationIcons,
      onDismiss,
      showGoToToday,
      showMonthPickerAsOverlay,
      showSixWeeksByDefault,
      showWeekNumbers,
      strings,
      theme,
      today } = this.props;
    const {
      selectedDate,
      navigatedDate,
      isMonthPickerVisible,
      isDayPickerVisible } = this.state;
    const onHeaderSelect = showMonthPickerAsOverlay ? this._onHeaderSelect : undefined;
    const areCalendarsInline = isMonthPickerVisible! && isDayPickerVisible!;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        isPickerOpened: true,
        isMonthPickerVisible: isMonthPickerVisible!,
        isDayPickerVisible: isDayPickerVisible!,
        showGoToToday: showGoToToday!,
        showMonthPickerAsOverlay: showMonthPickerAsOverlay!,
        areCalendarsInline: areCalendarsInline
      });

    return (
      <div className={ classNames.root } ref={ this._resolveRef('_calendar') } role='application'>
        <div className={ classNames.picker }>
          <div className={ classNames.holder } onKeyDown={ this._onDatePickerPopupKeyDown }>
            <div className={ classNames.frame }>
              <div className={ classNames.wrap }>
                { isDayPickerVisible &&
                  <CalendarDayPicker
                    dateAs={ CalendarDay }
                    areCalendarsInline={ areCalendarsInline }
                    selectedDate={ selectedDate! }
                    navigatedDate={ navigatedDate! }
                    today={ today }
                    onSelectDate={ this._onSelectDate }
                    onNavigateDate={ this._onNavigateDate }
                    onDismiss={ onDismiss }
                    firstDayOfWeek={ firstDayOfWeek! }
                    dateRangeType={ dateRangeType! }
                    autoNavigateOnSelection={ autoNavigateOnSelection! }
                    strings={ strings! }
                    onHeaderSelect={ onHeaderSelect }
                    navigationIcons={ navigationIcons! }
                    showWeekNumbers={ showWeekNumbers! }
                    firstWeekOfYear={ firstWeekOfYear! }
                    dateTimeFormatter={ dateTimeFormatter! }
                    minDate={ minDate }
                    maxDate={ maxDate }
                    isMonthPickerVisible={ isMonthPickerVisible! }
                    showSixWeeksByDefault={ showSixWeeksByDefault }
                    ref={ this._resolveRef('_dayPicker') }
                  />
                }

                { isMonthPickerVisible && <CalendarMonth
                  navigatedDate={ navigatedDate! }
                  strings={ strings! }
                  onNavigateDate={ this._onNavigateDate }
                  today={ today }
                  highlightCurrentMonth={ highlightCurrentMonth! }
                  onHeaderSelect={ onHeaderSelect }
                  navigationIcons={ navigationIcons! }
                  dateTimeFormatter={ dateTimeFormatter! }
                  minDate={ minDate }
                  maxDate={ maxDate }
                  ref={ this._resolveRef('_monthPicker') }
                /> }

                { showGoToToday &&
                  <span
                    role='button'
                    className={ classNames.goToToday }
                    onClick={ this._onGotoToday }
                    onKeyDown={ this._onGotoTodayKeyDown }
                    tabIndex={ 0 }
                  >
                    { strings!.goToToday }
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public focus() {
    if (this._dayPicker) {
      this._dayPicker.focus();
    }
  }

  @autobind
  private _navigateDay(date: Date) {
    this.setState({
      navigatedDate: date
    });
  }

  @autobind
  private _onNavigateDate(date: Date, focusOnNavigatedDay: boolean) {

    if (this.props.isDayPickerVisible || (!this.props.isDayPickerVisible && !focusOnNavigatedDay)) {
      this._navigateDay(date);
      this._focusOnUpdate = focusOnNavigatedDay;
    } else {
      // if only the month picker is shown, select the chosen month
      this._onSelectDate(date);
    }
  }

  @autobind
  private _onSelectDate(date: Date, selectedDateRangeArray?: Date[]) {
    let { onSelectDate } = this.props;

    this.setState({
      selectedDate: date
    });

    if (onSelectDate) {
      onSelectDate(date, selectedDateRangeArray);
    }
  }

  @autobind
  private _onHeaderSelect(focus: boolean) {
    this.setState({
      isDayPickerVisible: !this.state.isDayPickerVisible,
      isMonthPickerVisible: !this.state.isMonthPickerVisible
    });

    if (focus) {
      this._focusOnUpdate = true;
    }
  }

  @autobind
  private _onGotoToday() {
    let { dateRangeType, firstDayOfWeek, today } = this.props;
    let dates = getDateRangeArray(today!, dateRangeType!, firstDayOfWeek!);
    this._onSelectDate(today!, dates);
  }

  @autobind
  private _onGotoTodayKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      ev.preventDefault();
      this._onGotoToday();
    } else if (ev.which === KeyCodes.tab && !ev.shiftKey) {
      if (this.props.onDismiss) {
        ev.stopPropagation();
        ev.preventDefault();
        this.props.onDismiss();
      }
    }
  }

  @autobind
  private _onDatePickerPopupKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.enter:
        ev.preventDefault();
        break;

      case KeyCodes.backspace:
        ev.preventDefault();
        break;

      case KeyCodes.escape:
        this._handleEscKey(ev);
        break;

      default:
        break;
    }
  }

  @autobind
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>) {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }
}
