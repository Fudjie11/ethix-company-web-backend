import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { Types } from 'mongoose';
import { LocationEntryDto } from '../../models/location/location.dto';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { LocationError } from './location-error.service';

export class LocationService {
  public static async findAll(params: MBaseListPayload) {
    const query: any = {
      isActive: true,
    };

    if (params.keyword) {
      query['name']= {$regex: params.keyword, $options: 'i'};
    }

    const total = await RepositoryService.location.model.countDocuments(query);
    const data = await RepositoryService.location
      .find(query)
      .sort({ createdAt: -1 })
      .skip(params.skip)
      .limit(params.take)
      .lean();

    return {
      data,
      take: params.take,
      skip: params.skip,
      total
    };
  }

  public static async findById(id: Types.ObjectId) {
    return await RepositoryService.location.findByObjectId(id).lean();
  }

  public static async save(payload: LocationEntryDto) {
    try {
      return RepositoryService.location.create(payload);
    } catch (error) {
      throw new LocationError(error);
    }
  }

  public static async update(locationId: Types.ObjectId, payload: LocationEntryDto) {
    try {
      await RepositoryService.location.updateAndReturnUpdatedDocument(locationId, payload);
      return payload;
    } catch (error) {
      throw new LocationError(error);
    }
  }

  public static async delete(locationId: Types.ObjectId) {
    try {
      await RepositoryService.location.updateAndReturnUpdatedDocument(locationId, { isActive: false });
      return locationId;
    } catch (error) {
      throw new LocationError(error);
    }
  }
}
