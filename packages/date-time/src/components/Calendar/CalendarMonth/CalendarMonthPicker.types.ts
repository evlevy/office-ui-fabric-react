import {
  ICalendarPicker,
  ICalendarPickerProps,
  ICalendarPickerStyleProps,
  ICalendarPickerStyles
} from '../CalendarPicker/CalendarPicker.types';
import { IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface ICalendarMonthPicker extends ICalendarPicker {}

export interface ICalendarMonthPickerProps extends ICalendarPickerProps<Date> {
  /**
   * Optional callback to access the ICalendarMonth interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendarMonthPicker>;

  styles?: IStyleFunctionOrObject<ICalendarMonthPickerStyleProps, ICalendarMonthPickerStyles>;

  yearPickerHidden?: boolean;
}

export interface ICalendarMonthPickerStyleProps extends ICalendarPickerStyleProps {}

export interface ICalendarMonthPickerStyles extends ICalendarPickerStyles {}
