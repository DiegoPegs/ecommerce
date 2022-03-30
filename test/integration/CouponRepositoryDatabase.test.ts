import Connection from '../../src/infra/database/Connection'
import PostgreSqlConnectionAdapter from '../../src/infra/database/PostgreSqlConnectionAdapter'
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase'

let connection: Connection

beforeEach(function () {
  connection = new PostgreSqlConnectionAdapter()
})

test('Deve testar o repository de Coupon', async function () {
  const couponRepository = new CouponRepositoryDatabase(connection)
  const coupon = await couponRepository.getByCode('VALE20')
  expect(coupon?.percentage).toBe(20)
})

afterEach(async function () {
  await connection.close()
})
