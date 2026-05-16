import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@ObjectType()
export class SensorDto {
    @Field(() => Int)
    id: number;

    @Field()
    deviceId: string;

    @Field(() => Float)
    temp: number;

    @Field(() => Float)
    humidity: number;

    @Field(() => Float)
    co: number;

    @Field(() => Float)
    smoke: number;

    @Field()
    light: boolean;

    @Field(() => Float)
    timestamp: number;
}

@ObjectType()
export class StatsDto {

    @Field(() => Float)
    minTemperature: number;

    @Field(() => Float)
    maxTemperature: number;

    @Field(() => Float)
    averageTemperature: number;

    @Field(() => Float)
    minCo: number;

    @Field(() => Float)
    maxCo: number;

    @Field(() => Float)
    averageCo: number;

    @Field(() => Float)
    minHumidity: number;

    @Field(() => Float)
    maxHumidity: number;

    @Field(() => Float)
    averageHumidity: number;

    @Field(() => Float)
    minSmoke: number;

    @Field(() => Float)
    maxSmoke: number;

    @Field(() => Float)
    averageSmoke: number;

    @Field(() => Float)
    totalCount: number;
}

@InputType()
export class CreateSensorInput {

    @Field()
    deviceId: string;

    @Field(() => Float)
    temp: number;

    @Field(() => Float)
    humidity: number;

    @Field(() => Float)
    co: number;

    @Field(() => Float)
    smoke: number;

    @Field()
    light: boolean;

    @Field(() => Float)
    timestamp: number;
}