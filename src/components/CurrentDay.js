"use client"
import React, { useEffect, useState } from 'react'
import ResultDisplay from './ResultDisplay';
import YearMonthSelector from './YearMonthSelector';
import axios from 'axios';

const CurrentDay = () => {
    const [currentDay, setCurrentDay] = useState([])


    const handleDateChange = async (year, month) => {
    
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/result?year=${year}&month=${month}`);
            if (res.status === 200) {
                const resultList = res.data.resultList[res.data.resultList.length - 1];
              
                if(resultList.day=== new Date().getDate()){
                    
                    localStorage.setItem("currentday", JSON.stringify(resultList));
                }else{
                     localStorage.setItem("currentday", null);
                }
                setCurrentDay(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        handleDateChange(new Date().getFullYear(), new Date().getMonth() + 1);
    },[])



    return (
        <div>
            <div className={`my-3 shadow-lg  text-white rounded`}>
                <div className={`flex mb-2 justify-center rounded items-center gap-4 bg-amber-100 dark:bg-red-900 py-3 px-4`}>
                    
                    <YearMonthSelector onDateChange={handleDateChange} />
                </div>
               <ResultDisplay data={currentDay} />
            </div>
        </div>
    )
}

export default CurrentDay
