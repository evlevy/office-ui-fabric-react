import { ICalendarDayPickerStyleProps, ICalendarDayPickerStyles } from './CalendarDayPicker.types';
import {
  FontWeights,
  IRawStyle,
  IconFontSizes,
  ScreenWidthMinMedium,
  ScreenWidthMaxSmall,
  ColorClassNames,
  FontClassNames
} from '../../Styling';

export const getStyles = (props: ICalendarDayPickerStyleProps): ICalendarDayPickerStyles => {

  const MS_SMALLSCREEN_ACTIVE = `@media (max-device-width: ${ScreenWidthMaxSmall}px)`;
  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    theme,
    isMonthPickerVisible,
    showWeekNumbers,
    areCalendarsInline,
    headerToggleView,
    nextMonthInBounds,
    prevMonthInBounds
  } = props;

  const { semanticColors, fonts, palette } = theme;

  const CalendarDarPickerDayMargin = '10px';
  const CalendarDaySmall = '40px';
  const CalendarDayLarge = '28px';

  const navigatorStyle: IRawStyle = {
    width: CalendarDaySmall,
    height: CalendarDaySmall,
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: CalendarDaySmall,
    fontSize: IconFontSizes.medium,
    color: palette.neutralDark,
    position: 'relative',
    top: '2px',
    selectors: {
      ':hover': {
        color: palette.neutralDark,
        cursor: 'pointer',
        outline: '1px solid transparent',
        backgroundColor: palette.neutralTertiaryAlt
      },
      [MS_LARGESCREEN_ACTIVE]: {
        fontSize: '14px',
        width: '24px',
        height: '24px',
        lineHeight: '24px'
      }
    }
  };

  return {

    dayPicker: [
      'ms-DatePicker-dayPicker',
      /* isPickingYears && {
        display: 'none'
      }, */
      {
        display: 'block',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              minHeight: '214px'
            },
            isMonthPickerVisible && {
              margin: `-${CalendarDarPickerDayMargin} 0`,
              padding: `${CalendarDarPickerDayMargin} 0`,
              boxSizing: 'border-box',
              borderRight: `1px solid ${palette.neutralLight}`,
              width: '212px',
              minHeight: '214px',
            },
            isMonthPickerVisible && /* isPickingYears && */ {
              display: 'block'
            },
            areCalendarsInline && {
              width: 'auto'
            }
          ]
        }
      },
      showWeekNumbers && 'ms-DatePicker-showWeekNumbers'
    ],

    monthComponents: [
      'ms-DatePicker-monthComponents',
      {
        display: 'inline-flex',
        marginLeft: '3px'
      }
    ],

    navContainer: [
      'ms-DatePicker-navContainer'
    ],

    prevMonth: [
      'ms-DatePicker-prevMonth',
      'js-prevMonth',
      navigatorStyle,
      !prevMonthInBounds && [
        'ms-DatePicker-prevMonth--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    nextMonth: [
      'ms-DatePicker-nextMonth',
      'js-nextMonth',
      navigatorStyle,
      {
        marginLeft: '3px'
      },
      !nextMonthInBounds && [
        'ms-DatePicker-nextMonth--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    monthAndYear: [
      'ms-DatePicker-monthAndYear',
      headerToggleView && 'js-showMonthPicker',
      fonts.xLarge,
      {
        display: 'inline-block',
        color: palette.neutralPrimary,
        marginTop: '-1px',
        fontWeight: FontWeights.semilight,
        padding: '0 5px',
        marginLeft: '5px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              fontSize: '17px',
              color: palette.neutralPrimary
            },
          ]
        }
      }
    ],

    weekNumbers: [
      'ms-DatePicker-weekNumbers',
      {
        position: 'absolute',
        marginTop: CalendarDaySmall,
        borderRight: `1px solid ${palette.neutralLight}`,
        boxSizing: 'border-box',
        width: '30px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              width: '26px',
              marginLeft: '-7px'
            }
          ]
        }
      }
    ],

    weekday: [
      'ms-DatePicker-weekday',
      fonts.mediumPlus,
      {
        width: CalendarDaySmall,
        height: CalendarDaySmall,
        padding: '0',
        lineHeight: CalendarDaySmall,
        color: palette.neutralPrimary,
        boxSizing: 'border-box',
        borderRadius: '2px'
      }
    ],

    weekIsHighlighted: [

    ],

    header: [
      'ms-DatePicker-header',
      {
        position: 'relative',
        display: 'inline-flex',
        height: CalendarDaySmall,
        lineHeight: '44px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              height: CalendarDayLarge,
              lineHeight: CalendarDayLarge
            }
          ]
        }
      }
    ],

    table: [
      'ms-DatePicker-table',
      showWeekNumbers && {
        selectors: {
          '& not($weekNumbers)': {
            marginLeft: '30px'
          }
        }
      },
      {
        textAlign: 'center',
        borderCollapse: 'collapse',
        borderSpacing: '0',
        tableLayout: 'fixed',
        fontSize: 'inherit',
        marginTop: '10px',
        selectors: {
          '& td': [
            {
              margin: '0',
              padding: '0',
              selectors: {
                ':hover': {
                  outline: '1px solid transparent'
                }
              }

            }
          ],
          [MS_LARGESCREEN_ACTIVE]: [
            showWeekNumbers && {
              selectors: {
                '& not($weekNumbers)': {
                  marginLeft: '19px'
                }
              }
            },
            areCalendarsInline && {
              marginRight: '12px'
            }
          ]
        }
      }
    ]
  };
};