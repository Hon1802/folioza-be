import dayjs from 'dayjs';
import {
  DATE_TIME_FORMAT,
  DATE_TIME_TZ_FORMAT,
  TIME_ZONE_HCM,
} from '../constants/index.constant';

export const getNowAtTimezone = (
  tz = TIME_ZONE_HCM,
  format: string = DATE_TIME_TZ_FORMAT,
) => {
  return dayjs().tz(tz).format(format) as unknown as Date;
};

export const makeDateIsDateAtTimezone = (
  date: string | number | Date,
  tz = TIME_ZONE_HCM,
) => {
  return dayjs.tz(date, tz) as unknown as Date;
};

export const convertDateToDateAtTimezone = (
  date: string | number | Date,
  tz = TIME_ZONE_HCM,
) => {
  return dayjs(date).tz(tz) as unknown as Date;
};

export const formatToString = (
  date: string | number | Date,
  tz = TIME_ZONE_HCM,
  format: string = DATE_TIME_FORMAT,
): string | null => {
  if (!date) {
    return null;
  }

  return dayjs(date)
    .tz(tz)
    .format(format ?? DATE_TIME_FORMAT);
};

export const addMonthToDate = (date: string | number | Date, month: number) => {
  if (!date) {
    return null;
  }

  return dayjs(date).add(month, 'month') as unknown as Date;
};

export const addDayToDate = (date: string | number | Date, day: number) => {
  if (!date) {
    return null;
  }

  return dayjs(date).add(day, 'day').toDate();
};

export const addMinuteToDate = (
  date: string | number | Date,
  minute: number,
) => {
  if (!date) {
    return null;
  }

  return dayjs(date).add(minute, 'minute').toDate();
};

export const compareDateWithDateInTimezone = (
  date1: string | number | Date,
  date2: string | number | Date,
) => {
  const timestampDate1 = dayjs(date1);
  const timestampDate2 = dayjs(date2);

  if (timestampDate1.isBefore(timestampDate2)) {
    return -1;
  }
  if (timestampDate1.isAfter(timestampDate2)) {
    return 1;
  }

  return 0;
};

export const compareDateWithCurrent = (date: string | number | Date) => {
  const current = dayjs().toDate();

  return compareDateWithDateInTimezone(date, current);
};

export const getStartOfNowInTimezone = (timezone = TIME_ZONE_HCM) => {
  return getStartOfDateInTimezone(getNowAtTimezone(timezone), timezone);
};

export const getStartOfDateInTimezone = (
  date: Date,
  timezone = TIME_ZONE_HCM,
) => {
  return dayjs(date).tz(timezone).startOf('day').toDate();
};

export const convertUnixSecondsToDateInTimezone = (
  unixSeconds: number,
  timezone = TIME_ZONE_HCM,
): Date | null => {
  if (!unixSeconds) return null;

  return dayjs.unix(unixSeconds).tz(timezone).toDate();
};

export const getCurrentUnixSecondsInTimezone = (timezone = TIME_ZONE_HCM) => {
  return dayjs().tz(timezone).unix();
};

export const getStartOfCurrentMonthInTimezone = (timezone = TIME_ZONE_HCM) => {
  return getStartOfMonthInTimezone(getNowAtTimezone(timezone), timezone);
};

export const getStartOfMonthInTimezone = (
  date: Date,
  timezone = TIME_ZONE_HCM,
) => {
  return dayjs(date).tz(timezone).startOf('month').toDate();
};
