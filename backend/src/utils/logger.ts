// src/utils/logger.ts

export function info(message: string, ...optionalParams: any[]) {
  console.info(`\x1b[36m[INFO]\x1b[0m`, message, ...optionalParams);
}

export function warn(message: string, ...optionalParams: any[]) {
  console.warn(`\x1b[33m[WARN]\x1b[0m`, message, ...optionalParams);
}

export function error(message: string, ...optionalParams: any[]) {
  console.error(`\x1b[31m[ERROR]\x1b[0m`, message, ...optionalParams);
}

export function debug(message: string, ...optionalParams: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`\x1b[35m[DEBUG]\x1b[0m`, message, ...optionalParams);
  }
}

