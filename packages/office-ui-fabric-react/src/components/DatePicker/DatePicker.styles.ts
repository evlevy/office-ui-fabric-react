import { IconFontSizes } from '../../Styling';
import { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';

export const getStyles = (props: IDatePickerStyleProps): IDatePickerStyles => {

  const {
    theme,
    className,
    hasLabel } = props;

  const { fonts, palette } = theme;

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

    textField: [
      'ms-DatePicker-textField',
      {
        position: 'relative',
        selectors: {
          'input::-ms-clear': {
            display: 'none'
          },
          'input[readonly]': {
            cursor: 'pointer'
          }
        }
      }
    ],

    icon: [
      hasLabel ? 'ms-DatePicker-event--with-label' : 'ms-DatePicker-event--without-label',
      {
        color: palette.neutralSecondary,
        fontSize: IconFontSizes.medium,
        lineHeight: '18px',
        pointerEvents: 'none',
        position: 'absolute',
        right: '9px'
      },
      hasLabel && {
        bottom: '5px',
        cursor: 'pointer',
        pointerEvents: 'initial'
      },
      !hasLabel && {
        top: '7px'
      }
    ],

    callout: [
      'ms-DatePicker-callout'
    ]
  };
};