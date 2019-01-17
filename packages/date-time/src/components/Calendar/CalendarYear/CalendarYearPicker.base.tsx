import { CalendarPickerBase } from '../CalendarPicker/CalendarPicker.base';
import { ICalendarPickerGridCellProps, ICalendarPickerState } from '../CalendarPicker/CalendarPicker.types';
import { ICalendarYearPicker, ICalendarYearPickerProps } from './CalendarYearPicker.types';

export interface ICalendarYearPickerState extends ICalendarPickerState<number> {
  fromYear: number;
  navigated?: number;
  selectedYear?: number;
}

export class CalendarYearPickerBase extends CalendarPickerBase<ICalendarYearPickerProps, ICalendarYearPickerState, number>
  implements ICalendarYearPicker {
  constructor(props: ICalendarYearPickerProps) {
    super(props);

    this.state = this._getState(this.props);
  }

  protected formatItem = (item: number): string => `${item} - ${item + 11}`;

  protected isPreviousItemInBounds = (item: number): boolean => {
    const { minimum } = this.props;

    return minimum !== undefined && item < minimum;
  };

  protected isNextItemInBounds = (item: number): boolean => {
    const { maximum } = this.props;

    return maximum !== undefined && item + 11 > maximum;
  };

  protected getGridItems = (): ICalendarPickerGridCellProps[][] => {
    const { navigatedItem, selectedItem, minimum, maximum } = this.props;
    const { fromYear } = this.state;
    const now = new Date();
    const nowYear = now.getFullYear();
    const isNow = navigatedItem === nowYear;
    const isSelected = selectedItem === navigatedItem;
    const result: ICalendarPickerGridCellProps[][] = [];

    for (let i = 0; i < 11; i++) {
      const itemYear = fromYear + i;
      const name = this._yearToString(itemYear);
      const cellProps: ICalendarPickerGridCellProps = {
        key: name,
        label: name,
        isInNavigatedContext: true,
        isNow: isNow,
        isSelected: isSelected && navigatedItem === itemYear,
        isInBounds: (minimum ? minimum < itemYear : true) && (maximum ? itemYear > maximum : true)
      };

      const columIndex = i % 4;
      if (result.length < columIndex) {
        result.push([]);
      }
      result[i].push(cellProps);
    }

    return result;
  };

  private _yearToString = (year: number) => {
    const { itemFormatter } = this.props;

    if (itemFormatter) {
      const now = new Date(); // any date will do
      now.setFullYear(year);
      return itemFormatter.formatYear(now);
    }

    return String(year);
  };

  private _getState(props: ICalendarYearPickerProps): ICalendarYearPickerState {
    const { selectedItem, navigatedItem } = props;
    const rangeYear = selectedItem || navigatedItem || new Date().getFullYear();
    const fromYear = Math.floor(rangeYear / 10) * 10;

    return {
      fromYear: fromYear,
      navigated: navigatedItem,
      selectedYear: selectedItem
    };
  }
}
