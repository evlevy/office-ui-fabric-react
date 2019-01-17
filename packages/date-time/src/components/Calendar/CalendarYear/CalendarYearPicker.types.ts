import {
  ICalendarPicker,
  ICalendarPickerProps,
  ICalendarPickerStyleProps,
  ICalendarPickerStyles
} from '../CalendarPicker/CalendarPicker.types';
import { IRefObject, IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';

export interface ICalendarYearPicker extends ICalendarPicker {}

export interface ICalendarYearPickerStyleProps extends ICalendarPickerStyleProps {}

export interface ICalendarYearPickerStyles extends ICalendarPickerStyles {}

export interface ICalendarYearPickerProps extends ICalendarPickerProps<number> {
  /**
   * Optional callback to access the ICalendarYear interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendarYearPicker>;

  /**
   * Customized styles for the calendar month component
   */
  styles?: IStyleFunctionOrObject<ICalendarYearPickerStyleProps, ICalendarYearPickerStyles>;
}
