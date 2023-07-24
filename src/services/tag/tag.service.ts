import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TagEntryDto } from '../../models/tag/tag.dto';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { TagError } from './tag-error.service';

export class TagService {
  public static async findAll(params: MBaseListPayload) {
    const query: any = {
      isActive: true,
    };

    if (params.keyword) {
      query['name']= {$regex: params.keyword, $options: 'i'};
    }

    const total = await RepositoryService.tag.model.countDocuments(query);
    const data = await RepositoryService.tag
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
    return await RepositoryService.tag.findByObjectId(id).lean();
  }

  public static async save(payload: TagEntryDto) {
    try {
      const x = await RepositoryService.tag.create(payload);
      return x
    } catch (error) {
      throw new BadRequestException(error.message, error.message);
    }
  }

  public static async update(tagId: Types.ObjectId, payload: TagEntryDto) {
    try {
      await RepositoryService.tag.updateAndReturnUpdatedDocument(tagId, payload);
      return payload;
    } catch (error) {
      throw new BadRequestException(error.message, error.message);
    }
  }

  public static async delete(tagId: Types.ObjectId) {
    const query: any = {
      isActive: true,
      tagId: tagId,
    };
    const total = await RepositoryService.article.model.countDocuments(query);

    if (total > 0) {
      throw new BadRequestException('Tag already used!');
    }
    
    try {
      await RepositoryService.tag.remove(tagId);
      return tagId;
    } catch (error) {
      throw new TagError(error);
    }
  }
}
