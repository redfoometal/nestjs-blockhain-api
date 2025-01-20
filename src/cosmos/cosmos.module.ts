import { Module } from '@nestjs/common';
import { CosmosService } from './cosmos.service';
import { CosmosController } from './cosmos.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { cosmosConfigure } from './config/configure';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [cosmosConfigure],
        }),
        HttpModule,
    ],
    controllers: [CosmosController],
    providers: [CosmosService],
})
export class CosmosModule {}
