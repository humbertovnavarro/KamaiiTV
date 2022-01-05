interface LoggerStorageMethod {
  log: (level: number, message:string) => void;
}

interface LoggerConfig {
  level: number;
  storage: LoggerStorageMethod[] | LoggerStorageMethod;
}

export default class Logger {
  level: number;
  storageMethods: LoggerStorageMethod[] = [];
  constructor (config: LoggerConfig) {
    if (Array.isArray(config.storage)) {
      this.storageMethods = config.storage;
    } else {
      this.storageMethods.push(config.storage);
    }
    this.level = config.level || 1;
  }
  logError(error: Error | string) {
    if (typeof error === 'string') {
      this.log(3, error);
      return;
    }
    this.log(3, error.message || error.toString());
  }
  logInfo(message: string) {
    this.log(2, message);
  }
  logWarning(message: string) {
    this.log(1, message);
  }
  logDebug(message: string) {
    this.log(0, message);
  }
  private log(level: number, message: string) {
    if (level >= this.level) {
      this.storageMethods.forEach(storageMethod => storageMethod.log(level, message));
    }
  }
}
