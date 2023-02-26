import format from 'date-fns/format'

const convertTime = (date) => format(new Date(date), 'MMM dd, YYY')

export default convertTime
