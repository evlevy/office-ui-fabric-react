import * as React from 'react';
import {
  autobind,
  BaseComponent,
  customizable,
  KeyCodes
} from '../../Utilities';
import { CalendarDay } from './CalendarDay';
import { CalendarDayPicker } from './CalendarDayPicker';
import { CalendarMonth } from './CalendarMonth';
import { CalendarMonthPicker } from './CalendarMonthPicker';
import { classNamesFunction } from '../../Styling';
import { compareDates, getDateRangeArray } from '../../utilities/dateMath/DateMath';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import {
  ICalendar,
  ICalendarFormatDateCallbacks,
  ICalendarIconStrings,
  ICalendarProps,
  ICalendarStrings,
  ICalendarStyleProps,
  ICalendarStyles
} from './Calendar.types';
import { ICalendarDayPicker } from './CalendarDayPicker.types';
import { ICalendarMonthPicker } from './CalendarMonthPicker.types';

const defaultIconStrings: ICalendarIconStrings = {
  leftNavigation: 'Up',
  rightNavigation: 'Down'
};

const defaultFormatDateCallbacks: ICalendarFormatDateCallbacks = {
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

const getClassNames = classNamesFunction<ICalendarStyleProps, ICalendarStyles>();

@customizable('Calendar', ['theme'])
export class CalendarBase extends BaseComponent<ICalendarProps, ICalendarState> implements ICalendar {

  public static defaultProps: ICalendarProps = {
    autoNavigateOnSelection: false,
    dateRangeType: DateRangeType.Day,
    dateTimeFormatter: defaultFormatDateCallbacks,
    firstDayOfWeek: DayOfWeek.Sunday,
    firstWeekOfYear: FirstWeekOfYear.FirstDay,
    highlightCurrentMonth: false,
    isDayPickerVisible: true,
    isMonthPickerVisible: true,
    navigationIcons: defaultIconStrings,
    showGoToToday: true,
    showMonthPickerAsOverlay: false,
    showSixWeeksByDefault: false,
    showWeekNumbers: false,
    strings: null,
    today: new Date(),
  };

  private _calendar: ICalendar;
  private _dayPicker: ICalendarDayPicker;
  private _monthPicker: ICalendarMonthPicker;
  private _focusOnUpdate: boolean;

  constructor(props: ICalendarProps) {
    super(props);

    const currentDate = props.value && !isNaN(props.value.getTime()) ? props.value : (props.today || new Date());

    this.state = {
      selectedDate: currentDate,
      navigatedDate: currentDate,

      /**
       * When showMonthPickerAsOverlay is active it overrides isMonthPickerVisible/isDayPickerVisible props
       * (These props permanently set the visibility of their respective calendars).
       */
      isMonthPickerVisible: this.props.showMonthPickerAsOverlay ? false : this.props.isMonthPickerVisible,
      isDayPickerVisible: this.props.showMonthPickerAsOverlay ? true : this.props.isDayPickerVisible
    };

    this._focusOnUpdate = false;
  }

  public componentWillReceiveProps(nextProps: ICalendarProps) {

    const { autoNavigateOnSelection, value, today = new Date() } = nextProps;

    /**
     * Make sure auto-navigation is supported for programmatic changes to selected date, i.e.,
     * if selected date is updated via props, we may need to modify the navigated date
     */
    const overrideNavigatedDate = (autoNavigateOnSelection && !compareDates(value!, this.props.value!));
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
      isDayPickerVisible,
      isMonthPickerVisible,
      navigatedDate,
      selectedDate } = this.state;

    const onHeaderSelect = showMonthPickerAsOverlay! ? this._onHeaderSelect : undefined;
    const arePickersInline = isMonthPickerVisible! && isDayPickerVisible!;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        arePickersInline: arePickersInline,
        isDayPickerVisible: isDayPickerVisible!,
        isMonthPickerVisible: isMonthPickerVisible!,
        isPickerOpened: true, // <-- always true?
        showGoToToday: showGoToToday!,
        showMonthPickerAsOverlay: showMonthPickerAsOverlay!
      });

    return (
      <div className={ classNames.root } ref={ this._resolveRef('_calendar') } role='application'>
        <div className={ classNames.picker }>
          <div className={ classNames.holder } onKeyDown={ this._onDatePickerPopupKeyDown }>
            <div className={ classNames.frame }>
              <div className={ classNames.wrap }>
                { isDayPickerVisible &&
                  <CalendarDayPicker
                    autoNavigateOnSelection={ autoNavigateOnSelection! }
                    componentRef={ this._resolveRef('_dayPicker') }
                    dateRangeType={ dateRangeType! }
                    dateTimeFormatter={ dateTimeFormatter! }
                    dayAs={ CalendarDay }
                    firstDayOfWeek={ firstDayOfWeek! }
                    firstWeekOfYear={ firstWeekOfYear! }
                    isInline={ arePickersInline }
                    isMonthPickerVisible={ isMonthPickerVisible! }
                    maxDate={ maxDate }
                    minDate={ minDate }
                    navigatedDate={ navigatedDate! }
                    navigationIcons={ navigationIcons! }
                    onDismiss={ onDismiss }
                    onHeaderSelect={ onHeaderSelect }
                    onNavigateDate={ this._onNavigateDate }
                    onSelectDate={ this._onSelectDate }
                    selectedDate={ selectedDate! }
                    showSixWeeksByDefault={ showSixWeeksByDefault }
                    showWeekNumbers={ showWeekNumbers! }
                    strings={ strings! }
                    today={ today }
                  />
                }
                { isMonthPickerVisible &&
                  <CalendarMonthPicker
                    areCalendarsInline={ arePickersInline }
                    componentRef={ this._resolveRef('_monthPicker') }
                    dateTimeFormatter={ dateTimeFormatter! }
                    highlightCurrentMonth={ highlightCurrentMonth! }
                    maxDate={ maxDate }
                    minDate={ minDate }
                    monthAs={ CalendarMonth }
                    navigatedDate={ navigatedDate! }
                    navigationIcons={ navigationIcons! }
                    onHeaderSelect={ onHeaderSelect }
                    onNavigateDate={ this._onNavigateDate }
                    strings={ strings! }
                    today={ today }
                  />
                }
                { showGoToToday &&
                  <span
                    className={ classNames.goToToday }
                    onClick={ this._onGotoToday }
                    onKeyDown={ this._onGotoTodayKeyDown }
                    role='button'
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

  public focus(): void {
    if (this._dayPicker) {
      this._dayPicker.focus();
    }
  }

  @autobind
  private _navigateDay(date: Date): void {
    this.setState({
      navigatedDate: date
    });
  }

  @autobind
  private _onNavigateDate(date: Date, focusOnNavigatedDay: boolean): void {

    if (this.props.isDayPickerVisible || (!this.props.isDayPickerVisible && !focusOnNavigatedDay)) {
      this._navigateDay(date);
      this._focusOnUpdate = focusOnNavigatedDay;
    } else {
      // if only the month picker is shown, select the chosen month
      this._onSelectDate(date);
    }
  }

  @autobind
  private _onSelectDate(date: Date, selectedDateRangeArray?: Date[]): void {
    const { onSelectDate } = this.props;

    this.setState({
      selectedDate: date
    });

    if (onSelectDate) {
      onSelectDate(date, selectedDateRangeArray);
    }
  }

  @autobind
  private _onHeaderSelect(focus: boolean): void {
    this.setState({
      isDayPickerVisible: !this.state.isDayPickerVisible,
      isMonthPickerVisible: !this.state.isMonthPickerVisible
    });

    if (focus) {
      this._focusOnUpdate = true;
    }
  }

  @autobind
  private _onGotoToday(): void {
    const { dateRangeType, firstDayOfWeek, today } = this.props;
    const dates = getDateRangeArray(today!, dateRangeType!, firstDayOfWeek!);

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
  private _onDatePickerPopupKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    switch (ev.which) {
      case KeyCodes.enter:
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
  private _handleEscKey(ev: React.KeyboardEvent<HTMLElement>): void {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }
}
