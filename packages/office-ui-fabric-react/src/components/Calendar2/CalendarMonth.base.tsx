import * as React from 'react';
import { autobind, BaseComponent, customizable } from '../../Utilities';
import { classNamesFunction } from '../../Styling';
import { ICalendarMonthProps, ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';

const getClassNames = classNamesFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>();

@customizable('CalendarMonth', ['getStyles', 'theme'])
export class CalendarMonthBase extends BaseComponent<ICalendarMonthProps, {}> {

  public constructor(props: ICalendarMonthProps) {
    super(props);
  }

  public render() {
    const {
      children,
      className,
      getStyles,
      highlightCurrent,
      isCurrent,
      isInBounds,
      isNavigated,
      onClick,
      onKeyDown,
      theme } = this.props;

    const classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        className: className,
        isDisabled: !isInBounds,
        isHighlighted: highlightCurrent && isNavigated!,
        isCurrent: highlightCurrent && isCurrent!
      });

    return (
      <span
        role={ 'gridcell' }
        className={ classNames.root }
        onClick={ !!onClick ? this._onClick : undefined }
        onKeyDown={ !!onKeyDown ? this._onKeyDown : undefined }
      >
        { children }
      </span>);
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