import {
  ColorClassNames,
  FontClassNames,
  FontSizes,
  FontWeights,
  IconFontSizes,
  IRawStyle,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium
} from '../../Styling';
import { ICalendarDayPickerStyleProps, ICalendarDayPickerStyles } from './CalendarDayPicker.types';

export const getStyles = (props: ICalendarDayPickerStyleProps): ICalendarDayPickerStyles => {

  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    theme,
    className,
    headerToggleView,
    isInline,
    isMonthPickerVisible,
    nextMonthInBounds,
    prevMonthInBounds,
    showWeekNumbers } = props;

  const { semanticColors, fonts, palette } = theme;

  const navItemStyle: IRawStyle = {
    width: '40px',
    height: '40px',
    display: 'inline-block',
    textAlign: 'center',
    lineHeight: '40px',
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

  const weeknumberStyle: IRawStyle = {
    width: '30px',
    height: '40px',
    padding: '0',
    lineHeight: '40px',
    color: palette.neutralSecondary,
    boxSizing: 'border-box',
    borderRadius: '2px',
    selectors: {
      [MS_LARGESCREEN_ACTIVE]: {
        marginLeft: '-7px',
        width: '26px',
        height: '28px',
        lineHeight: '28px',
        fontSize: FontSizes.small
      }
    }
  };

  const tableStyle: IRawStyle = {
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
        isInline && {
          marginRight: '12px'
        }
      ]
    }
  };

  return {

    root: [
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
              margin: '-10px 0',
              padding: '10px 0',
              boxSizing: 'border-box',
              borderRight: `1px solid ${palette.neutralLight}`,
              width: '212px',
              minHeight: '214px'
            },
            /*
            isMonthPickerVisible &&  isPickingYears &&  {
              display: 'block'
            },
            */
            isInline && {
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
      navItemStyle,
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
      navItemStyle,
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
      'ms-DatePicker-table',
      'ms-DatePicker-weekNumbers',
      tableStyle,
      {
        position: 'absolute',
        marginTop: '40px',
        borderRight: `1px solid ${palette.neutralLight}`,
        boxSizing: 'border-box',
        width: '30px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              marginTop: '28px',
              width: '26px',
              marginLeft: '-7px'
            }
          ]
        }
      }
    ],

    table: [
      'ms-DatePicker-table',
      tableStyle,
      showWeekNumbers && {
        marginLeft: '30px'
      },
      {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            showWeekNumbers && {
              marginLeft: '19px'
            }
          ]
        }
      }
    ],

    weekNumber: [
      'ms-DatePicker-weekNumber',
      fonts.mediumPlus,
      weeknumberStyle
    ],

    selectedWeekNumber: [
      'ms-DatePicker-weekNumber--selected',
      fonts.mediumPlus,
      weeknumberStyle,
      {
        color: palette.black
      }
    ],

    weekday: [
      'ms-DatePicker-weekday',
      fonts.mediumPlus,
      {
        width: showWeekNumbers ? '30px' : '40px',
        height: '40px',
        padding: '0',
        lineHeight: '40px',
        color: palette.neutralPrimary,
        boxSizing: 'border-box',
        borderRadius: '2px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              width: showWeekNumbers ? '26px' : '28px',
              height: '28px',
              lineHeight: '28px',
              fontSize: FontSizes.small
            }
          ]
        }
      }
    ],

    weekIsHighlighted: [

    ],

    header: [
      'ms-DatePicker-header',
      {
        position: 'relative',
        display: 'inline-flex',
        height: '40px',
        lineHeight: '44px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              height: '28px',
              lineHeight: '28px'
            }
          ]
        }
      }
    ]
  };
};