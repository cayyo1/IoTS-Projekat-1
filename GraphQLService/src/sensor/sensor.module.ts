import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorService } from './sensor.service';
import { SensorResolver } from './sensor.resolver';
import { SensorEntity } from './sensor.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SensorEntity])],
    providers: [SensorService, SensorResolver],
})
export class SensorModule {}