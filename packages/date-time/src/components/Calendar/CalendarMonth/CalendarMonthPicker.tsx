import { CalendarMonthPickerBase } from './CalendarMonthPicker.base';
import { getStyles } from './CalendarMonth.styles';
import { ICalendarMonthPickerProps, ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';
import { styled } from 'office-ui-fabric-react/lib/Utilities';

/**
 * CalendarMonth description
 */
export const CalendarMonthPicker: (props: ICalendarMonthPickerProps) => JSX.Element = styled<
  ICalendarMonthPickerProps,
  ICalendarMonthStyleProps,
  ICalendarMonthStyles
>(CalendarMonthPickerBase, getStyles, undefined, { scope: 'CalendarMonthPicker' });
