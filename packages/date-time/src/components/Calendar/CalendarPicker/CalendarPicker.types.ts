import { IBaseProps, IStyleFunctionOrObject } from '@uifabric/utilities';
import { ICalendarFormatDateCallbacks, ICalendarIconStrings, ICalendarStrings } from '../Calendar.types';
import { IStyle, ITheme } from '@uifabric/styling';

export interface ICalendarPicker {
  focus(): void;
}

export interface ICalendarPickerState<T> {
  navigated?: T;
}

export interface ICalendarPickerProps<T> extends IBaseProps<ICalendarPicker> {
  styles?: IStyleFunctionOrObject<ICalendarPickerStyleProps, ICalendarPickerStyles>;
  theme?: ITheme;
  className?: string;
  strings?: ICalendarStrings;
  navigationIcons?: ICalendarIconStrings;
  now?: T;
  navigatedItem?: T;
  selectedItem?: T;
  minimum?: T;
  maximum?: T;
  itemFormatter?: ICalendarFormatDateCallbacks;
  previousNavigationAriaLabel?: string;
  nextNavigationAriaLabel?: string;
  highlightCurrent?: boolean;
  highlightSelected?: boolean;
  allFocusable?: boolean;
  onHeaderTitleSelect?: (focus: boolean) => void;
}

export interface ICalendarPickerGridCellProps {
  key: string;
  label: string;
  // originalItem: T;
  isInNavigatedContext: boolean; // context: month, decade, week, etc...
  isNow: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected?: () => void;
}

export interface ICalendarPickerStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * Whether the header can be clicked
   */
  hasHeaderClickCallback?: boolean;

  /**
   * Whether the picker should highlight the current item
   */
  highlightCurrent?: boolean;

  /**
   * Whether the picker should highlight the selected item
   */
  highlightSelected?: boolean;
}

export interface ICalendarPickerStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  headerContainer: IStyle;

  currentItemButton: IStyle;

  navigationButtonsContainer: IStyle;

  navigationButton: IStyle;

  gridContainer: IStyle;

  itemButton: IStyle;

  current: IStyle;

  selected: IStyle;

  disabled: IStyle;
}
