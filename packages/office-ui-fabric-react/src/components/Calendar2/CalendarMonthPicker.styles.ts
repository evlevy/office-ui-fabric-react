import {
  ColorClassNames,
  FontClassNames,
  FontWeights,
  IconFontSizes,
  IRawStyle,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium
} from '../../Styling';
import { ICalendarMonthPickerStyleProps, ICalendarMonthPickerStyles } from './CalendarMonthPicker.types';

export const getStyles = (props: ICalendarMonthPickerStyleProps): ICalendarMonthPickerStyles => {

  const MS_SMALLSCREEN_ACTIVE = `@media (max-device-width: ${ScreenWidthMaxSmall}px)`;
  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    theme,
    className,
    areCalendarsInline,
    isPrevYearDisabled,
    isNextYearDisabled,
    headerToggleView
    } = props;

  const { semanticColors, fonts, palette } = theme;

  const CalendarDayPickerDayMargin = '10px';
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
    root: [
      'ms-DatePicker-monthPicker',
      className,
      {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              minHeight: '214px',
              display: 'block'
            },
            areCalendarsInline && {
              marginLeft: '13px'
            }],
          [MS_SMALLSCREEN_ACTIVE]: [
            areCalendarsInline && {
              display: 'none'
            }
          ]
        }
      }
    ],

    yearComponents: [
      'ms-DatePicker-yearComponents',
      {
        display: 'inline-flex',
        marginLeft: '3px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              marginLeft: '1px'
            }
          ],
          [MS_SMALLSCREEN_ACTIVE]: [
            {
              marginTop: '2px'
            }
          ]
        }
      }
    ],

    navContainer: [
      'ms-DatePicker-navContainer'
    ],

    prevYear: [
      'ms-DatePicker-prevYear',
      'js-prevYear',
      navigatorStyle,
      isPrevYearDisabled && 'ms-DatePicker-prevYear--disabled'
    ],

    nextYear: [
      'ms-DatePicker-nextYear',
      'js-nextYear',
      navigatorStyle,
      isNextYearDisabled && 'ms-DatePicker-nextYear--disabled'
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

    currentYear: [
      'ms-DatePicker-currentYear',
      'js-showYearPicker',
      fonts.xLarge,
      {
        display: 'block',
        padding: '0 5px',
        color: palette.neutralPrimary,
        height: CalendarDaySmall,
        lineHeight: CalendarDaySmall,
        marginLeft: '5px',
        fontWeight: FontWeights.semilight,
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              fontSize: '17px',
              margin: '0',
              lineHeight: '26px',
              display: 'inline-block'
            }
          ]
        }
      },
      headerToggleView && [
      ]
    ],

    optionGrid: [
      'ms-DatePicker-optionGrid',
      {
        position: 'relative',
        height: '210px',
        width: '280px',
        margin: '12px 0 0 0',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              height: '150px',
              width: '212px'
            }
          ]
        }
      }
    ]
  };
};