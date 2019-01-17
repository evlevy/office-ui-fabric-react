import { styled } from '@uifabric/utilities';
import { ICalendarProps, ICalendarStyleProps, ICalendarStyles } from './Calendar.types';
import { Calendar2Base } from './Calendar2.base';
import { styles } from './Calendar.styles';

/**
 * Calendar description
 */
export const Calendar2 = styled<ICalendarProps, ICalendarStyleProps, ICalendarStyles>(Calendar2Base, styles, undefined, {
  scope: 'Calendar'
});
