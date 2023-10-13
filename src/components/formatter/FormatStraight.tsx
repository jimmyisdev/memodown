"use client"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineCopy, AiOutlineClear, AiOutlineRotateRight } from "react-icons/ai";

export default function FormatStraight() {
    const [oneLine, setOneLine] = useState(
        "無職期間\n貯金がアラート\n発令中"
    );
    const [filler, setFiller] = useState("😵");
    const [porcessedText, setProcessedText] = useState<string[]>([]);
    function reset() {
        setOneLine("");
        setFiller("");
        setProcessedText([]);
    }
    const processText = () => {
        if (oneLine.length === 0) return;
        let splitedTextArr = oneLine.split("\n").map((item) => item.trim());
        let longestSentence = splitedTextArr.reduce(
            (maxLength, currentString) =>
                currentString.length > maxLength ? currentString.length : maxLength,
            0
        );
        let newStruct = Array(longestSentence).fill("");
        for (let i = splitedTextArr.length - 1; i >= 0; i--) {
            for (let j = 0; j < longestSentence; j++) {
                let char = Array.from(splitedTextArr[i])[j];
                let val = char !== undefined ? char : "　";
                newStruct[j] += val;
                if (!!filler && i !== 0) newStruct[j] += filler;
            }
        }
        return setProcessedText([...newStruct]);
    };

    async function copy() {
        if (porcessedText.length === 0) return;
        let copiedText = porcessedText.reduce(
            (accumulator, currentValue) => `${accumulator} \n` + currentValue,
            ""
        );
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(copiedText);
        } else {
            document.execCommand("copy", true, copiedText);
        }
        toast("Successfully Copied")
    }

    useEffect(() => {
        processText();
    }, []);
    return (
        <div className="m-5 flex flex-col">
            <h1 className="font-bold mb-2 text-center">Make text straight</h1>
            <div className="flex flex-col justify-center items-center h-100 w-80 overflow-scroll  bg-slate-200">
                <textarea
                    className="w-64 h-auto p-2 m-3 "
                    cols={15}
                    rows={5}
                    onChange={(e) => setOneLine(e.target.value)}
                    placeholder="Input text..."
                    value={oneLine}
                />
                {!!porcessedText.length && (
                    <div className="flex flex-col  w-64 h-auto p-2 bg-slate-100 ">
                        {porcessedText.map((item: string) => {
                            return <span key={item} className="m-1　">{item}</span>;
                        })}
                    </div>
                )}
                <div className="flex flex-row justify-around m-2 w-full" >
                    <input
                        className="w-10 h-10 p-2"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiller(e.target.value)}
                        value={filler}
                    />
                    <button className="text-xl hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250" disabled={!oneLine.length} onClick={processText}>
                        <AiOutlineRotateRight />
                    </button>
                    <button className="text-xl hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250" onClick={reset}>
                        <AiOutlineClear />
                    </button>
                    <button className="text-xl hover:text-blue-900 hover:font-extrabold ease-linear transition-all duration-250" onClick={copy}>
                        <AiOutlineCopy />
                    </button>
                </div>
            </div>

        </div>
    )
}
