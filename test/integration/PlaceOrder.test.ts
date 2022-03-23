import PlaceOrder from '../../src/application/usecase/PlaceOrder'
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory'

test('Deve criar um pedido', function () {
  const itemRepository = new ItemRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const orderRepository = new OrderRepositoryMemory()

  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository)
  const placeOrderInput = {
    cpf: '331.137.018-05',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    coupon: 'VALE20'
  }
  const output = placeOrder.execute(placeOrderInput)
  expect(output.total).toBe(4872)
})
