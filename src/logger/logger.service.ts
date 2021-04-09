import { LoggerService as AppLoggerService, Injectable, Logger as AppLogger } from '@nestjs/common'
import { configure, getLogger, Logger } from 'log4js'
import { ConfigService } from '@nestjs/config'

// 日志输出格式
const layout = {
  type: 'pattern',
  pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %h %z %m'
}

@Injectable()
export class LoggerService implements AppLoggerService {
  private readonly logLogger: Logger
  private readonly requestNormalLogger: Logger
  private readonly requestErrorLogger: Logger

  constructor(private readonly configService: ConfigService) {
    // 创建logger 参数指的是categories
    this.logLogger = getLogger('system')
    this.requestNormalLogger = getLogger('requestNormal')
    this.requestErrorLogger = getLogger('requestError')

    const logsDir = this.configService.get<string>('logsDir')

    configure({
      appenders: {
        console: {
          type: 'console'
        },
        stdout: {
          type: 'dateFile',
          filename: `${logsDir}/request.log`,
          alwaysIncludePattern: true,
          keepFileExt: true,
          layout
        },
        errorout: {
          type: 'dateFile',
          filename: `${logsDir}/error.log`,
          alwaysIncludePattern: true,
          keepFileExt: true,
          layout
        }
      },
      categories: {
        default: { appenders: ['console'], level: 'all' },
        request: { appenders: ['stdout'], level: 'info' },
        error: { appenders: ['errorout'], level: 'error' }
      }
    })
  }

  log(message: any): void {
    const logger = new AppLogger('正常日志')
    logger.log(message)
    this.logLogger.log(message)
  }

  error(message: any): void {
    const logger = new AppLogger('错误日志')
    logger.error(message)
    this.logLogger.error(message)
  }

  warn(message: any): void {
    const logger = new AppLogger('警告日志')
    logger.warn(message)
    this.logLogger.warn(message)
  }

  debug(message: any): void {
    const logger = new AppLogger('调试日志')
    logger.debug(message)
    this.logLogger.debug(message)
  }

  verbose(message: any): void {
    const logger = new AppLogger('详细日志')
    logger.verbose(message)
    this.logLogger.info(message)
  }

  requestNormal(message: any): void {
    const logger = new AppLogger('请求接口成功日志')
    logger.log(message)
    this.requestNormalLogger.log(message)
  }

  requestError(message: any): void {
    const logger = new AppLogger('请求接口失败日志')
    logger.error(message)
    this.requestErrorLogger.error(message)
  }
}
