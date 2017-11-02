import { ICalendarStyles, ICalendarDayStyles } from './Calendar.Props';
import { memoizeFunction } from '../../Utilities';
import {
  mergeStyles,
  mergeStyleSets,
  FontSizes,
  FontWeights,
  IRawStyle,
  ITheme,
  concatStyleSets,
  getFocusStyle,
  AnimationStyles,
  IconFontSizes
} from '../../Styling';

export interface ICalendarClassNames {
  root: string;
  picker: string;
  holder: string;
  frame: string;
  wrap: string;
  goToday: string;
}

export interface ICalendarDayClassNames {
  dayPicker: string;
  monthComponents: string;
  navContainer: string;
  header: string;
  prevMonth: string;
  nextMonth: string;
  monthAndYear: string;
  table: string;
}

const MS_SMALLSCREEN_ACTIVE = '@media (max-device-width: 459px)';
const MS_LARGESCREEN_ACTIVE = '@media (min-device-width: 460px)';
const CalendarDarPickerDayMargin = '10px';
const CalendarDay = '40px';

export const getClassNames = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ICalendarStyles>,
  className: string,
  // isPickerOpened: boolean, <- always true
  // isPickerFocused: boolean, <- always true
  isMonthPickerVisible: boolean,
  isDayPickerVisible: boolean,
  showMonthPickerAsOverlay: boolean,
  showGoToToday: boolean,
  areCalendarsInLine: boolean
): ICalendarClassNames => {


  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

  const { semanticColors, fonts, palette } = theme;

  const CalendarPickerTextColor = palette.black;
  const CalendarGoTodayTextColor = palette.neutralPrimary;
  const CalendarGoTodayHoverTextColor = palette.themePrimary;
  const CalendarGoTodayActiveTextColor = palette.themeDark;

  return mergeStyleSets(
    {
      root: ['ms-DatePicker'],

      picker: [
        'ms-DatePicker-picker',
        'ms-DatePicker-picker--opened',
        'ms-DatePicker-picker--focused',
        fonts.medium,
        {
          color: CalendarPickerTextColor,
          position: 'relative',
          textAlign: 'left'
        },
        isMonthPickerVisible && 'ms-DatePicker-picker--monthPickerVisible',
        isDayPickerVisible && 'ms-DatePicker-picker--dayPickerVisible',
        areCalendarsInLine && 'ms-DatePicker-picker--calendarsInline',
        monthPickerOnly && 'ms-DatePicker-picker--monthPickerOnly',
        showMonthPickerAsOverlay && 'ms-DatePicker-picker--monthPickerAsOverlay'
      ],

      holder: [
        'ms-DatePicker-holder',
        AnimationStyles.slideDownIn10,
        {
          // -webkit-overflow-scrolling: touch;
          // @include ms-borderBox;
          display: 'none',
          selectors: {
            [MS_SMALLSCREEN_ACTIVE]:
            {
              width: '300px'
            },
            [MS_LARGESCREEN_ACTIVE]: [
              {
                width: '212px',
                height: 'auto',
              },
              areCalendarsInLine && {
                width: '440px',
                height: 'auto',
              },
              showMonthPickerAsOverlay && {
                height: '240px'
              }
            ]
          }
        },
        isPickerOpened && {
          display: 'block'
        },
      ],

      frame: [
        'ms-DatePicker-frame',
        {
          padding: '1px',
          position: 'relative'
        }
      ],

      wrap: [
        'ms-DatePicker-wrap',
        {
          margin: '-1px',
          padding: '9px',
          display: 'flex',
          selectors: {
            [MS_LARGESCREEN_ACTIVE]: [
              {
                padding: '9px 8px'
              },
              isMonthPickerVisible && {
                padding: '10px'
              },
              isMonthPickerVisible && showGoToToday && {
                marginBottom: '0px'
              },
              areCalendarsInLine && {
                padding: '9px 12px'
              },
              monthPickerOnly && {
                padding: '10px'
              },
              showMonthPickerAsOverlay && {
                paddingTop: '4px',
                paddingBottom: '4px'
              }
            ],
            'span:focus': {

              // @include focus-border(1px, $ms-color-neutralSecondary);
            },
            'div:focus': {
              // @include focus-border(1px, $ms-color-neutralSecondary);
            }
          }
        },
        showGoToToday && {
          marginBottom: '30px'
        }
      ],

      goToday: [
        'ms-DatePicker-goToday',
        'js-goToday',
        fonts.small,
        {
          bottom: '9px',
          color: CalendarGoTodayTextColor,
          cursor: 'pointer',
          height: '30px',
          lineHeight: '30px',
          position: 'absolute', // !important;
          width: 'auto',
          // @include ms-right(13px);
          selectors: {
            [MS_LARGESCREEN_ACTIVE]: [
              {
                padding: '0 3px'
              },
              isMonthPickerVisible && {
                // @include ms-borderBox;
                fontSize: '12px',
                height: '28px',
                lineHeight: '28px',
                padding: '0 10px',
                // @include ms-right(8px);
                // @include text-align(right);
                top: '199px'
              },
              areCalendarsInLine && {
                // @include ms-right(13px);
                padding: '0 10px'
              }
            ],
            ':hover': {
              color: CalendarGoTodayHoverTextColor,
              outline: '1px solid transparent'
            },
            ':active': {
              color: CalendarGoTodayActiveTextColor
            }
          }

        }
      ]
    },
    customStyles
  );
});

