import { Types } from 'mongoose';
import { ArticleCategoryDto } from '../article-category/article-category.dto';
import { TagDto } from '../tag/tag.dto';
import { BaseBasicClass } from '../base/base-basic-class';
import { ArticleCategoryVM, ArticleVM, ArticleTagVM } from './article.vm';

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
  tagsId: string[];
  tags: TagDto[];
  createdAt: Date;
  updatedAt: Date;

  transformDtoToVM() {
    const article = new ArticleVM();
    let category: ArticleCategoryVM;
    let newTag: ArticleTagVM;

    article._id = this._id.toHexString();
    article.title = this.title;
    article.caption = this.caption;
    article.description = this.description;
    article.tags = [];
    article.route = this.route;
    article.authorName = this.authorName
    article.fileUrls = this.fileUrls
    article.createdAt = this.createdAt
    article.updatedAt = this.updatedAt

    if(this.articleCategory) {
      category = new ArticleCategoryVM();
      category._id = this.articleCategory?._id;
      category.name = this.articleCategory.name;
      article.articleCategory = category;
    }
    
    if (this.tags) {
      for (let tag of this.tags) {
        newTag = new ArticleTagVM() 
        newTag._id = tag?._id;
        newTag.name = tag.name;
        article.tags.push(newTag);
      }
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
  tagsId: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
