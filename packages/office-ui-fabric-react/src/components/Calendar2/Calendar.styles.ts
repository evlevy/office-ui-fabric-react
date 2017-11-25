import {
  AnimationStyles,
  getFocusStyle,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium
} from '../../Styling';
import { ICalendarStyleProps, ICalendarStyles } from './Calendar.types';

export const getStyles = (props: ICalendarStyleProps): ICalendarStyles => {

  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    theme,
    className,
    arePickersInline,
    isDayPickerVisible,
    isMonthPickerVisible,
    isPickerOpened,
    showGoToToday,
    showMonthPickerAsOverlay
  } = props;

  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;
  const { semanticColors, fonts, palette } = theme;

  return {
    root: [
      'ms-DatePicker',
      className,
      {
        boxSizing: 'border-box',
        boxShadow: 'none',
        margin: '0',
        padding: '0'
      }
    ],

    picker: [
      'ms-DatePicker-picker',
      'ms-DatePicker-picker--focused',
      fonts.medium,
      {
        color: palette.black,
        position: 'relative',
        textAlign: 'left'
      },
      isMonthPickerVisible && 'ms-DatePicker-picker--monthPickerVisible',
      isDayPickerVisible && 'ms-DatePicker-picker--dayPickerVisible',
      arePickersInline && 'ms-DatePicker-picker--calendarsInline',
      monthPickerOnly && 'ms-DatePicker-picker--monthPickerOnly',
      showMonthPickerAsOverlay && 'ms-DatePicker-picker--monthPickerAsOverlay'
    ],

    holder: [
      'ms-DatePicker-holder',
      AnimationStyles.slideDownIn10,
      {
        // -webkit-overflow-scrolling: touch;
        boxSizing: 'border-box',
        display: 'none',
        width: '300px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              width: arePickersInline ? '440px' : '212px',
              height: showMonthPickerAsOverlay ? '240px' : 'auto'
            }
          ]
        }
      },

      isPickerOpened && [
        'ms-DatePicker-picker--opened',
        {
          boxSizing: 'border-box', // redundant?
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

    wrap: [
      'ms-DatePicker-wrap',
      {
        margin: '-1px',
        padding: '9px',
        display: 'flex',
      },
      showGoToToday && {
        marginBottom: '30px'
      },
      {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: [
            {
              padding: '9px 8px'
            },
            isMonthPickerVisible && [
              {
                padding: '10px'
              },
              showGoToToday && {
                marginBottom: '0px'
              }
            ],
            arePickersInline && {
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
          '& span:focus': [
            getFocusStyle(theme),
            {
              borderColor: palette.neutralSecondary
            }
          ],
          '& div:focus': [
            getFocusStyle(theme),
            {
              borderColor: palette.neutralSecondary
            }
          ]
        }
      },
    ],

    goToToday: [
      'ms-DatePicker-goToday',
      'js-goToday',
      fonts.small,
      {
        bottom: '9px',
        color: palette.neutralPrimary,
        cursor: 'pointer',
        height: '30px',
        lineHeight: '30px',
        width: 'auto',
        padding: '0 10px',
        position: 'absolute', // !important;
        right: '13px',
        selectors: {
          ':hover': {
            color: palette.themePrimary,
            outline: '1px solid transparent'
          },
          ':active': {
            color: palette.themeDark
          },
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
              right: '8px',
              textAlign: 'right',
              top: '199px'
            },
            arePickersInline && {
              right: '13px',
              padding: '0 10px'
            }
          ],

        }
      }
    ]
  };
};