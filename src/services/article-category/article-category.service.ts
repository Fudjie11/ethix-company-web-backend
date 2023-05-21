import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { Types } from 'mongoose';
import { ArticleCategoryEntryDto } from '../../models/article-category/article-category.dto';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { ArticleCategoryError } from './article-category-error.service';

export class ArticleCategoryService {
  public static async findAll(params: MBaseListPayload) {
    const query: any = {
      isActive: true,
    };

    if (params.keyword) {
      query['name']= {$regex: params.keyword, $options: 'i'};
    }

    const total = await RepositoryService.articleCategory.model.countDocuments(query);
    const data = await RepositoryService.articleCategory
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
    return await RepositoryService.articleCategory.findByObjectId(id).lean();
  }

  public static async save(payload: ArticleCategoryEntryDto) {
    try {
      return RepositoryService.articleCategory.create(payload);
    } catch (error) {
      throw new ArticleCategoryError(error);
    }
  }

  public static async update(articleCategoryId: Types.ObjectId, payload: ArticleCategoryEntryDto) {
    try {
      await RepositoryService.articleCategory.updateAndReturnUpdatedDocument(articleCategoryId, payload);
      return payload;
    } catch (error) {
      throw new ArticleCategoryError(error);
    }
  }

  public static async delete(articleCategoryId: Types.ObjectId) {
    try {
      await RepositoryService.articleCategory.updateAndReturnUpdatedDocument(articleCategoryId, { isActive: false });
      return articleCategoryId;
    } catch (error) {
      throw new ArticleCategoryError(error);
    }
  }
}
