export enum OutboxMessageStatus {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export enum SyncType {
  IMMEDIATE = 'IMMEDIATE',
  QUEUE = 'QUEUE',
}

export enum CallType {
  SYNC = 'SYNC',
  ASYNC = 'ASYNC',
}

export enum SyncProvider {
  VGS = 'VGS',
}

export enum OutboxMessageType {
  SEND_OTP = 'SEND_OTP',
}
