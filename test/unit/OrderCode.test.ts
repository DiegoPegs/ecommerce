import OrderCode from '../../src/domain/entity/OrderCode'

test('Deve criar um código', function () {
  const orderCode = new OrderCode(new Date('2022-03-01'), 1)
  expect(orderCode.value).toBe('202200000001')
})
