import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { Types } from 'mongoose';
import { AppConfigEntryDto } from '../../models/app-config/app-config.dto';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { UtilService } from '../../shared/service/common/util.service';
import { AppConfigError } from './app-config-error.service';

export class AppConfigService {
  public static async findAll(params: MBaseListPayload) {
    const query: any = {
      isActive: true,
      title: {
        $regex: new RegExp(params.keyword, 'gim')
      }
     };

    const total = await RepositoryService.appConfig.model.countDocuments(query);
    const data = await RepositoryService.appConfig
      .find(query)
      .populate('appConfig')
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
    return await RepositoryService.appConfig.findByObjectId(id)
    .populate('appConfig')
    .lean();
  }

  public static async save(payload: AppConfigEntryDto) {
    try {
      return RepositoryService.appConfig.create(payload);
    } catch (error) {
      throw new AppConfigError(error);
    }
  }

  public static async update(appConfigId: Types.ObjectId, payload: AppConfigEntryDto) {
    try {
      await RepositoryService.appConfig.updateAndReturnUpdatedDocument(appConfigId, payload);
      return payload;
    } catch (error) {
      throw new AppConfigError(error);
    }
  }
}
