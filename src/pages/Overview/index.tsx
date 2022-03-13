import { useState } from "react";
import BarChart from "../../components/BarChart";
import MonthlyPicker from "../../components/DatePicker";

const Overview = () => {
    const [ selectedRange, setSelectedRange ] = useState<any>({});
    const [ showResult, setShowResult ] = useState<boolean>(false);

    return (
        <div>
            <MonthlyPicker setSelectedRange={setSelectedRange} setShowResult={setShowResult} />
            <BarChart selectedRange={selectedRange} showResult={showResult} />
        </div>
    )
}

export default Overview;