// @public
enum DateRangeType {
    // (undocumented)
    Day = 0,
    // (undocumented)
    Month = 2,
    // (undocumented)
    Week = 1,
    // (undocumented)
    WorkWeek = 3
  }
  
  // @public
  enum DayOfWeek {
    // (undocumented)
    Friday = 5,
    // (undocumented)
    Monday = 1,
    // (undocumented)
    Saturday = 6,
    // (undocumented)
    Sunday = 0,
    // (undocumented)
    Thursday = 4,
    // (undocumented)
    Tuesday = 2,
    // (undocumented)
    Wednesday = 3
  }
  
  // @public
  enum FirstWeekOfYear {
    // (undocumented)
    FirstDay = 0,
    // (undocumented)
    FirstFourDayWeek = 2,
    // (undocumented)
    FirstFullWeek = 1
  }
  
  // @public (undocumented)
  interface ICalendar {
    focus: () => void;
  }
  
  // @public (undocumented)
  interface ICalendarFormatDateCallbacks {
    formatDay: (date: Date) => string;
    formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => string;
    formatMonthYear: (date: Date, strings?: ICalendarStrings) => string;
    formatYear: (date: Date) => string;
  }
  
  // @public (undocumented)
  interface ICalendarIconStrings {
    // (undocumented)
    closeIcon?: string;
    leftNavigation?: string;
    rightNavigation?: string;
  }
  
  // @public (undocumented)
  interface ICalendarProps extends IBaseProps<ICalendar> {
    allFocusable?: boolean;
    calendarDayProps?: ICalendarDayProps;
    // (undocumented)
    calendarMonthPickerProps?: ICalendarMonthPickerProps;
    calendarMonthProps?: ICalendarMonthProps;
    className?: string;
    componentRef?: IRefObject<ICalendar>;
    dateRangeType?: DateRangeType;
    dateTimeFormatter?: ICalendarFormatDateCallbacks;
    firstDayOfWeek?: DayOfWeek;
    firstWeekOfYear?: FirstWeekOfYear;
    highlightCurrentMonth?: boolean;
    highlightSelectedMonth?: boolean;
    isDayPickerVisible?: boolean;
    isMonthPickerVisible?: boolean;
    maxDate?: Date;
    minDate?: Date;
    navigationIcons?: ICalendarIconStrings;
    onDismiss?: () => void;
    onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
    showCloseButton?: boolean;
    showGoToToday?: boolean;
    showMonthPickerAsOverlay?: boolean;
    showSixWeeksByDefault?: boolean;
    showWeekNumbers?: boolean;
    strings: ICalendarStrings | null;
    styles?: IStyleFunctionOrObject<ICalendarStyleProps, ICalendarStyles>;
    theme?: ITheme;
    today?: Date;
    value?: Date;
    workWeekDays?: DayOfWeek[];
  }
  
  // @public (undocumented)
  interface ICalendarStrings {
    closeButtonAriaLabel?: string;
    days: string[];
    goToToday: string;
    months: string[];
    nextMonthAriaLabel?: string;
    nextYearAriaLabel?: string;
    prevMonthAriaLabel?: string;
    prevYearAriaLabel?: string;
    shortDays: string[];
    shortMonths: string[];
    weekNumberFormatString?: string;
  }
  
  // @public (undocumented)
  interface ICalendarStyleProps {
    className?: string;
    isDayPickerVisible?: boolean;
    isMonthPickerVisible?: boolean;
    monthPickerOnly?: boolean;
    overlayedWithButton?: boolean;
    showGoToToday?: boolean;
    showMonthPickerAsOverlay?: boolean;
    showWeekNumbers?: boolean;
    theme: ITheme;
  }
  
  // @public (undocumented)
  interface ICalendarStyles {
    // (undocumented)
    divider: IStyle;
    // (undocumented)
    goTodayButton: IStyle;
    // (undocumented)
    monthPickerWrapper: IStyle;
    root: IStyle;
  }
  
  // WARNING: Unsupported export: Calendar
  // WARNING: Unsupported export: Calendar2
  // (No @packagedocumentation comment for this package)
  