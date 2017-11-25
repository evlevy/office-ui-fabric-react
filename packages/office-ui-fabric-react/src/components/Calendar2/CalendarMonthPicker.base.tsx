import * as React from 'react';
import {
  addYears,
  compareDatePart,
  getMonthEnd,
  getMonthStart,
  getYearEnd,
  getYearStart,
  setMonth
} from '../../utilities/dateMath/DateMath';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import { CalendarMonth } from './CalendarMonth';
import { classNamesFunction } from '../../Styling';
import { FocusZone } from '../../FocusZone';
import {
  ICalendarMonthPicker,
  ICalendarMonthPickerProps,
  ICalendarMonthPickerStyleProps,
  ICalendarMonthPickerStyles
} from './CalendarMonthPicker.types';
import { Icon } from '../../Icon';

const getClassNames = classNamesFunction<ICalendarMonthPickerStyleProps, ICalendarMonthPickerStyles>();

@customizable('CalendarMonthPicker', ['getStyles', 'theme'])
export class CalendarMonthPickerBase extends BaseComponent<ICalendarMonthPickerProps, {}> implements ICalendarMonthPicker {

  private _navigatedMonth: HTMLElement;

  private _selectMonthCallbacks: (() => void)[];

  public constructor(props: ICalendarMonthPickerProps) {
    super(props);

    this._selectMonthCallbacks = [];
    props.strings.shortMonths.map((month, index) => {
      this._selectMonthCallbacks[index] = this._onSelectMonth.bind(this, index);
    });

    this._isCurrentMonth = this._isCurrentMonth.bind(this);
    this._onSelectNextYear = this._onSelectNextYear.bind(this);
    this._onSelectPrevYear = this._onSelectPrevYear.bind(this);
    this._onSelectMonth = this._onSelectMonth.bind(this);
  }

  public render() {

    const {
      areCalendarsInline,
      className,
      dateTimeFormatter,
      getStyles,
      highlightCurrentMonth,
      maxDate,
      minDate,
      navigatedDate,
      navigationIcons,
      onHeaderSelect,
      strings,
      theme,
      today } = this.props;

    const leftNavigationIcon = navigationIcons.leftNavigation;
    const rightNavigationIcon = navigationIcons.rightNavigation;

    // determine if previous/next years are in bounds
    const isPrevYearInBounds = minDate ? compareDatePart(minDate, getYearStart(navigatedDate)) < 0 : true;
    const isNextYearInBounds = maxDate ? compareDatePart(getYearEnd(navigatedDate), maxDate) < 0 : true;

    const navigatedDateString = dateTimeFormatter.formatYear(navigatedDate);

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        isPrevYearDisabled: !isPrevYearInBounds,
        isNextYearDisabled: !isNextYearInBounds,
        headerToggleView: !!onHeaderSelect,
        areCalendarsInline: areCalendarsInline!
      });

    return (
      <div className={ classNames.root }>
        <div className={ classNames.yearComponents }>
          <div className={ classNames.navContainer }>
            <span
              className={ classNames.prevYear }
              onClick={ this._onSelectPrevYear }
              onKeyDown={ this._onSelectPrevYearKeyDown }
              aria-label={ strings.prevYearAriaLabel ? strings.prevYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, -1)) : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? rightNavigationIcon : leftNavigationIcon } />
            </span>
            <span
              className={ classNames.nextYear }
              onClick={ this._onSelectNextYear }
              onKeyDown={ this._onSelectNextYearKeyDown }
              aria-label={ strings.nextYearAriaLabel ? strings.nextYearAriaLabel + ' ' + dateTimeFormatter.formatYear(addYears(navigatedDate, 1)) : undefined }
              role='button'
              tabIndex={ 0 }
            >
              <Icon iconName={ getRTL() ? leftNavigationIcon : rightNavigationIcon } />
            </span>
          </div>
        </div>
        <div className={ classNames.header }>
          <div
            className={ classNames.currentYear }
            onClick={ !!onHeaderSelect ? this._onHeaderSelect : undefined }
            onKeyDown={ !!onHeaderSelect ? this._onHeaderKeyDown : undefined }
            aria-label={ !!onHeaderSelect ? navigatedDateString : undefined }
            role={ !!onHeaderSelect ? 'button' : undefined }
            tabIndex={ !!onHeaderSelect ? 0 : undefined }
          >
            { navigatedDateString }
          </div>
        </div>
        <FocusZone>
          <div
            className={ classNames.optionGrid }
            role='grid'
          >
            { strings.shortMonths.map((month, index) => {

              const indexedMonth = setMonth(navigatedDate, index);
              const isCurrentMonth = this._isCurrentMonth(index, navigatedDate.getFullYear(), today!);
              const isNavigatedMonth = navigatedDate.getMonth() === index;
              const isInBounds = (minDate ? compareDatePart(minDate, getMonthEnd(indexedMonth)) < 1 : true) &&
                (maxDate ? compareDatePart(getMonthStart(indexedMonth), maxDate) < 1 : true);

              return <CalendarMonth
                key={ index }
                onClick={ isInBounds ? this._selectMonthCallbacks[index] : undefined }
                aria-label={ dateTimeFormatter.formatMonthYear(indexedMonth, strings) }
                aria-selected={ isCurrentMonth || isNavigatedMonth }
                data-is-focusable={ isInBounds ? true : undefined }
                ref={ isNavigatedMonth ? this._resolveRef('_navigatedMonth') : undefined }
                highlightCurrent={ highlightCurrentMonth }
                isCurrent={ isCurrentMonth }
                isInBounds={ isInBounds }
                isNavigated={ isNavigatedMonth }
              >
                { month }
              </CalendarMonth>;
            }
            ) }
          </div>
        </FocusZone>
      </div>
    );
  }

  public focus() {
    if (this._navigatedMonth) {
      this._navigatedMonth.tabIndex = 0;
      this._navigatedMonth.focus();
    }
  }

  private _isCurrentMonth(month: number, year: number, today: Date) {
    return today.getFullYear() === year && today.getMonth() === month;
  }

  @autobind
  private _onKeyDown(callback: () => void, ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      callback();
    }
  }

  @autobind
  private _onSelectNextYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, 1), false);
  }

  @autobind
  private _onSelectNextYearKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectNextYear, ev);
  }

  @autobind
  private _onSelectPrevYear() {
    let { navigatedDate, onNavigateDate } = this.props;
    onNavigateDate(addYears(navigatedDate, -1), false);
  }

  @autobind
  private _onSelectPrevYearKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    this._onKeyDown(this._onSelectPrevYear, ev);
  }

  @autobind
  private _onSelectMonth(newMonth: number) {
    let { navigatedDate, onNavigateDate, onHeaderSelect } = this.props;

    // If header is clickable the calendars are overlayed, switch back to day picker when month is clicked
    if (onHeaderSelect) {
      onHeaderSelect(true);
    }
    onNavigateDate(setMonth(navigatedDate, newMonth), true);
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
}
