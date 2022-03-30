import PlaceOrder from '../../src/application/usecase/place-order/PlaceOrder'
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory'

test('Deve criar um pedido', async function () {
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
    coupon: 'VALE20',
    issueDate: new Date('2021-03-01T10:00:00')
  }
  const output = await placeOrder.execute(placeOrderInput)
  expect(output.total).toBe(5132)
})

test('Deve criar um pedido e gerar um código', async function () {
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
    coupon: 'VALE20',
    issueDate: new Date('2021-03-01')
  }
  await placeOrder.execute(placeOrderInput)
  const output = await placeOrder.execute(placeOrderInput)
  expect(output.code).toBe('202100000002')
})
