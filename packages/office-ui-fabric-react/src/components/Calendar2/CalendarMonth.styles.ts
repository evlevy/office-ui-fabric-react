import {
  FontSizes,
  FontWeights,
  getFocusStyle,
  HighContrastSelector,
  ScreenWidthMaxSmall,
  ScreenWidthMinMedium
} from '../../Styling';
import { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';

export const getStyles = (props: ICalendarMonthStyleProps): ICalendarMonthStyles => {

  const MS_SMALLSCREEN_ACTIVE = `@media (max-device-width: ${ScreenWidthMaxSmall}px)`;
  const MS_LARGESCREEN_ACTIVE = `@media (min-device-width: ${ScreenWidthMinMedium}px)`;

  const {
    className,
    isCurrent,
    isDisabled,
    isHighlighted,
    theme
  } = props;

  const { semanticColors, fonts, palette } = theme;

  return {

    root: [
      'ms-DatePicker-month',
      fonts.smallPlus,
      {
        width: '60px',
        height: '60px',
        lineHeight: '60px ',
        cursor: 'pointer',
        float: 'left',
        margin: '0 10px 10px 0',
        color: palette.neutralPrimary,
        textAlign: 'center',
        borderRadius: '2px',
        selectors: {
          ':hover': {
            color: palette.black,
            backgroundColor: palette.neutralTertiaryAlt,
            outline: '1px solid transparent'
          },
          [MS_LARGESCREEN_ACTIVE]: {
            width: '40px',
            height: '40px',
            lineHeight: '40px',
            fontSize: '12px',
            margin: '0 11px 11px 0',
            selectors: {
              ':nth-child(4n+4)': {
                margin: '0 0px 11px 0'
              }
            }
          },
          ':active': {
            backgroundColor: palette.themeLight
          }
        }
      },

      isHighlighted && [
        'ms-DatePicker-month--highlighted',
        {
          backgroundColor: palette.themeLight,
          color: palette.white
        }
      ],

      isCurrent && [
        'ms-DatePicker-month--current',
        {
          fontWeight: FontWeights.semibold,
          color: palette.white,
          backgroundColor: palette.themePrimary
        }
      ],

      isDisabled && [
        'ms-DatePicker-month--disabled'
      ]
    ]
  };
};