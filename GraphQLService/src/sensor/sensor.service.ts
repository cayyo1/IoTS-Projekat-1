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

    getLatest(page: number, pageSize: number) {
    return this.repo.find({
        order: { timestamp: 'DESC' },
        ...this.getPagination(page, pageSize),
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

    // =========================
    // FILTERS
    // =========================

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

    // =========================
    // DEVICE ONLY FIELDS
    // =========================
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

    // =========================
    // MONITORING
    // =========================
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

  // =========================
  // COUNTS
  // =========================

    getCount() {
    return this.repo.count();
    }

    getDeviceCount(deviceId: string) {
    return this.repo.count({
        where: { deviceId },
    });
    }

    getTemperatureStats() {
    return this.repo
        .createQueryBuilder('s')
        .select('MIN(s.temp)', 'min')
        .addSelect('MAX(s.temp)', 'max')
        .addSelect('AVG(s.temp)', 'average')
        .getRawOne();
    }

    getCoStats() {
    return this.repo
        .createQueryBuilder('s')
        .select('MIN(s.co)', 'min')
        .addSelect('MAX(s.co)', 'max')
        .addSelect('AVG(s.co)', 'average')
        .getRawOne();
    }

    getHumidityStats() {
    return this.repo
        .createQueryBuilder('s')
        .select('MIN(s.humidity)', 'min')
        .addSelect('MAX(s.humidity)', 'max')
        .addSelect('AVG(s.humidity)', 'average')
        .getRawOne();
    }

    getSmokeStats() {
    return this.repo
        .createQueryBuilder('s')
        .select('MIN(s.smoke)', 'min')
        .addSelect('MAX(s.smoke)', 'max')
        .addSelect('AVG(s.smoke)', 'average')
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