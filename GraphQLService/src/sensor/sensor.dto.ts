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
    min: number;

    @Field(() => Float)
    max: number;

    @Field(() => Float)
    average: number;
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