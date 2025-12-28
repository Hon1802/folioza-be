import { Logger } from '@nestjs/common';
import { ILogger } from '../types';

type LOG_METHOD = 'log' | 'error' | 'warn' | 'debug';

type LogData = string | Record<string, any> | number | Date | unknown;

export class LoggerService implements ILogger {
  private _logger: Logger;

  constructor(context: string) {
    this._logger = new Logger(context);
  }
  public log(message: string, ...data: LogData[]) {
    this._writeLog('log', message, data);
  }

  public error(message: string, ...data: LogData[]) {
    this._writeLog('error', message, data);
  }

  public warn(message: string, ...data: LogData[]) {
    this._writeLog('warn', message, data);
  }

  public debug(message: string, ...data: LogData[]) {
    //
    this._writeLog('debug', message, data);
  }

  private _writeLog(method: LOG_METHOD, message: string, data: LogData[]) {
    const payload = this._preparePayload(message, data);
    this._logger[method](payload);
  }

  private _preparePayload(message: string, data: LogData[]) {
    const sanitizedData = data.map((el) =>
      typeof el === 'string' ? el : JSON.stringify(el),
    );

    return `${message} ${sanitizedData.join(', ')}`;
  }
}
