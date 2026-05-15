import { Resolver, Query, Args, Int, Float } from '@nestjs/graphql';
import { SensorService } from './sensor.service';
import { SensorDto, StatsDto } from './sensor.dto';

@Resolver(() => SensorDto)
export class SensorResolver {
  constructor(private readonly service: SensorService) {}

  @Query(() => [SensorDto])
  getLatest(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getLatest(page, pageSize);
  }

  @Query(() => [SensorDto])
  getByDevice(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) 
  {
    return this.service.getByDevice(deviceId, page, pageSize);
  }

  @Query(() => [SensorDto])
  getRange(
    @Args('from', { type: () => Float }) from: number,
    @Args('to', { type: () => Float }) to: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getRange(from, to, page, pageSize);
  }


  @Query(() => [SensorDto])
  getTemperatureAbove(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getTemperatureAbove(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getTemperatureBelow(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getTemperatureBelow(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getHumidityAbove(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getHumidityAbove(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getHumidityBelow(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getHumidityBelow(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getCoAbove(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getCoAbove(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getSmokeAbove(
    @Args('value', { type: () => Float }) value: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getSmokeAbove(value, page, pageSize);
  }

  @Query(() => [SensorDto])
  getLightOnly(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getLightOnly(deviceId, page, pageSize);
  }

  @Query(() => [SensorDto])
  getTempOnly(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getTempOnly(deviceId, page, pageSize);
  }

  @Query(() => [SensorDto])
  getCoOnly(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getCoOnly(deviceId, page, pageSize);
  }

  @Query(() => [SensorDto])
  getSmokeOnly(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getSmokeOnly(deviceId, page, pageSize);
  }

  @Query(() => [SensorDto])
  getHumidityOnly(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getHumidityOnly(deviceId, page, pageSize);
  }


  @Query(() => [SensorDto])
  getMonitoring(
    @Args('deviceId') deviceId: string,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
  ) {
    return this.service.getMonitoring(deviceId, page, pageSize);
  }

  @Query(() => Int)
  getCount() {
    return this.service.getCount();
  }

  @Query(() => Int)
  getDeviceCount(@Args('deviceId') deviceId: string) {
    return this.service.getDeviceCount(deviceId);
  }

  @Query(() => StatsDto)
  getTemperatureStats() {
    return this.service.getTemperatureStats();
  }

  @Query(() => StatsDto)
  getCoStats() {
    return this.service.getCoStats();
  }

  @Query(() => StatsDto)
  getHumidityStats() {
    return this.service.getHumidityStats();
  }

  @Query(() => StatsDto)
  getSmokeStats() {
    return this.service.getSmokeStats();
  }
}