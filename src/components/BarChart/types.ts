export type ChartProps = {
    selectedRange: TimeRangeProps,
    showResult: boolean
}

type TimeRangeProps = {
    selectedStartMonth: Date,
    selectedEndMonth: Date,
}