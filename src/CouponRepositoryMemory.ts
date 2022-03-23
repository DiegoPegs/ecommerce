import Coupon from './Coupon'
import CouponRepository from './CouponRepository'

export default class CouponRepositoryMemory implements CouponRepository {
  coupon: Coupon[]

  constructor() {
    this.coupon = [new Coupon('VALE20', 20)]
  }

  getByCode(code: string) {
    const coupon = this.coupon.find((coupon) => coupon.code === code)
    return coupon
  }
}
