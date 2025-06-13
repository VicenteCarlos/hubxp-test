export abstract class Transformer {
  public async item(data: unknown) {
    return data;
  }

  public async transform(item: unknown) {
    return await this.item(item);
  }

  public async collection(itens: unknown[]) {
    let data: any[] = [];

    for (const item of itens) {
      data.push(await this.transform(item));
    }

    return data;
  }
}
