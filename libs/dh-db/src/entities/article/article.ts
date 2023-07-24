import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';
import { ArticleCategory } from './article-category';
import { Tag } from './tag';

@modelOptions({
  schemaOptions: {
    collection: 'Article',
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
})

export class Article {
  @prop({ type: Schema.Types.String, index: true, required: true }) title: string;
  @prop({ type: Schema.Types.String }) description: string;
  @prop({ type: Schema.Types.String }) caption: string;
  @prop({ type: Schema.Types.String }) route: string;
  @prop({ type: Schema.Types.String }) authorName: string;
  @prop({ type: Schema.Types.String, default: true }) isActive: boolean;

  @prop({ type: Types.ObjectId, index: true }) articleCategoryId: Types.ObjectId;
  @prop({ ref: ArticleCategory, localField: 'articleCategoryId', foreignField: '_id', justOne: true }) articleCategory: ArticleCategory;
  
  @prop({ type: Types.ObjectId, index: true }) tagsId: Types.ObjectId[];
  @prop({ ref: Tag, localField: 'tagsId', foreignField: '_id', }) tags: Tag[];

  @prop({ type: Schema.Types.String, required: true }) fileUrls: string[]
}
