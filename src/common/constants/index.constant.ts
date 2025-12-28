import { FileType, SupportFileType } from '../enums/file.enum';

export enum Prefix {
  ADMIN = 'admin',
  USER = 'user',
  CRONJOB = 'cronjob',
  GLOBAL = 'backend',
}

export const TIME_ZONE_HCM = 'Asia/Ho_Chi_Minh';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_TZ_FORMAT = 'YYYY-MM-DD HH:mm:ss ZZ';

export const MapFilePathSupport = [
  {
    key: FileType.IMAGE,
    types: ['png', 'jpg', 'jpeg'],
  },
  {
    key: FileType.PDF,
    types: ['pdf'],
  },
  {
    key: FileType.AUDIO,
    types: ['mp3', 'mp4', 'wav'],
  },
  {
    key: FileType.EXCEL,
    types: [SupportFileType.xlsx, SupportFileType.xls],
  },
  {
    key: FileType.CSV,
    types: [SupportFileType.csv, SupportFileType.csv],
  },
  {
    key: FileType.JSON,
    types: [SupportFileType.json],
  },
];
