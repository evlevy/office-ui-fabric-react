import { ICalendarDayStyleProps, ICalendarDayStyles, CalendarDayCornerType } from './CalendarDay.types';
import {
  FontWeights,
  FontSizes,
  HighContrastSelector,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium,
  getFocusStyle
} from '../../Styling';

export const getStyles = (props: ICalendarDayStyleProps): ICalendarDayStyles => {

  const MS_SMALLSCREEN_ACTIVE = `@media (max-device-width: ${ScreenWidthMaxSmall}px)`;
  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    className,
    cornerType,
    isDayBackground,
    isDisabled,
    isFocused,
    isHighlighted,
    isMonthBackground,
    isOutOfFocus,
    isToday,
    isWeekBackground,
    isWeekHighlighted,
    theme
  } = props;

  const { semanticColors, fonts, palette } = theme;

  return {

    root: [
      isWeekBackground && [
        'ms-DatePicker-weekBackground',
        {
          background: palette.neutralLight,
          selectors: {
            '&:first-child': {
              borderRadius: '2px 0px 0px 2px'
            },
            '&:last-child': {
              borderRadius: '0px 2px 2px 0px'
            }
          }
        }
      ],

      isMonthBackground && [
        'ms-DatePicker-monthBackground',
        {
          background: palette.neutralLight
        }
      ],

      isDayBackground && [
        'ms-DatePicker-dayBackground',
        {
          background: palette.neutralLight,
          borderRadius: '2px'
        }
      ]
    ],

    day: [
      'ms-DatePicker-day',
      className,
      fonts.mediumPlus,
      {
        width: '40px',
        height: '40px',
        padding: '0',
        lineHeight: '40px',
        color: palette.neutralPrimary,
        boxSizing: 'border-box',
        borderRadius: '2px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            width: '28px',
            height: '28px',
            lineHeight: '28px',
            fontSize: FontSizes.small
          }
        }
      },

      isDisabled && [
        'ms-DatePicker-day--disabled',
        {
          color: palette.neutralTertiary,
          fontWeight: FontWeights.regular,
          selectors: {
            ':before': {
              borderTopColor: palette.neutralTertiary
            }
          }
        }
      ],

      isFocused && [
        'ms-DatePicker-day--focused',
        {
          selectors: {
            ':hover': {
              cursor: 'pointer',
              background: palette.neutralTertiaryAlt
            },
            ':active': {
              color: palette.black,
              background: palette.themeLight
            }
          }
        }
      ],

      isOutOfFocus && [
        'ms-DatePicker-day--outfocused',
        {
          color: palette.neutralTertiary,
          fontWeight: FontWeights.regular,
          selectors: {
            ':hover': {
              cursor: 'pointer',
              background: palette.neutralTertiaryAlt
            },
            ':active': {
              color: palette.black,
              background: palette.themeLight
            }
          }
        }
      ],

      isHighlighted && [
        'ms-DatePicker-day--higlighted',
        {
          color: palette.black,
          background: palette.themeLight,
          selectors: {
            ':hover': {
              cursor: 'pointer',
              background: palette.themeLight,
              selectors: {
                [HighContrastSelector]: {
                  border: '2px solid Highlight'
                }
              }
            }
          }
        }
      ],

      isToday && [
        'ms-DatePicker-day--today',
        {
          position: 'relative',
          backgroundColor: palette.themePrimary,
          color: palette.white,
          fontWeight: FontWeights.semibold,
          selectors: {
            [HighContrastSelector]: {
              border: '1px solid',
              color: 'WindowText'
            }
          }
        }
      ],

      isHighlighted && isFocused && [
        getFocusStyle(theme),
        {
          selectors: {
            [HighContrastSelector]: {
              color: 'WindowText'
            }
          }
        }
      ],

      isHighlighted && isDisabled && {
        background: palette.neutralTertiary
      },

      (cornerType === CalendarDayCornerType.TopLeft) && [
        'ms-DatePicker-topLeftCornerDate',
        {
          borderRadius: '0'
        }
      ],

      (cornerType === CalendarDayCornerType.TopRight) && [
        'ms-DatePicker-topRightCornerDate',
        {
          borderRadius: '0'
        }
      ],

      (cornerType === CalendarDayCornerType.TopSingle) && [
        'ms-DatePicker-topRightSingleDate',
        {
          borderRadius: '0'
        }
      ],

      (cornerType === CalendarDayCornerType.BottomLeft) && [
        'ms-DatePicker-bottomLeftCornerDate',
        {
          borderRadius: '0'
        }
      ],

      (cornerType === CalendarDayCornerType.BottomRight) && [
        'ms-DatePicker-bottomRightCornerDate',
        {
          borderRadius: '0'
        }
      ],

      (cornerType === CalendarDayCornerType.BottomSingle) && [
        'ms-DatePicker-bottomSingleCornerDate',
        {
          borderRadius: '0'
        }
      ]
    ]
  };
};