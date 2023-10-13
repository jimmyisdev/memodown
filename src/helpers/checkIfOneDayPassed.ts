export const checkIfOneDayPassed = (currentTimestamp: string | number, lastTimeStamp: string | number) => {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const timeElapsed = Number(currentTimestamp) - Number(lastTimeStamp);
    const dayPassed = timeElapsed >= millisecondsInADay ? true : false;
    console.log(timeElapsed)
    return dayPassed;
}