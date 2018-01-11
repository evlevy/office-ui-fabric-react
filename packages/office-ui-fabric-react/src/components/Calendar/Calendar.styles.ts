import {
  AnimationStyles,
  FontSizes,
  FontWeights,
  getFocusStyle,
  HighContrastSelector,
  IconFontSizes,
  IStyle,
  ITheme,
  ScreenWidthMinMedium,
} from '../../Styling';
import { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';

export const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

export enum NavigatorDirection { 'Previous' = 1, 'Next' = 2 }

export const getStyles = (props: ICalendarStyleProps): ICalendarStyles => {

  const {
    theme,
    className,
    isMonthPickerVisible,
    isDayPickerVisible,
    showMonthPickerAsOverlay,
    showGoToToday } = props;

  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
  const calendarsInline = isMonthPickerVisible && isDayPickerVisible;
  const { fonts, palette } = theme;

  return {
    root: [
      'ms-DatePicker',
      className,
      {
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: 0,
        padding: 0
      }
    ],

    picker: [
      'ms-DatePicker-picker',
      'ms-DatePicker-picker--opened',
      'ms-DatePicker-picker--focused',
      fonts.medium,
      {
        color: palette.black,
        position: 'relative',
        textAlign: 'left',
      },
      calendarsInline && 'ms-DatePicker-calendarsInline',
      isMonthPickerVisible && 'ms-DatePicker-picker--monthPickerVisible',
      monthPickerOnly && 'ms-DatePicker-monthPickerOnly',
      showMonthPickerAsOverlay && 'ms-DatePicker-monthPickerAsOverlay'
    ],

    holder: [
      'ms-DatePicker-holder',
      AnimationStyles.slideDownIn10,
      {
        // -webkit-overflow-scrolling: touch;
        boxSizing: 'border-box',
        display: 'block',
        width: 300,
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            width: calendarsInline ? 440 : 212,
            height: 'auto'
          }
        }
      }
    ],

    frame: [
      'ms-DatePicker-frame',
      {
        padding: 1,
        position: 'relative'
      }
    ],

    wrap: [
      'ms-DatePicker-wrap',
      {
        margin: -1,
        padding: 9,
        display: 'flex',
      },
      showGoToToday && {
        marginBottom: 30
      },
      {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            padding: '9px 8px'
          }
        }
      },
      isMonthPickerVisible && showGoToToday && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            marginBottom: 0
          }
        }
      },
      calendarsInline && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            padding: '9px 12px'
          }
        }
      },
      monthPickerOnly && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            padding: 10
          }
        }
      },
      showMonthPickerAsOverlay && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    ],

    goToday: [
      'ms-DatePicker-goToday',
      'js-goToday',
      fonts.small,
      getFocusStyle(theme, 0, 'absolute', palette.neutralSecondary, 'transparent'),
      {
        bottom: 9,
        color: palette.neutralPrimary,
        height: 30,
        lineHeight: 30,
        padding: '0 10px',
        position: 'absolute',
        right: 13,
        width: 'auto',
        selectors: {
          ':hover': {
            color: palette.themePrimary,
            cursor: 'pointer'
          },
          ':active': {
            color: palette.themeDark
          },
          [MS_LARGESCREEN_ACTIVE]: {
            padding: '0 3px'
          }
        }
      },
      isMonthPickerVisible && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            boxSizing: 'border-box',
            height: 28,
            lineHeight: 28,
            padding: '0 10px',
            right: 8,
            textAlign: 'right',
            top: 199
          }
        }
      },
      calendarsInline && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            padding: '0 10px',
            right: 13
          }
        }
      }
    ]
  };
};

/**
 * Helper function to get styles for hight and lineHeight. Adjusts for large screen.
 * @param height Value for hight and lineHeight. Default: 40px
 * @param largeScreenHeight Value for hight and lineHeight on large screens. Default: 28px
 */
export const getHeightStyle = (height: string | number = 40, largeScreenHeight: string | number = 28): IStyle => {

  return [
    {
      height: height,
      lineHeight: height,
      selectors: {
        [MS_LARGESCREEN_ACTIVE]: {
          height: largeScreenHeight,
          lineHeight: largeScreenHeight
        }
      }
    }
  ];
};

/**
 * Helper function to get style for navigator components container.
 */
export const getNavigatorComponentsStyle = (): IStyle => {
  return [
    {
      display: 'inline-flex',
      marginLeft: 3,
      marginTop: 2
    }
  ];
};

