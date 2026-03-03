import { format, parse, isAfter, isEqual, isBefore} from "date-fns";


const dateSetter = () => {

   let dueDate = null; 
   const now = new Date();
   const currentDate = format(now, 'dd/MM/yyyy');


   const setDate = (dateString) => {
     if(!dateString) return;
     const dateParser = parse(dateString, 'yyyy-MM-dd', new Date());
     return dueDate = format(dateParser, 'dd/MM/yyyy');
   }

   const checkDueDate = (date) => {
        return isEqual(currentDate, date);
   }

   const checkOverDue = (date) => {
        let result = parse(date, 'dd/MM/yyyy', new Date());
        return isAfter(now, result);
   }

   const checkUpcoming = (date) => {
        if (!dueDate) {
            return
        }
        let upcoming = isBefore(currentDate, date);
        return upcoming;
   }

   return {
    setDate,
    checkDueDate,
    checkOverDue,
    checkUpcoming
   }
}

export const date = dateSetter();