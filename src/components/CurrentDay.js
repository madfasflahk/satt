"use client"
import React, { useEffect, useState } from 'react'
import ResultDisplay from './ResultDisplay';
import YearMonthSelector from './YearMonthSelector';
import axios from 'axios';
import useCurrentDayStore from '@/store/useCurrentDayStore';

const CurrentDay = () => {
    const [currentDay, setCurrentDay] = useState([])
    const { setCurrentDays } = useCurrentDayStore();

    const handleDateChange = async (year, month) => {

        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/result?year=${year}&month=${month}`);
            setCurrentDay(res?.data ?? []);
            if (res.status === 200) {
                const resultList = res.data.resultList[res.data.resultList.length - 1];



                if (resultList.day === new Date().getDate()) {
                    setCurrentDays(resultList);

                } else {
                    setCurrentDays(null);
                }

            }
        } catch (error) {

            console.log(error);
        }
    };
    useEffect(() => {
        handleDateChange(new Date().getFullYear(), new Date().getMonth() + 1);
    }, [])



    return (
        <div>
            <div className={`my-3 shadow-lg  text-white rounded`}>
                <div className="flex mb-2 justify-center rounded items-center gap-4 ...">
                    <YearMonthSelector onDateChange={handleDateChange} />
                </div>



                <ResultDisplay data={currentDay} />
            </div>
        </div>
    )
}

export default CurrentDay
