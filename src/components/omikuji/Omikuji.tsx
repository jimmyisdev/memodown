"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import omikuji from "../../../public/omikuji.png"
import { omikujiSelections, omikujiSelectionsEn } from "@/helpers/const";
import { checkIfOneDayPassed } from "@/helpers/checkIfOneDayPassed";

export default function Omikuji() {
    const [isUsable, setIsUsable] = useState(true)
    const currentTime = new Date().getTime()
    const [recordResult, setRecordResult] = useState({
        lastResult: '',
        lastTimestamp: ''
    });
    function handleOmikujiBtn() {
        setIsUsable(false)
        //get result
        const random = Math.floor(Math.random() * omikujiSelections.length);
        //show result
        setRecordResult({
            lastResult: String(random),
            lastTimestamp: String(currentTime)
        })
        //save result to localstorage
        localStorage.setItem('omikuji-records', JSON.stringify({
            lastResult: String(random),
            lastTimestamp: String(currentTime)
        }));
    }

    useEffect(() => {
        const getOmikujiRecords = localStorage.getItem('omikuji-records');
        const localRecordResult = getOmikujiRecords !== null ? JSON.parse(getOmikujiRecords) : {};
        setRecordResult(localRecordResult);
        if (Object.keys(localRecordResult).length === 0 && localRecordResult.constructor === Object) return
        else {
            const isOneDayPassed = checkIfOneDayPassed(currentTime, localRecordResult.lastTimestamp || 0);
            isOneDayPassed ? setIsUsable(true) : setIsUsable(false);
        }
    }, []);
    return (
        <section className=" flex flex-col justify-center items-center m-5">
            {isUsable &&
                (< button className="omikujiBtn" onClick={handleOmikujiBtn}>
                    <Image
                        src={omikuji}
                        width={50}
                        height={50}
                        alt="Omikuji"
                        quality={100}
                    />
                </button>)}
            {!isUsable && !!recordResult.lastResult && (
                <div className="flex flex-col m-5 justify-center items-center text-red-300 hover:text-3xl hover:text-red-700 ease-linear transition-all duration-1000">
                    <span className="font-black ">{omikujiSelectionsEn[Number(recordResult.lastResult)].toUpperCase()}</span>
                    <span className="font-black ">{omikujiSelections[Number(recordResult.lastResult)]}</span>
                </div>
            )}
            <div className=" flex flex-row text-black-900 items-center"><AiFillInfoCircle /><span className="ml-2">Once per day</span></div>
        </section >
    )
}