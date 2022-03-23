import Dimension from './Dimension'

export default class Item {
  constructor(
    readonly idItem: number,
    readonly category: string,
    readonly description: string,
    readonly price: number,
    readonly dimension?: Dimension,
    readonly weigth?: number
  ) {}

  getVolume() {
    if (!this.dimension) return 0
    return this.dimension.getVolume()
  }

  getDensity() {
    if (this.dimension && this.weigth) {
      return this.weigth / this.dimension.getVolume()
    }
    return 0
  }
}
