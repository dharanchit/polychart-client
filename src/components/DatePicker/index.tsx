import { Button, FormLabel, Grid } from "@material-ui/core";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type MonthlyPickerProps = {
    setSelectedRange: React.Dispatch<any>,
    setShowResult: React.Dispatch<boolean>
}

const MonthlyPicker = ({ setSelectedRange, setShowResult }: MonthlyPickerProps) => {
    const [startMonth, setStartMonth] = useState<Date>(new Date("2014/02/08"));
    const [endMonth, setEndMonth] = useState<Date>(new Date("2014/04/08"));

    const applyRangeChange = () => {
        setSelectedRange({
            selectedStartMonth: startMonth,
            selectedEndMonth: endMonth
        });
        setShowResult(true);

    }

    return(
        <Grid container>
            <Grid item xs={4}>
                <FormLabel>Start Month Picker</FormLabel>
                <DatePicker
                    selected={startMonth}
                    onChange={(date: Date) => setStartMonth(date)}
                    selectsStart
                    startDate={startMonth}
                    endDate={endMonth}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />    
            </Grid>
            <Grid item xs={4}>
                <FormLabel>End Month Picker</FormLabel>
                <DatePicker
                    selected={endMonth}
                    onChange={(date: Date) => setEndMonth(date)}
                    selectsEnd
                    startDate={endMonth}
                    endDate={endMonth}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" onClick={applyRangeChange}> Generate Graph </Button>    
            </Grid>
        </Grid> 
    );
}

export default MonthlyPicker;