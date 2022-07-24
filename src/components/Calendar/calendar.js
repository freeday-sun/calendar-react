const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const Month = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
}

export function areDatesEqual(firstDate, secondDate){
    if(!firstDate || !secondDate) return false;

    return (
        firstDate.getFullYear() === secondDate.getFullYear()
        && firstDate.getMonth() === secondDate.getMonth()
        && firstDate.getDate() === secondDate.getDate()
    )
}

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function getDaysInMonth(date) {
    const month = date.getMonth();
    console.log(month)
    const year = date.getFullYear();
    console.log(year)

    const daysInMonth = DAYS_IN_MONTH[month]
    console.log(daysInMonth)


    if (isLeapYear(year) && month === Month.February) {
        return daysInMonth + 1;
    }

    return daysInMonth
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) return 6;
    return dayOfWeek - 1;
}

export function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    let day = 1;
    const daysInMonth = getDaysInMonth(date);
    let monthStartsOn = getDayOfWeek(date);

    for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
        result[i] = []

        for (let j = 0; j < DAYS_IN_WEEK; j++) {
            console.log(`monthStartsOn: ${monthStartsOn}, j: ${j}, i: ${i}`)
            console.log(`day: ${day}, daysInMonth: ${daysInMonth}`)
            console.log(`if(i === 0 && j < monthStartsOn): ${i === 0 && j < monthStartsOn}`)
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++)
            }

            console.log(result[i][j])

        }
    }
    console.log(result)
    return result;
}
