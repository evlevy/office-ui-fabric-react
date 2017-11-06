/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { CalendarDayBase } from './CalendarDay.base';
import { DateRangeType } from './Calendar.types';
import { ITheme, IStyle, IStyleFunction } from '../../Styling';

export enum CornerType {
  'TopLeft' = 1,
  'TopSingle' = 2,
  'TopRight' = 3,
  'BottomLeft' = 4,
  'BottomSingle' = 5,
  'BottomRight' = 6
}

export interface ICalendarDayProps extends React.Props<CalendarDayBase> {

  /**
   * Allows the root to be reconfigured.
   */
  as?: string;

  theme?: ITheme;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  getStyles?: IStyleFunction<ICalendarDayStyleProps, ICalendarDayStyles>;

  componentRef?: () => void;

  className?: string;

  isInMonth?: boolean;

  isToday?: boolean;

  isSelected?: boolean;

  isSelectedWeek?: boolean;

  isNavigated?: boolean;

  isInBounds?: boolean;

  onClick?: (ev?: React.MouseEvent<HTMLElement>) => void;

  onKeyDown?: (ev?: React.KeyboardEvent<HTMLElement>) => void;

  cornerType?: CornerType;

  dateRangeType?: DateRangeType;
}

export interface ICalendarDayStyleProps {
  theme: ITheme;
  className?: string;
  isHighlighted: boolean;
  isWeekHighlighted: boolean;
  isDisabled: boolean;
  isFocused: boolean;
  isOutOfFocus: boolean;
  isToday: boolean;
  isWeekBackgroud: boolean;
  isMonthBackground: boolean;
  isDayBackground: boolean;
  isTopCorner: boolean;
  isBottomCorner: boolean;
  isLeftCorner: boolean;
  isRightCorner: boolean;
}

export interface ICalendarDayStyles {
  background: IStyle;
  day: IStyle;
}
