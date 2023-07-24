import { BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RepositoryService } from 'libs/dh-db/src/service/repository/repository.service';
import { Types } from 'mongoose';
import { ArticleDto, ArticleEntryDto } from '../../models/article/article.dto';
import { ArticleListPaginationVM, ArticleVM, PayloadArticleVm } from '../../models/article/article.vm';
import { MBaseListPayload } from '../../models/base/base-list-payload';
import { UtilService } from '../../shared/service/common/util.service';
import { ArticleError } from './article-error.service';

export class ArticleService {
  public static async findAll(params: MBaseListPayload, filter: any = {}) {
    let dataArticleVm: ArticleVM[] = [];
    
    const query: any = {
      isActive: true,
    };

    if (filter.articleCategoryId) query.articleCategoryId = filter.articleCategoryId
    if (filter.tagId) {
      query.tagsId = { $in: [filter.tagId] } 
    }

    if (params.keyword) query['title']= {$regex: params.keyword, $options: 'i'};
    if (!params.take) params.take = 10;
    if (!params.skip) params.skip = 0;

    let sort = 'createdAt';
    let sortDir = -1;

    if (params.sort) {
      const tableSort = JSON.parse(params.sort[0])
      sort = tableSort.field;
      sortDir = tableSort.dir === 'asc' ? 1 : -1
    }

    const total = await RepositoryService.article.model.countDocuments(query);
    const data = await RepositoryService.article
      .find(query)
      .populate('articleCategory')
      .populate('tags')
      .sort({ [sort]: sortDir })
      .skip(params.skip)
      .limit(params.take)
      .lean();

    data.map((d) => {
      const articleDto = plainToClass(ArticleDto, d)
      const a = articleDto.transformDtoToVM();
      dataArticleVm.push(a)
    })

    return {
      data: dataArticleVm,
      take: params.take,
      skip: params.skip,
      total
    };
  }

  public static async findAllPublic(params: PayloadArticleVm): Promise<ArticleListPaginationVM> {
    const response = new ArticleListPaginationVM();
    const articleVm: ArticleVM[] = [];
    const query: any = {
      isActive: true,
    };

    if (params.articleCategoryId) {
      query['articleCategoryId'] = params.articleCategoryId;
    }

    if (params.tagId) {
      query['tagsId'] = { $in: [params.tagId] } 
    }
   
    if (params.keyword) {
      query['title']= {$regex: params.keyword, $options: 'i'};
    };

    if (!params.take) {
      params.take = 10;
    }

    if (!params.skip) {
      params.skip = 0;
    }

    const total = await RepositoryService.article.model.countDocuments(query);
    const data = await RepositoryService.article
      .find(query)
      .populate('articleCategory')
      .populate('tags')
      .sort({ createdAt: -1 })
      .skip(+params.skip)
      .limit(+params.take)
      .lean();

    const articleDto = plainToClass(ArticleDto, data);
    for (const article of articleDto) {
      articleVm.push(article.transformDtoToVM());
    }

    response.data = articleVm;
    response.total = total;
    response.skip = +params.skip || 0;
    response.take = +params.take || 10;
    return response;
  }

  public static async findByRoute(route: string) {
    let articleVm: ArticleVM;

    const data = await RepositoryService.article.findOne({route})
    .populate('articleCategory')
    .populate('tags')
    .lean();

    if (!data) {
      throw new BadRequestException('Article not found!');
    }

    const articleDto = plainToClass(ArticleDto, data);
    articleVm = articleDto.transformDtoToVM();

    return articleVm;
  }

  public static async findById(id: Types.ObjectId) {
    let articleVm: ArticleVM;

    const data = await RepositoryService.article.findByObjectId(id)
    .populate('articleCategory')
    .populate('tags')
    .lean();

    if (!data) {
      throw new BadRequestException('Article not found!');
    }

    const articleDto = plainToClass(ArticleDto, data);
    articleVm = articleDto.transformDtoToVM();

    return articleVm;
  }

  public static async save(payload: ArticleEntryDto) {
    try {

      payload.route = UtilService.slugify(payload.title);

      await RepositoryService.article.create(payload);
    } catch (error) {
      throw new ArticleError(error);
    }
  }

  public static async update(articleId: Types.ObjectId, payload: ArticleEntryDto) {
    try {
      payload.route = UtilService.slugify(payload.title);
      await RepositoryService.article.updateAndReturnUpdatedDocument(articleId, payload);
      return payload;
    } catch (error) {
      throw new ArticleError(error);
    }
  }

  public static async delete(articleId: Types.ObjectId) {
    try {
      await RepositoryService.article.remove(articleId);
      return articleId;
    } catch (error) {
      throw new ArticleError(error);
    }
  }
}
