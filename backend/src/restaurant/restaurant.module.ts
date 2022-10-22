import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TYPES } from './../application/constants/types';
import { AuditMapper } from './../audit/audit.mapper';
import { LocationRepository } from './../infrastructure/data_access/repositories/location.repository';
import { RestaurantRepository } from './../infrastructure/data_access/repositories/restaurant.repository';
import {
  LocationData,
  LocationSchema,
} from './../infrastructure/data_access/repositories/schemas/location.schema';
import {
  RestaurantData,
  RestaurantSchema,
} from './../infrastructure/data_access/repositories/schemas/restaurant.schema';
import { LocationMapper } from './../location/location.mapper';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantMapper } from './restaurant.mapper';
import { RestaurantService } from './restaurant.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocationData.name, schema: LocationSchema },
      { name: RestaurantData.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [
    { provide: TYPES.IRestaurantService, useClass: RestaurantService },
    RestaurantRepository,
    RestaurantMapper,
    AuditMapper,
    LocationMapper,
    LocationRepository,
  ],
})
export class RestaurantModule {}
