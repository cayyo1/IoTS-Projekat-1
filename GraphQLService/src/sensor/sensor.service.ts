import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorEntity } from './sensor.entity';
import { CreateSensorInput } from './sensor.dto';


@Injectable()
export class SensorService {
    constructor(
        @InjectRepository(SensorEntity)
        private readonly repo: Repository<SensorEntity>,
    ) {}

    private getPagination(page: number, pageSize: number) {
    return {
        skip: (page - 1) * pageSize,
        take: pageSize,
        };
    }

    getLatest(deviceId: string) {
    return this.repo.findOne({
        where: { deviceId },
        order: { timestamp: 'DESC' },
    });
    }

    getByDevice(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        ...this.getPagination(page, pageSize),
    });
    }

    getRange(from: number, to: number, page: number, pageSize: number) {
    return this.repo.find({
        where: {
        timestamp: (from as any, to as any),
        } as any,
        ...this.getPagination(page, pageSize),
    });
    }


    getTemperatureAbove(value: number, page: number, pageSize: number) {
    return this.repo.find({
        where: { temp: (value as any) },
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.temp > value));
    }

    getTemperatureBelow(value: number, page: number, pageSize: number) {
    return this.repo.find({
        where: { temp: (value as any) },
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.temp < value));
    }

    getHumidityAbove(value: number, page: number, pageSize: number) {
    return this.repo.find({
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.humidity > value));
    }

    getHumidityBelow(value: number, page: number, pageSize: number) {
    return this.repo.find({
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.humidity < value));
    }

    getCoAbove(value: number, page: number, pageSize: number) {
    return this.repo.find({
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.co > value));
    }

    getSmokeAbove(value: number, page: number, pageSize: number) {
    return this.repo.find({
        ...this.getPagination(page, pageSize),
    }).then(data => data.filter(x => x.smoke > value));
    }

    getLightOnly(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: ['timestamp', 'light'],
        ...this.getPagination(page, pageSize),
    });
    }

    getTempOnly(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: ['timestamp', 'temp'],
        ...this.getPagination(page, pageSize),
    });
    }

    getCoOnly(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: ['timestamp', 'co'],
        ...this.getPagination(page, pageSize),
    });
    }

    getSmokeOnly(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: ['timestamp', 'smoke'],
        ...this.getPagination(page, pageSize),
    });
    }

    getHumidityOnly(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: ['timestamp', 'humidity'],
        ...this.getPagination(page, pageSize),
    });
    }

    getMonitoring(deviceId: string, page: number, pageSize: number) {
    return this.repo.find({
        where: { deviceId },
        select: [
        'timestamp',
        'temp',
        'humidity',
        'co',
        'smoke',
        'light',
        ],
        ...this.getPagination(page, pageSize),
    });
    }


    getCount() {
    return this.repo.count();
    }

    getDeviceCount(deviceId: string) {
    return this.repo.count({
        where: { deviceId },
    });
    }

    getStats() {
        return this.repo
            .createQueryBuilder('s')
            .select('MIN(s.temp)', 'minTemperature')
            .addSelect('MAX(s.temp)', 'maxTemperature')
            .addSelect('AVG(s.temp)', 'averageTemperature')

            .addSelect('MIN(s.co)', 'minCo')
            .addSelect('MAX(s.co)', 'maxCo')
            .addSelect('AVG(s.co)', 'averageCo')

            .addSelect('MIN(s.humidity)', 'minHumidity')
            .addSelect('MAX(s.humidity)', 'maxHumidity')
            .addSelect('AVG(s.humidity)', 'averageHumidity')

            .addSelect('MIN(s.smoke)', 'minSmoke')
            .addSelect('MAX(s.smoke)', 'maxSmoke')
            .addSelect('AVG(s.smoke)', 'averageSmoke')

            .addSelect('COUNT(*)', 'totalCount')
            .getRawOne();
    }

    async addSensorData(input: CreateSensorInput) {
    const sensor = this.repo.create({
        deviceId: input.deviceId,
        temp: input.temp,
        humidity: input.humidity,
        co: input.co,
        smoke: input.smoke,
        light: input.light,
        timestamp: input.timestamp,
    });

        return await this.repo.save(sensor);
    }

    async deleteSensorData(id: number) {
    const entity = await this.repo.findOne({
        where: { id },
    });

    if (!entity) {
        return false;
    }

    await this.repo.remove(entity);

    return true;
    }
}