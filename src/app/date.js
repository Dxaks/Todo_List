import { format, parse, isAfter, isEqual, isBefore} from "date-fns";

const dateSetter = () => {

   let dueDate = null; 
   const now = new Date();
   const currentDate = format(now, 'dd/MM/yyyy');


   const setDate = (dateString) => {
        const dateParser = parse(dateString, 'dd/MM/yyyy', new Date());
        return dueDate = format(dateParser, 'dd/MM/yyyy');
   }


   const checkDueDate = (date) => {
        return currentDate === date ? true : false;
   }


   const checkOverDue = (date) => {
        if (!dueDate) {
            console.log('due date is not set')
            return
        }
        let result = isAfter(currentDate, date);
        return result
   }


   const checkUpcoming = (date) => {
        if (!dueDate) {
            console.log('due date is not set')
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

const date = dateSetter();
const tododate = date.setDate('10/01/2026');
const checkingOverDue = date.checkOverDue(tododate)
console.log(checkingOverDue)






