import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports : [ConfigModule ],
   useFactory : (configService : ConfigService) =>{
const isProduction = configService.get("NODE_ENV") === "production";
    return {
  pinoHttp :{
    transport : isProduction ? undefined : {
      target : "pino-pretty",
      options :{
        singleLine : true,
      },
      level : isProduction ? "info" : "debug",
    }
  }
    }
   },
   inject : [ConfigService],
    }),
  ],
  exports: [LoggerModule], // Export LoggerModule so it can be used elsewhere
})
export class LoggerSetupModule {}
