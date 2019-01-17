import * as React from 'react';
import { BaseComponent, classNamesFunction, css, getRTL, KeyCodes } from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import {
  ICalendarPicker,
  ICalendarPickerGridCellProps,
  ICalendarPickerProps,
  ICalendarPickerStyleProps,
  ICalendarPickerStyles,
  ICalendarPickerState
} from './CalendarPicker.types';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IProcessedStyleSet } from '@uifabric/styling';

const getClassNames = classNamesFunction<ICalendarPickerStyleProps, ICalendarPickerStyles>();

// tslint:disable-next-line: max-line-length
export abstract class CalendarPickerBase<P extends ICalendarPickerProps<T>, S extends ICalendarPickerState<T>, T>
  extends BaseComponent<P, S>
  implements ICalendarPicker {
  private _navigatedElement: HTMLButtonElement;
  private _focusOnUpdate: boolean;

  public componentDidUpdate(): void {
    if (this._focusOnUpdate) {
      this.focus();
      this._focusOnUpdate = false;
    }
  }

  public render(): JSX.Element {
    const { theme, styles, className } = this.props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      className: className
    });

    return (
      <div className={classNames.root}>
        {this._renderHeader(classNames)}
        {this._renderGrid(classNames)}
      </div>
    );
  }

  public focus = () => this._navigatedElement!.focus();

  protected constructor(props: P) {
    super(props);
  }

  protected /* abstract */ isPreviousItemInBounds = (item: T): boolean => true;
  protected /* abstract */ isNextItemInBounds = (item: T): boolean => true;
  protected /* abstract */ formatItem = (item: T): string => `${item}`;
  protected /* abstract */ getGridItems = (): ICalendarPickerGridCellProps[][] => [];
  protected /* abstract */ getPreviousItem = (item: T): T => item;
  protected /* abstract */ getNextItem = (item: T): T => item;

  // private _setNavigatedElementRef = (element: HTMLButtonElement) => (this._navigatedElement = element);

  private _renderHeader = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    return (
      <div className={classNames.headerContainer}>
        {this._renderTitle(classNames)}
        {this._renderNavigation(classNames)}
      </div>
    );
  };

  private _renderTitle = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    const formattedItem = this.formatItem!(this._getCurrentNavigatedItem());

    return (
      <button
        className={classNames.currentItemButton}
        onClick={this._onHeaderTitleSelect}
        onKeyDown={this._onHeaderTitleKeyDown}
        aria-label={formattedItem}
      >
        {formattedItem}
      </button>
    );
  };

  private _renderNavigation = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    return (
      <div className={classNames.navigationButtonsContainer}>
        {this._renderPreviousNavigationButton(classNames)}
        {this._renderNextNavigationButton(classNames)}
      </div>
    );
  };

  private _renderPreviousNavigationButton = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    const { navigationIcons, navigatedItem, previousNavigationAriaLabel } = this.props;
    const { leftNavigation /* up */, rightNavigation /* down */ } = navigationIcons!;

    return this._renderNavigationButton(classNames, {
      iconName: getRTL() ? rightNavigation : leftNavigation,
      isInBounds: this.isPreviousItemInBounds!(navigatedItem!),
      onClick: this._onNavigatePrevious,
      ariaLabel: previousNavigationAriaLabel
    });
  };

  private _renderNextNavigationButton = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    const { navigationIcons, navigatedItem, nextNavigationAriaLabel } = this.props;
    const { leftNavigation /* up */, rightNavigation /* down */ } = navigationIcons!;

    return this._renderNavigationButton(classNames, {
      iconName: getRTL() ? leftNavigation : rightNavigation,
      isInBounds: this.isNextItemInBounds!(navigatedItem!),
      onClick: this._onNavigateNext,
      ariaLabel: nextNavigationAriaLabel
    });
  };

  private _renderNavigationButton = (
    classNames: IProcessedStyleSet<ICalendarPickerStyles>,
    navigationButtonProps: { iconName?: string; isInBounds: boolean; onClick: () => void; ariaLabel?: string }
  ): JSX.Element => {
    const { iconName, isInBounds, onClick, ariaLabel } = navigationButtonProps;

    return (
      <button
        className={css(classNames.navigationButton, {
          [classNames.disabled]: !isInBounds
        })}
        onClick={isInBounds ? onClick : undefined}
        disabled={!isInBounds}
        aria-label={`${ariaLabel}`}
      >
        <Icon iconName={iconName} />
      </button>
    );
  };

  private _renderGrid = (classNames: IProcessedStyleSet<ICalendarPickerStyles>): JSX.Element => {
    return (
      <FocusZone>
        <div className={classNames.gridContainer} role="grid" />
      </FocusZone>
    );
  };

  private _onNavigatePrevious = (): void => {
    const newNavigatedItem = this.getPreviousItem(this._getCurrentNavigatedItem());
    this.setState({ navigated: newNavigatedItem } as S);
  };

  private _onNavigateNext = (): void => {
    const newNavigatedItem = this.getNextItem(this._getCurrentNavigatedItem());
    this.setState({ navigated: newNavigatedItem } as S);
  };

  private _onHeaderTitleSelect = () => {
    const { onHeaderTitleSelect } = this.props;
    onHeaderTitleSelect && onHeaderTitleSelect(true);
  };

  private _onHeaderTitleKeyDown = (ev: React.KeyboardEvent<HTMLElement>) => {
    if (ev.which === KeyCodes.enter || ev.which === KeyCodes.space) {
      this._onHeaderTitleSelect();
    }
  };

  private _getCurrentNavigatedItem = () => {
    const { navigatedItem } = this.props;
    const { navigated } = this.state;
    return navigated ? navigated! : navigatedItem!;
  };
}
