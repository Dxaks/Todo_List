import { format, parse, isValid, getDay, getHours, getMinutes } from "date-fns";


const dateSetter = () => {
    
    const addDueDate = (date, time) => {

        const showDate = () =>  parse(date, 'dd-MM-yyyy', new Date());

        const showTime = () => format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm:ss')

        return {
            showDate,
            showTime
        };
    };

    return {
        addDueDate
    };
} 

export const setDate = dateSetter();