export const getCalendarDayClassNames = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ICalendarDayStyles>,
  className: string,
  showWeekNumbers: boolean,
  // isPickingYears: boolean <- this apparently is not set anywhere!
  isMonthPickerVisible: boolean,
  areCalendarsInLine: boolean,
  headerToggleView: boolean
): ICalendarDayClassNames => {

  const { semanticColors, fonts, palette } = theme;

  const navigatorStyle: IRawStyle =
    {
      width: CalendarDay,
      height: CalendarDay,
      display: 'inline-block',
      textAlign: 'center',
      lineHeight: CalendarDay,
      fontSize: IconFontSizes.medium,
      color: theme.palette.neutralDark,
      position: 'relative',
      top: '2px',
      selectors: {
        ':hover': {
          color: theme.palette.neutralDark,
          cursor: 'pointer',
          outline: '1px solid transparent',
          backgroundColor: theme.palette.neutralTertiaryAlt
        },
        [MS_LARGESCREEN_ACTIVE]: {
          fontSize: '14px',
          width: '24px',
          height: '24px',
          lineHeight: '24px'
        }
      }
    }

  return mergeStyleSets(
    {
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
                // @include ms-borderBox;
                // @include border-right(1px, solid, $ms-color-neutralLight);
                width: '212px',
                minHeight: '214px',
              },
              isMonthPickerVisible && /* isPickingYears && */ {
                display: 'block'
              },
              areCalendarsInLine && {
                width: 'auto'
              }
            ]
          }
        },
        showWeekNumbers && ['ms-DatePicker-showWeekNumbers']
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
        navigatorStyle
      ],

      nextMonth: [
        'ms-DatePicker-nextMonth',
        'js-nextMonth',
        navigatorStyle,
        {
          marginLeft: '3px'
        }
      ],

      monthAndYear: [
        'ms-DatePicker-monthAndYear',
        headerToggleView && 'js-showMonthPicker',
        fonts.xLarge,
        {
          display: 'inline-block',
          color: theme.palette.neutralPrimary,
          marginTop: '-1px',
          fontWeight: FontWeights.semilight,
          padding: '0 5px',
          // @include margin-left(5px);
          selectors: {
            [MS_LARGESCREEN_ACTIVE]: [
              {
                fontSize: '17px',
                color: theme.palette.neutralPrimary
              },
            ]
          }
        }
      ],

      header: [
        'ms-DatePicker-header',
        {
          position: 'relative',
          display: 'inline-flex',
          height: CalendarDay,
          lineHeight: '44px',
          selectors: {
            [MS_LARGESCREEN_ACTIVE]: [
              {
                height: CalendarDay,
                lineHeight: CalendarDay
              }
            ]
          }
        }
      ],

      table: [
        'ms-DatePicker-table',
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
            ]
          }
        }
      ]

    },
    customStyles
  );
});
