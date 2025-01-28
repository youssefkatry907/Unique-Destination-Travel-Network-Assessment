import { Module } from '@nestjs/common';
import { databaseProviders } from './shared/config/db.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}