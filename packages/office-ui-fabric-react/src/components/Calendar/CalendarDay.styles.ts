import { FontWeights, getFocusStyle, HighContrastSelector } from '../../Styling';
import {
  getDateCurrentStyle,
  getDateDisabledStyle,
  getDateSelectedStyle,
  getDateStyle,
  getHeaderLabelStyle,
  getHeaderStyle,
  getNavigatorComponentsStyle,
  getNavigatorStyle,
  MS_LARGESCREEN_ACTIVE,
  NavigatorDirection
} from './Calendar.styles';
import { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';

export const getStyles = (props: ICalendarDayStyleProps): ICalendarDayStyles => {

  const {
    theme,
    className,
    calendarsInline,
    isHeaderSelectable,
    isNextMonthDisabled,
    isPrevMonthDisabled,
    showWeekNumbers } = props;

  const { palette } = theme;

  return {
    root: [
      'ms-DatePicker-dayPicker',
      className,
      {
        display: 'block',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            minHeight: 214
          }
        }
      },
      calendarsInline && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            borderRight: `1px solid ${palette.neutralLight}`,
            boxSizing: 'border-box',
            margin: '-10px 0',
            padding: '10px 0',
            width: 'auto'
          }
        }
      },
      showWeekNumbers && 'ms-DatePicker-showWeekNumbers'
    ],

    navigators: [
      'ms-DatePicker-monthComponents',
      getNavigatorComponentsStyle()
    ],

    prevNavigator: [
      'ms-DatePicker-prevMonth',
      'js-prevMonth',
      getNavigatorStyle(theme, NavigatorDirection.Previous),
      isPrevMonthDisabled && [
        'ms-DatePicker-prevMonth--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    nextNavigator: [
      'ms-DatePicker-nextMonth',
      'js-nextMonth',
      getNavigatorStyle(theme, NavigatorDirection.Next),
      isNextMonthDisabled && [
        'ms-DatePicker-nextMonth--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    header: [
      'ms-DatePicker-header',
      getHeaderStyle()
    ],

    headerLabel: [
      'ms-DatePicker-monthAndYear',
      getHeaderLabelStyle(theme, isHeaderSelectable),
      isHeaderSelectable && 'js-showMonthPicker'
    ],

    weekNumbersTable: [
      'ms-DatePicker-weekNumbers',
      {
        borderRight: `1px solid ${palette.neutralLight}`,
        boxSizing: 'border-box',
        marginTop: 40,
        position: 'absolute',
        width: 30,
        selectors: {
          '.ms-DatePicker-day': {
            color: palette.neutralSecondary
          },
          [MS_LARGESCREEN_ACTIVE]: {
            marginLeft: -7,
            marginTop: 28,
            width: 26
          }
        }
      }
    ],

    table: [
      'ms-DatePicker-table',
      {
        borderCollapse: 'collapse',
        borderSpacing: '0',
        fontSize: 'inherit',
        marginTop: 10,
        tableLayout: 'fixed',
        textAlign: 'center',
        selectors: {
          'td': {
            margin: 0,
            padding: 0
          }
        }
      },
      showWeekNumbers && {
        selectors: {
          ':not(.ms-DatePicker-weekNumbers)': {
            marginLeft: 30
          },
          [MS_LARGESCREEN_ACTIVE]: {
            selectors: {
              ':not(.ms-DatePicker-weekNumbers)': {
                marginLeft: 19
              },
              '.ms-DatePicker-day': {
                width: 26
              },
              '.ms-DatePicker-weekday': {
                width: 26
              }
            }
          }
        }
      },
      calendarsInline && {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            marginRight: 12
          }
        }
      }
    ],

    day: [
      'ms-DatePicker-day',
      getDateStyle(theme, showWeekNumbers),
      getFocusStyle(theme, 0, 'relative', palette.neutralSecondary, 'transparent')
    ],

    weekNumberSelected: [
      'ms-DatePicker-week--highlighted',
      {
        color: palette.black
      }
    ],

    weekday: [
      'ms-DatePicker-weekday',
      getDateStyle(theme, showWeekNumbers)
    ],

    weekBackground: [
      'ms-DatePicker-weekBackground',
      {
        background: palette.neutralLight
      }
    ],

    monthBackground: [
      'ms-DatePicker-monthBackground',
      {
        background: palette.neutralLight
      }
    ],

    dayBackground: [
      'ms-DatePicker-dayBackground',
      {
        background: palette.neutralLight
      }
    ],

    daySelected: [
      'ms-DatePicker-day--highlighted',
      getDateSelectedStyle(theme)
    ],

    dayDisabled: [
      'ms-DatePicker-day--disabled',
      getDateDisabledStyle(theme)
    ],

    dayFocused: [
      'ms-DatePicker-day--infocus',
      {
        selectors: {
          ':hover': {
            cursor: 'pointer',
            background: palette.neutralTertiaryAlt
          },
          ':active': {
            background: palette.themeLight,
            color: palette.black
          }
        }
      }
    ],

    dayUnfocused: [
      'ms-DatePicker-day--outfocus',
      {
        color: palette.neutralTertiary,
        fontWeight: FontWeights.regular,
        selectors: {
          ':hover': {
            background: palette.neutralTertiaryAlt,
            cursor: 'pointer'
          },
          ':active': {
            background: palette.themeLight,
            color: palette.black
          }
        }
      }
    ],

    dayToday: [
      'ms-DatePicker-day--today',
      getDateCurrentStyle(theme)
    ],

    daySingleTop: [
      'ms-DatePicker-topRightSingleDate',
      {
        borderRadius: 0
      }
    ],

    dayCornerTopLeft: [
      'ms-DatePicker-topLeftCornerDate',
      {
        borderRadius: 0
      }
    ],

    dayCornerTopRight: [
      'ms-DatePicker-topRightCornerDate',
      {
        borderRadius: 0
      }
    ],

    daySingleBottom: [
      'ms-DatePicker-bottomSingleCornerDate',
      {
        borderRadius: 0
      }
    ],

    dayCornerBottomLeft: [
      'ms-DatePicker-bottomLeftCornerDate',
      {
        borderRadius: 0
      }
    ],

    dayCornerBottomRight: [
      'ms-DatePicker-bottomRightCornerDate',
      {
        borderRadius: 0
      }
    ],
  };
};