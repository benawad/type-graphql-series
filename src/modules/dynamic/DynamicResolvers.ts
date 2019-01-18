class DynamicResolvers {
  private _resolvers: any[] = [];

  get resolvers(): any[] {
    return this._resolvers;
  }

  set resolvers(resolver: any[]) {
    this._resolvers.push(...resolver);
  }

  empty() {}
}

export const newR = new DynamicResolvers();
