import { ICalendarStrings, ICalendarIconStrings, ICalendarFormatDateCallbacks } from './Calendar.types';
import { CalendarMonthPickerBase } from './CalendarMonthPicker.base';
import { ICalendarMonthProps } from './CalendarMonth.types';
import { ITheme, IStyle, IStyleFunction } from '../../Styling';
import { IComponentAs } from '../../Utilities';

export interface ICalendarMonthPicker {
  /**
   * Sets focus to the selected date.
   */
  focus: () => void;
}
export interface ICalendarMonthPickerProps extends React.Props<CalendarMonthPickerBase> {
  componentRef?: (component: ICalendarMonthPicker) => void;
  navigatedDate: Date;
  strings: ICalendarStrings;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  today?: Date;
  highlightCurrentMonth: boolean;
  onHeaderSelect?: (focus: boolean) => void;
  navigationIcons: ICalendarIconStrings;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  minDate?: Date;
  maxDate?: Date;
  theme?: ITheme;
  getStyles?: IStyleFunction<ICalendarMonthPickerStyleProps, ICalendarMonthPickerStyles>;
  className?: string;
  monthAs: IComponentAs<ICalendarMonthProps>;
  areCalendarsInline?: boolean;
}

export interface ICalendarMonthPickerStyleProps {
  theme: ITheme;
  className?: string;
  areCalendarsInline: boolean;
  headerToggleView: boolean;
  isNextYearDisabled: boolean;
  isPrevYearDisabled: boolean;
}

export interface ICalendarMonthPickerStyles {
  root: IStyle;
  yearComponents: IStyle;
  navContainer: IStyle;
  prevYear: IStyle;
  nextYear: IStyle;
  header: IStyle;
  currentYear: IStyle;
  optionGrid: IStyle;
}