import moment from 'moment'

export function getCurrentDate( separator='/' ) {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
}



/* get current date using moment js */
export function getDate() {
  const today = new Date()
  return moment().format('YYYY-MM-DD');
}

/* format a date using moment js */
export function formatDate(date) {
    return moment(date).format('YYYY-MM-DD').toString()
}

/* get date range 
* negative input means substract from current date
* other add n days from current date
*/
export function getDateRange( days ) {
    let dateTo = moment().format('MM-DD-YYYY'); //init 1st date
    let dateFrom = moment().format('MM-DD-YYYY'); //init 2nd date
    if ( parseInt(days) < 0) {
        console.log('less than 0')
        dateFrom = moment().subtract( Math.abs(days) ,'d');
    }else{
        dateFrom = moment().format('MM-DD-YYYY').toString(); //reset to current date
        dateTo = moment().add( Math.abs(days), 'd' ).format('YYYY-MM-DD').toString();
    }
    return {'startDate': dateFrom, 'endDate': dateTo}
}