import { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import {
  AnimationStyles,
  ScreenWidthMinMedium,
  ScreenWidthMaxSmall,
  getFocusStyle
} from '../../Styling';

export const getStyles = (props: ICalendarStyleProps): ICalendarStyles => {

  const MS_SMALLSCREEN_ACTIVE = `@media (max-device-width: ${ScreenWidthMaxSmall}px)`;
  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    theme,
    className,
    isMonthPickerVisible,
    isDayPickerVisible,
    areCalendarsInline,
    showMonthPickerAsOverlay,
    showGoToToday,
    isPickerOpened
  } = props;

  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

  const { semanticColors, fonts, palette } = theme;
  const CalendarPickerTextColor = palette.black;
  const CalendarGoTodayTextColor = palette.neutralPrimary;
  const CalendarGoTodayHoverTextColor = palette.themePrimary;
  const CalendarGoTodayActiveTextColor = palette.themeDark;
  const CalendarDarPickerDayMargin = '10px';
  const CalendarDay = '40px';

  return {
    root: [
      'ms-DatePicker',
      className,
      // ms-normalize:
      {
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: '0',
        padding: '0'
      }
    ],

    // Base wrapper for the date picker
    picker: [
      'ms-DatePicker-picker',
      'ms-DatePicker-picker--focused',
      fonts.medium,
      {
        color: CalendarPickerTextColor,
        position: 'relative',
        textAlign: 'left'
      },
      isMonthPickerVisible && 'ms-DatePicker-picker--monthPickerVisible',
      isDayPickerVisible && 'ms-DatePicker-picker--dayPickerVisible',
      areCalendarsInline && 'ms-DatePicker-picker--calendarsInline',
      monthPickerOnly && 'ms-DatePicker-picker--monthPickerOnly',
      showMonthPickerAsOverlay && 'ms-DatePicker-picker--monthPickerAsOverlay'
    ],

    // The holder is the only "scrollable" top-level container element
    holder: [
      'ms-DatePicker-holder',
      AnimationStyles.slideDownIn10,
      {
        // -webkit-overflow-scrolling: touch;
        boxSizing: 'border-box',
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
            areCalendarsInline && {
              width: '440px',
              height: 'auto',
            },
            showMonthPickerAsOverlay && {
              height: '240px'
            }
          ]
        }
      },

      // When the picker opens, reveal the content
      isPickerOpened && [
        'ms-DatePicker-picker--opened',
        {
          boxSizing: 'border-box',
          display: 'block'
        }
      ],
    ],

    // The frame and wrap work together to ensure that
    // clicks within the picker don’t reach the holder
    frame: [
      'ms-DatePicker-frame',
      {
        padding: '1px',
        position: 'relative'
      }
    ],

    // The frame and wrap work together to ensure that
    // clicks within the picker don’t reach the holder
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

            // Show month picker, if enabled
            isMonthPickerVisible && [
              {
                padding: '10px'
              },
              // When date and month picker are side-by-side and "Go to today" button is visible no additional margin is needed
              showGoToToday && {
                marginBottom: '0px'
              }
            ],

            areCalendarsInline && {
              padding: '9px 12px'
            },

            // When month picker is only visible
            monthPickerOnly && {
              padding: '10px'
            },

            showMonthPickerAsOverlay && {
              paddingTop: '4px',
              paddingBottom: '4px'
            }
          ],
          '& span:focus': [
            // @include focus-border(1px, $ms-color-neutralSecondary);
            getFocusStyle(theme),
            {
              borderColor: palette.neutralSecondary
            }
          ],
          '& div:focus': [
            // @include focus-border(1px, $ms-color-neutralSecondary);
            getFocusStyle(theme),
            {
              borderColor: palette.neutralSecondary
            }
          ]
        }
      },

      // Additional 30px margin needed when "Go to today" button is visible
      showGoToToday && {
        marginBottom: '30px'
      }
    ],

    goToToday: [
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
        right: '13px', // @include ms-right(13px);
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              padding: '0 3px'
            },
            isMonthPickerVisible && {
              boxSizing: 'border-box',
              fontSize: '12px',
              height: '28px',
              lineHeight: '28px',
              padding: '0 10px',
              right: '8px', // @include ms-right(8px);
              textAlign: 'right',
              top: '199px'
            },
            areCalendarsInline && {
              right: '13px', // @include ms-right(13px);
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
  };
};