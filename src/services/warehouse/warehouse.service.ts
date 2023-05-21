import { BadRequestException } from '@nestjs/common';
import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { Types } from 'mongoose';
import { WarehouseEntryDto } from '../../models/warehouse/warehouse.dto';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { WarehouseError } from './warehouse-error.service';
import { WarehouseVM } from '../../models/warehouse/warehouse.vm';
import { WarehouseDto } from '../../models/warehouse/warehouse.dto';
import { plainToClass } from 'class-transformer';

export class WarehouseService {
  public static async findAll(params: MBaseListPayload, filter: any = {}) {
    let dataWarehouse: WarehouseVM[] = [];
    
    const query: any = {
      isActive: true,
    };

    if (filter.locationId) query.locationId = filter.locationId

    if (params.keyword) {
      query['name']= {$regex: params.keyword, $options: 'i'};
    }

    const total = await RepositoryService.warehouse.model.countDocuments(query);
    const data = await RepositoryService.warehouse
      .find(query)
      .populate('location')
      .sort({ createdAt: -1 })
      .skip(params.skip)
      .limit(params.take)
      .lean();

    data.map((d) => {
      const warehouseDto = plainToClass(WarehouseDto, d)
      const w = warehouseDto.transformDtoToVM();
      dataWarehouse.push(w)
    })  

    return {
      data: dataWarehouse,
      take: params.take,
      skip: params.skip,
      total
    };
  }

  public static async findById(id: Types.ObjectId) {
    let warehouseVm: WarehouseVM;

    const data = await RepositoryService.warehouse.findByObjectId(id)
    .populate('location')
    .lean();

    if (!data) {
      throw new BadRequestException('Warehouse not found!');
    }

    const warehouseDto = plainToClass(WarehouseDto, data);
    warehouseVm = warehouseDto.transformDtoToVM();

    return warehouseVm;
  }

  public static async save(payload: WarehouseEntryDto) {
    try {
      return RepositoryService.warehouse.create(payload);
    } catch (error) {
      throw new WarehouseError(error);
    }
  }

  public static async update(warehouseId: Types.ObjectId, payload: WarehouseEntryDto) {
    try {
      await RepositoryService.warehouse.updateAndReturnUpdatedDocument(warehouseId, payload);
      return payload;
    } catch (error) {
      throw new WarehouseError(error);
    }
  }

  public static async delete(warehouseId: Types.ObjectId) {
    try {
      await RepositoryService.warehouse.updateAndReturnUpdatedDocument(warehouseId, { isActive: false });
      return warehouseId;
    } catch (error) {
      throw new WarehouseError(error);
    }
  }
}
