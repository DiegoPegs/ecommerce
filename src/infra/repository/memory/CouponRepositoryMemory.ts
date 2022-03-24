import Coupon from '../../../domain/entity/Coupon'
import CouponRepository from '../../../domain/repository/CouponRepository'

export default class CouponRepositoryMemory implements CouponRepository {
  coupon: Coupon[]

  constructor() {
    this.coupon = [new Coupon('VALE20', 20)]
  }

  async getByCode(code: string) {
    const coupon = this.coupon.find((coupon) => coupon.code === code)
    return coupon
  }
}
