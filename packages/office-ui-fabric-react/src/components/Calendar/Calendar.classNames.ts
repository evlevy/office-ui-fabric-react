import { ICalendarStyles } from './Calendar.Props';
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
  AnimationStyles
} from '../../Styling';

export interface ICalendarClassNames {
  root: string;
  picker: string;
  holder: string;
  frame: string;
  wrap: string;
  goToday: string;
}

export const getClassNames = memoizeFunction((
  theme: ITheme,
  customStyles: Partial<ICalendarStyles>,
  className: string,
  isPickerOpened: boolean,
  isPickerFocused: boolean,
  isMonthPickerVisible: boolean,
  isDayPickerVisible: boolean,
  showMonthPickerAsOverlay: boolean,
  showGoToToday: boolean
): ICalendarClassNames => {

  const areCalendarsInLine = isMonthPickerVisible && isDayPickerVisible;
  const monthPickerOnly = !showMonthPickerAsOverlay && !isDayPickerVisible;

  const { semanticColors, fonts, palette } = theme;

  const MS_SMALLSCREEN_ACTIVE = '@media (max-device-width: 459px)';
  const MS_LARGESCREEN_ACTIVE = '@media (min-device-width: 460px)';
  const CalendarPickerTextColor = palette.black;
  const CalendarGoTodayTextColor = theme.palette.neutralPrimary;
  const CalendarGoTodayHoverTextColor = theme.palette.themePrimary;
  const CalendarGoTodayActiveTextColor = theme.palette.themeDark;

  return mergeStyleSets(
    {
      root: [
        'ms-DatePicker'
      ],

      picker: [
        'ms-DatePicker-picker',
        fonts.medium,
        {
          color: CalendarPickerTextColor,
          position: 'relative',
          textAlign: 'left'
        },
        isPickerOpened && 'ms-DatePicker-picker--opened',
        isPickerFocused && 'ms-DatePicker-picker--focused',
        isMonthPickerVisible && 'ms-DatePicker-picker--monthPickerVisible',
        isDayPickerVisible && 'ms-DatePicker-picker--dayPickerVisible',
        areCalendarsInLine && 'ms-DatePicker-picker--calendarsInline',
        !showMonthPickerAsOverlay && !isDayPickerVisible && 'ms-DatePicker-picker--monthPickerOnly',
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
