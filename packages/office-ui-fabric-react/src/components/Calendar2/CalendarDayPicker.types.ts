/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { CalendarDayPickerBase } from './CalendarDayPicker.base';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { ITheme, IStyle, IStyleFunction } from '../../Styling';
import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { ICalendarDayProps, ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { IComponentAs } from '../../Utilities';

export interface ICalendarDayPicker {
  /**
   * Sets focus to the selected date.
   */
  focus: () => void;
}

export interface ICalendarDayPickerProps extends React.Props<CalendarDayPickerBase> {

  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<ICalendarDayPickerStyleProps, ICalendarDayPickerStyles>;

  /**
   * Allows the root to be reconfigured.
   */
  as?: string | ((props: any) => JSX.Element);

  dateAs: IComponentAs<ICalendarDayProps>;

  /**
   * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICalendarDayPicker) => void;

  strings: ICalendarStrings;
  selectedDate: Date;
  navigatedDate: Date;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onDismiss?: () => void;
  firstDayOfWeek: DayOfWeek;
  dateRangeType: DateRangeType;
  autoNavigateOnSelection: boolean;
  navigationIcons: ICalendarIconStrings;
  today?: Date;
  onHeaderSelect?: (focus: boolean) => void;
  showWeekNumbers?: boolean;
  firstWeekOfYear: FirstWeekOfYear;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  showSixWeeksByDefault?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isMonthPickerVisible: boolean;
  areCalendarsInline: boolean;
}

export interface ICalendarDayPickerStyleProps {
  theme: ITheme;
  showWeekNumbers: boolean;
  // isPickingYears: boolean <- this apparently is not set anywhere!
  isMonthPickerVisible: boolean;
  areCalendarsInline: boolean;
  headerToggleView: boolean;
  prevMonthInBounds: boolean;
  nextMonthInBounds: boolean;
}

export interface ICalendarDayPickerStyles {
  dayPicker: IStyle;
  monthComponents: IStyle;
  navContainer: IStyle;
  prevMonth: IStyle;
  nextMonth: IStyle;
  monthAndYear: IStyle;
  weekNumbers: IStyle;
  header: IStyle;
  table: IStyle;
  weekday: IStyle;
  weekIsHighlighted: IStyle;
}
