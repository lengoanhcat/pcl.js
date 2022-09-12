import {
  PointCloud,
  wrapPointCloud,
  PointTypesUnion,
  PointTypesIntersection,
  Vector,
} from '../point-types';

class FilterBase<
  T extends Partial<PointTypesUnion> = Partial<PointTypesIntersection>,
> {
  public native: Emscripten.NativeAPI;

  constructor(native: Emscripten.NativeAPI) {
    this.native = native;
  }

  public setInputCloud(cloud: PointCloud<T>): null {
    return this.native.setInputCloud(cloud.native);
  }

  public getInputCloud() {
    return wrapPointCloud<T>(this.native.getInputCloud());
  }

  public filter(cloud?: PointCloud<T>) {
    return wrapPointCloud<T>(this.native.filter(cloud?.native ?? null));
  }

  public getRemovedIndices(): Vector<number> {
    return this.native.getRemovedIndices();
  }
}

export default FilterBase;
