import CouponRepository from './CouponRepository'
import ItemRepository from './ItemRepository'
import Order from './Order'
import OrderRepository from './OrderRepository'
import PlaceOrderInput from './PlaceOrderInput'
import PlaceOrderOutput from './PlaceOrderOutput'

export default class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository,
    readonly orderRepository: OrderRepository
  ) {}

  execute(input: PlaceOrderInput): PlaceOrderOutput {
    const order = new Order(input.cpf)

    for (const orderItem of input.orderItems) {
      const item = this.itemRepository.getById(orderItem.idItem)
      if (!item) throw Error('Item not found')
      order.addItem(item, orderItem.quantity)
    }
    if (input.coupon) {
      const coupon = this.couponRepository.getByCode(input.coupon)
      if (coupon) order.addCoupon(coupon)
    }
    const total = order.getTotal()
    this.orderRepository.save(order)
    const output = new PlaceOrderOutput(total)

    return output
  }
}
