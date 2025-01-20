import { Module } from '@nestjs/common';
import { EvmService } from './evm.service';
import { EvmController } from './evm.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { evmConfigure } from './config/configure';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [evmConfigure],
        }),
        HttpModule,
    ],
    controllers: [EvmController],
    providers: [EvmService],
})
export class EvmModule {}
