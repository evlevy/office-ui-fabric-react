import * as React from 'react';
import { BaseComponent, getId, customizable, autobind } from '../../Utilities';
import { ICalendarDayProps, ICalendarDayStyles, ICalendarDayStyleProps, CornerType } from './CalendarDay.types';
import { DateRangeType } from '../../utilities/dateValues/DateValues';
import {
  addDays,
  addWeeks,
  addMonths,
  compareDates,
  compareDatePart,
  getDateRangeArray,
  isInDateRangeArray,
  getWeekNumber,
  getWeekNumbersInMonth,
  getMonthStart,
  getMonthEnd
} from '../../utilities/dateMath/DateMath';
import { classNamesFunction } from '../../Styling';

const getClassNames = classNamesFunction<ICalendarDayStyleProps, ICalendarDayStyles>();

@customizable('CalendarDay', ['getStyles', 'theme'])
export class CalendarDayBase extends BaseComponent<ICalendarDayProps, {}> {

  public constructor(props: ICalendarDayProps) {
    super(props);
  }

  public render() {
    const {
      theme,
      getStyles,
      className,
      children,
      cornerType,
      isInBounds,
      isInMonth,
      isSelected,
      isSelectedWeek,
      isNavigated,
      isToday,
      dateRangeType,
      onClick,
      onKeyDown } = this.props;

    // Background
    const isWeekBackgroud = isSelected && dateRangeType === DateRangeType.Week;
    const isMonthBackround = isInMonth && isSelected && dateRangeType === DateRangeType.Month;
    const isDayBackground = isSelected && dateRangeType === DateRangeType.Day;

    // State
    const isDisabled = !isInBounds;
    const isHighlighted = isSelected && dateRangeType === DateRangeType.Day;
    const isFocused = isInBounds && isInMonth;
    const isOutOfFocus = isInBounds && !isInMonth;

    // Corner
    const isTopCorner = !!cornerType && (cornerType === CornerType.TopLeft || cornerType === CornerType.TopRight || cornerType === CornerType.TopSingle);
    const isBottomCorner = !!cornerType && (cornerType === CornerType.BottomLeft || cornerType === CornerType.BottomRight || cornerType === CornerType.BottomSingle);
    const isLeftCorner = !!cornerType && (cornerType === CornerType.BottomLeft || cornerType === CornerType.TopLeft);
    const isRightCorner = !!cornerType && (cornerType === CornerType.BottomRight || cornerType === CornerType.TopRight);

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
        isBottomCorner: isBottomCorner,
        isTopCorner: isTopCorner,
        isLeftCorner: isLeftCorner,
        isRightCorner: isRightCorner,
        isDayBackground: isDayBackground!,
        isMonthBackground: isMonthBackround!,
        isWeekBackgroud: isWeekBackgroud!,
        isToday: isToday!
      });

    return (
      <td
        className={ classNames.background }
      >
        <div
          className={ classNames.day }
          role={ 'gridcell' }
          onClick={ !!onClick ? this._onClick : undefined }
          onKeyDown={ !!onKeyDown ? this._onKeyDown : undefined }
        >
          { children }
        </div>
      </td>
    );
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