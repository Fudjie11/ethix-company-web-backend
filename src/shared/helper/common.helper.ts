const ObjectId = require('mongoose').Types.ObjectId;

export class CommonHelper {
  public static parseObjectId(v: string) {
    try {
      const objId = new ObjectId(v);
      return objId;
    } catch (e) {
      return undefined;
    }
  }
}