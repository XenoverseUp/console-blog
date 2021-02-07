import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";

dayjs.locale("tr");
dayjs.extend(utc);
dayjs.extend(relativeTime);

const getTimeDifferenceString = (date) => dayjs.utc(date).fromNow();

export default getTimeDifferenceString;
