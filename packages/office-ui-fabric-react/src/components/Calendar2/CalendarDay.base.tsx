import * as React from 'react';
import { autobind, BaseComponent, customizable } from '../../Utilities';
import {
  CalendarDayCornerType,
  ICalendarDayProps,
  ICalendarDayStyleProps,
  ICalendarDayStyles
} from './CalendarDay.types';
import { classNamesFunction } from '../../Styling';
import { DateRangeType } from '../../utilities/dateValues/DateValues';

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

@customizable('CalendarDay', ['getStyles', 'theme'])
export class CalendarDayBase extends BaseComponent<ICalendarDayProps, {}> {

  public constructor(props: ICalendarDayProps) {
    super(props);
  }

  public render() {
    const {
      children,
      className,
      cornerType,
      dateRangeType,
      getStyles,
      isInBounds,
      isInMonth,
      isNavigated,
      isSelected,
      isSelectedWeek,
      isToday,
      onClick,
      onKeyDown,
      theme } = this.props;

    // Background
    const isWeekBackgroud = isSelected && dateRangeType === DateRangeType.Week;
    const isMonthBackround = isInMonth && isSelected && dateRangeType === DateRangeType.Month;
    const isDayBackground = isSelected && dateRangeType === DateRangeType.Day;

    // State
    const isDisabled = !isInBounds;
    const isHighlighted = isSelected && dateRangeType === DateRangeType.Day;
    const isFocused = isInBounds && isInMonth;
    const isOutOfFocus = isInBounds && !isInMonth;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        isDisabled: isDisabled,
        isFocused: isFocused!,
        isOutOfFocus: isOutOfFocus!,
        isHighlighted: isHighlighted!,
        isWeekHighlighted: isSelectedWeek!,
        isDayBackground: isDayBackground!,
        isMonthBackground: isMonthBackround!,
        isWeekBackground: isWeekBackgroud!,
        isToday: isToday!,
        cornerType: cornerType || CalendarDayCornerType.None
      });

    return (
      < td className={ classNames.root } >
        <div
          className={ classNames.day }
          role={ 'gridcell' }
          onClick={ !!onClick ? this._onClick : undefined }
          onKeyDown={ !!onKeyDown ? this._onKeyDown : undefined }
          aria-selected={ isInBounds ? isSelected : undefined }
          data-is-focusable={ isInBounds ? true : undefined }
        >
          { children }
        </div>
      </td >);
  }

  @autobind
  private _onClick(ev?: React.MouseEvent<HTMLElement>) {
    if (this.props.onClick) {
      this.props.onClick(ev);
    }
  }

  @autobind
  private _onKeyDown(ev?: React.KeyboardEvent<HTMLElement>) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
    }
  }
}