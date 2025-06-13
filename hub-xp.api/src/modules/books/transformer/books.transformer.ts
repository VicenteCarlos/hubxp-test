import { Transformer } from '../../../commons/transformer';

export class BookTransformer extends Transformer {
  async item(data: any) {
    return {
      id: data._id,
      name: data.name,
      author: data.author,
      avaliation: data.avaliation,
      description: data.description,
      reviewCount: data.reviewCount,
    };
  }

  async collection(data: any) {
    return await Promise.all(
      data.map(async (item: any) => await this.item(item)),
    );
  }
}
