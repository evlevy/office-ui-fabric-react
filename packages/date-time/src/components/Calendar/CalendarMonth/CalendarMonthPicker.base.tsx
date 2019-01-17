import {
  getYearStart,
  getYearEnd,
  getMonthStart,
  getMonthEnd,
  compareDatePart,
  addYears
} from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { CalendarPickerBase } from '../CalendarPicker/CalendarPicker.base';
import { ICalendarPicker, ICalendarPickerGridCellProps, ICalendarPickerState } from '../CalendarPicker/CalendarPicker.types';
import { ICalendarMonthPickerProps } from './CalendarMonth.types';

export interface ICalendarMonthPickerState extends ICalendarPickerState<Date> {
  isYearPickerVisible?: boolean;
}

export class CalendarMonthPickerBase extends CalendarPickerBase<ICalendarMonthPickerProps, ICalendarMonthPickerState, Date>
  implements ICalendarPicker {
  constructor(props: ICalendarMonthPickerProps) {
    super(props);

    this.state = {
      isYearPickerVisible: false
    };
  }

  protected formatItem = (item: Date): string => {
    const { itemFormatter } = this.props;

    return itemFormatter!.formatYear(item);
  };

  protected isPreviousItemInBounds = (item: Date): boolean => {
    const { minimum } = this.props;

    return minimum ? compareDatePart(minimum, getYearStart(item)) < 0 : true;
  };

  protected isNextItemInBounds = (item: Date): boolean => {
    const { maximum } = this.props;

    return maximum ? compareDatePart(getYearEnd(item), maximum) < 0 : true;
  };

  protected getPreviousItem = (item: Date): Date => addYears(item, -1);

  protected getNextItem = (item: Date): Date => addYears(item, 1);

  protected getGridItems = (): ICalendarPickerGridCellProps[][] => {
    const { strings, navigatedItem, selectedItem, minimum, maximum } = this.props;
    const monthNames = strings!.shortMonths;
    const navigatedYear = navigatedItem!.getFullYear();
    const navigatedMonth = navigatedItem!.getMonth();
    const selectedYear = selectedItem!.getFullYear();
    const selectedMonth = selectedItem!.getMonth();
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth();
    const isNow = navigatedYear === nowYear && navigatedMonth === nowMonth;
    const isSelected = selectedYear === navigatedYear && selectedMonth === navigatedMonth;
    const result: ICalendarPickerGridCellProps[][] = [];

    for (let i = 0; i < monthNames.length; i++) {
      const monthName = monthNames[i];
      const indexedMonth = new Date(navigatedYear, i, 1);
      const cellProps: ICalendarPickerGridCellProps = {
        key: monthName,
        label: monthName,
        isInNavigatedContext: true,
        isNow: isNow && navigatedMonth === i,
        isSelected: isSelected && navigatedMonth === i,
        isInBounds:
          (minimum ? compareDatePart(minimum, getMonthEnd(indexedMonth)) < 1 : true) &&
          (maximum ? compareDatePart(getMonthStart(indexedMonth), maximum) < 1 : true)
      };

      const columIndex = i % 4;
      if (result.length < columIndex) {
        result.push([]);
      }
      result[i].push(cellProps);
    }

    return result;
  };
}
