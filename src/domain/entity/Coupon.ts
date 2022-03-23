export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expireDate: Date = new Date()) {}

  isExpired(today: Date = new Date()) {
    return today.getTime() > this.expireDate.getTime()
  }

  calculateDiscount(amount: number): number {
    return (amount * this.percentage) / 100
  }
}
