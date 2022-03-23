import Coupon from './Coupon'
import Cpf from './Cpf'
import Freight from './Freight'
import Item from './Item'
import OrderItem from './OrderItem'

export default class Order {
  cpf: Cpf
  orderItems: OrderItem[]
  coupon: Coupon | undefined
  private freight: Freight
  code: string

  constructor(cpf: string, readonly issueDate: Date = new Date()) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.freight = new Freight()
    this.code = `${issueDate.getFullYear()}${String(1).padStart(8, '0')}`
  }

  getTotal() {
    let total = this.orderItems.reduce((previous, current) => previous + current.getTotal(), 0)
    if (this.coupon) total -= this.coupon.calculateDiscount(total)
    total += this.freight.getTotal()
    return total
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity)
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (!coupon.isExpired(this.issueDate)) this.coupon = coupon
  }
}