/**
 * Helper function to get style for navigator item.
 * @param theme Theme to apply to style.
 * @param direction Direction of the navigator item.
 */
export const getNavigatorStyle = (theme: ITheme, direction: NavigatorDirection): IStyle => {

  const { palette } = theme;

  return [
    getFocusStyle(theme, 0, 'relative', palette.neutralSecondary),
    getHeightStyle(40, 24),
    (direction === NavigatorDirection.Next) && {
      marginLeft: 3
    },
    {
      color: palette.neutralDark,
      display: 'inline-block',
      fontSize: IconFontSizes.medium,
      position: 'relative',
      textAlign: 'center',
      top: 2,
      width: 40,
      selectors: {
        ':hover': {
          background: palette.neutralTertiaryAlt,
          cursor: 'pointer'
        },
        [MS_LARGESCREEN_ACTIVE]: {
          fontSize: FontSizes.medium,
          width: 24
        }
      }
    }
  ];
};

/**
 * Helper function to get style for date cell.
 * @param theme Theme to apply.
 * @param showWeekNumbers If week numbers are visible, witdths will be decreased.
 */
export const getDateStyle = (theme: ITheme, showWeekNumbers?: boolean): IStyle => {

  const { fonts, palette } = theme;

  return [
    fonts.mediumPlus,
    getHeightStyle(),
    {
      // border-radius: 2px;
      boxSizing: 'border-box',
      color: palette.neutralPrimary,
      padding: 0,
      width: showWeekNumbers ? 30 : 40,
      selectors: {
        [MS_LARGESCREEN_ACTIVE]: {
          fontSize: FontSizes.small,
          width: showWeekNumbers ? 26 : 28
        }
      }
    }
  ];
};

/**
 * Helper function to get selected style for date cell.
 * @param theme Theme to apply.
 */
export const getDateSelectedStyle = (theme: ITheme): IStyle => {

  const { palette } = theme;

  return [
    getFocusStyle(theme, 0, 'relative', palette.white, 'transparent'),
    {
      background: palette.themeLight,
      color: palette.black,
      selectors: {
        [HighContrastSelector]: {
          border: '1px solid WindowText'
        },
        ':hover': {
          background: palette.themeLight,
          selectors: {
            [HighContrastSelector]: {
              border: '2px solid Highlight'
            }
          }
        }
      }
    }
  ];
};

/**
* Helper function to get current (today) style for date cell.
* @param theme Theme to apply.
*/
export const getDateCurrentStyle = (theme: ITheme): IStyle => {

  const { palette } = theme;

  return {
    backgroundColor: palette.themePrimary,
    color: palette.white,
    fontWeight: FontWeights.semibold,
    position: 'relative',
    selectors: {
      ':hover': {
        backgroundColor: palette.themePrimary
      },
      [HighContrastSelector]: {
        border: '1px solid WindowText'
      }
    }
  };
};

/**
* Helper function to get disabled style for date cell.
* @param theme Theme to apply.
*/
export const getDateDisabledStyle = (theme: ITheme): IStyle => {

  const { palette } = theme;

  return {
    color: palette.neutralTertiaryAlt,
    pointerEvents: 'none'
  };
};

/**
 * Helper function to get style for picker header.
 */
export const getHeaderStyle = (): IStyle => {
  return [
    getHeightStyle(),
    {
      display: 'inline-flex',
      lineHeight: 44,
      position: 'relative'
    }
  ];
};

/**
 * Helper function to get style for header label.
 * @param theme Theme to apply.
 * @param isSelectable Whether the header label is selectable (clickable).
 */
export const getHeaderLabelStyle = (theme: ITheme, isSelectable: boolean = false): IStyle => {

  const { fonts, palette } = theme;

  return [
    getHeightStyle(),
    getFocusStyle(theme, 0, 'relative', palette.neutralSecondary),
    fonts.xLarge,
    {
      color: palette.neutralPrimary,
      display: 'block',
      fontWeight: FontWeights.semilight,
      marginLeft: 5,
      marginTop: -1,
      padding: '0 5px',
      selectors: {
        [MS_LARGESCREEN_ACTIVE]: {
          display: 'inline-block',
          fontSize: FontSizes.large,
          lineHeight: 26
        }
      }
    },
    isSelectable && {
      selectors: {
        ':hover': {
          color: palette.neutralSecondary,
          cursor: 'pointer'
        }
      }
    }
  ];
};