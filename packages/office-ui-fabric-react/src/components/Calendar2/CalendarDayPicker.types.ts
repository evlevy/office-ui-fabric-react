import * as React from 'react';
import { CalendarDayPickerBase } from './CalendarDayPicker.base';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { ICalendarDayProps } from './CalendarDay.types';
import { ICalendarFormatDateCallbacks, ICalendarIconStrings, ICalendarStrings } from './Calendar.types';
import { IComponentAs } from '../../Utilities';
import { IStyle, IStyleFunction, ITheme } from '../../Styling';

export interface ICalendarDayPicker {
  focus: () => void;
}

export interface ICalendarDayPickerProps extends React.Props<CalendarDayPickerBase> {
  as?: string | ((props: any) => JSX.Element);
  autoNavigateOnSelection: boolean;
  componentRef?: (component: ICalendarDayPicker) => void;
  dateRangeType: DateRangeType;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  dayAs: IComponentAs<ICalendarDayProps>;
  firstDayOfWeek: DayOfWeek;
  firstWeekOfYear: FirstWeekOfYear;
  getStyles?: IStyleFunction<ICalendarDayPickerStyleProps, ICalendarDayPickerStyles>;
  isInline: boolean;
  isMonthPickerVisible: boolean;
  maxDate?: Date;
  minDate?: Date;
  navigatedDate: Date;
  navigationIcons: ICalendarIconStrings;
  onDismiss?: () => void;
  onHeaderSelect?: (focus: boolean) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  selectedDate: Date;
  showSixWeeksByDefault?: boolean;
  showWeekNumbers?: boolean;
  strings: ICalendarStrings;
  theme?: ITheme;
  today?: Date;
  className?: string;
}

export interface ICalendarDayPickerStyleProps {
  theme: ITheme;
  className: string;
  headerToggleView: boolean;
  isInline: boolean;
  isMonthPickerVisible: boolean;
  nextMonthInBounds: boolean;
  prevMonthInBounds: boolean;
  showWeekNumbers: boolean;
}

export interface ICalendarDayPickerStyles {
  root: IStyle;
  header: IStyle;
  monthAndYear: IStyle;
  monthComponents: IStyle;
  navContainer: IStyle;
  nextMonth: IStyle;
  prevMonth: IStyle;
  selectedWeekNumber: IStyle;
  table: IStyle;
  weekIsHighlighted: IStyle;
  weekNumber: IStyle;
  weekNumbers: IStyle;
  weekday: IStyle;
}
