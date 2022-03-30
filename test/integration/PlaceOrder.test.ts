import PlaceOrder from '../../src/application/usecase/place-order/PlaceOrder'
import CouponRepository from '../../src/domain/repository/CouponRepository'
import ItemRepository from '../../src/domain/repository/ItemRepository'
import OrderRepository from '../../src/domain/repository/OrderRepository'
import Connection from '../../src/infra/database/Connection'
import PostgreSqlConnectionAdapter from '../../src/infra/database/PostgreSqlConnectionAdapter'
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase'
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory'
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory'
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory'

let connection: Connection
let itemRepository: ItemRepository
let couponRepository: CouponRepository
let orderRepository: OrderRepository

beforeEach(function () {
  connection = new PostgreSqlConnectionAdapter()
  itemRepository = new ItemRepositoryDatabase(connection)
  // itemRepository = new ItemRepositoryMemory()
  couponRepository = new CouponRepositoryMemory()
  orderRepository = new OrderRepositoryMemory()
})

test('Deve criar um pedido', async function () {
  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository)
  const placeOrderInput = {
    cpf: '935.411.347-80',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ],
    coupon: 'VALE20',
    issueDate: new Date('2021-03-01T10:00:00')
  }
  const output = await placeOrder.execute(placeOrderInput)
  expect(output.total).toBe(5152)
})

test('Deve criar um pedido e gerar um código', async function () {
  const itemRepository = new ItemRepositoryMemory()
  const couponRepository = new CouponRepositoryMemory()
  const orderRepository = new OrderRepositoryMemory()

  const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository)
  const placeOrderInput = {
    cpf: '935.411.347-80',
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

afterEach(function () {
  connection.close()
})
