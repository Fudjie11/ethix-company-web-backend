import { Types } from 'mongoose';
import { ArticleCategoryDto } from '../article-category/article-category.dto';
import { BaseBasicClass } from '../base/base-basic-class';
import { FileDto } from '../file/file.dto';
import { User } from '../user/user';
import { ArticleCategoryVM, ArticleVM } from './article.vm';

export class ArticleDto extends BaseBasicClass {
  _id: Types.ObjectId;
  articleCategoryId: string;
  articleCategory: ArticleCategoryDto;
  title: string;
  caption: string;
  description: string;
  route: string;
  authorName: string;
  fileUrls: string[];

  transformDtoToVM() {
    const article = new ArticleVM();
    let category: ArticleCategoryVM;

    article._id = this._id.toHexString();
    article.title = this.title;
    article.caption = this.caption;
    article.description = this.description;
    article.route = this.route;
    article.authorName = this.authorName
    article.fileUrls = this.fileUrls

    if(this.articleCategory) {
      category = new ArticleCategoryVM();
      category._id = this.articleCategory?._id;
      category.name = this.articleCategory.name;
      article.articleCategory = category;
    }

    return article;
  }
}

export class ArticleEntryDto extends BaseBasicClass {
  title: string;
  caption: string;
  articleCategoryId: Types.ObjectId;
  description: string;
  route: string;
  authorName: string;
  fileUrls: string[];
    // mainImageId: string;
}
