import Order from './Order'
import OrderRepository from './OrderRepository'

export default class OrderRepositoryMemory implements OrderRepository {
  order: Order[]
  constructor() {
    this.order = []
  }
  save(order: Order): void {
    this.order.push(order)
  }
}
