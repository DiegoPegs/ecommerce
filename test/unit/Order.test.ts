import Coupon from '../../src/domain/entity/Coupon'
import Dimension from '../../src/domain/entity/Dimension'
import Item from '../../src/domain/entity/Item'
import Order from '../../src/domain/entity/Order'

test('Não deve criar um pedido com cpf inválido', function () {
  expect(() => new Order('331.137.018-55')).toThrow(new Error('CPF Inválido'))
})

test('Deve criar um pedido com 3 itens', function () {
  const order = new Order('331.137.018-05')
  order.addItem(new Item(1, 'Instrumento Musical', 'Pandeiro', 120), 1)
  order.addItem(new Item(2, 'Instrumento Musical', 'Surdo', 300), 1)
  order.addItem(new Item(3, 'Instrumento Musical', 'Cavaquinho', 3000), 2)
  expect(order.getTotal()).toBe(6420)
})

test('Deve criar um pedido com 3 itens e calcular o frete', function () {
  const order = new Order('331.137.018-05')
  order.addItem(new Item(1, 'Instrumento Musical', 'Guitarra', 1000, new Dimension(100, 30, 10), 3), 1)
  order.addItem(new Item(2, 'Instrumento Musical', 'Amplificador', 5000, new Dimension(100, 50, 50), 20), 1)
  order.addItem(new Item(3, 'Instrumento Musical', 'Cabo', 30, new Dimension(10, 10, 10), 1), 3)
  const total = order.getTotal()
  expect(total).toBe(6350)
})

test('Deve criar um pedido com 3 itens e calcular o frete mínimo', function () {
  const order = new Order('331.137.018-05')
  order.addItem(new Item(3, 'Instrumento Musical', 'Cabo', 30, new Dimension(10, 10, 10), 0.9), 1)
  const total = order.getTotal()
  expect(total).toBe(40)
})

test('Deve criar um pedido com 3 itens com cupom de desconto', function () {
  const order = new Order('331.137.018-05', new Date('2022-03-01T10:00:00'))
  order.addItem(new Item(1, 'Instrumento Musical', 'Pandeiro', 120), 1)
  order.addItem(new Item(2, 'Instrumento Musical', 'Surdo', 300), 1)
  order.addItem(new Item(3, 'Instrumento Musical', 'Cavaquinho', 3000), 2)
  const coupon = new Coupon('VALE20', 20, new Date('2022-04-01T10:00:00'))
  order.addCoupon(coupon)
  expect(order.getTotal()).toBe(5136)
})

test('Deve criar um pedido com 3 itens com cupom de desconto expirado', function () {
  const order = new Order('331.137.018-05', new Date('2022-03-01T10:00:00'))
  order.addItem(new Item(1, 'Instrumento Musical', 'Pandeiro', 120), 1)
  order.addItem(new Item(2, 'Instrumento Musical', 'Surdo', 300), 1)
  order.addItem(new Item(3, 'Instrumento Musical', 'Cavaquinho', 3000), 2)
  const coupon = new Coupon('VALE20', 20, new Date('2021-12-01T10:00:00'))
  order.addCoupon(coupon)
  expect(order.getTotal()).toBe(6420)
})

test('Deve criar um pedido e gerar um código', function () {
  const order = new Order('331.137.018-05', new Date('2022-03-01T10:00:00'))
  order.addItem(new Item(1, 'Instrumento Musical', 'Guitarra', 1000, new Dimension(100, 30, 10), 3), 1)

  expect(order.code.value).toBe('202200000001')
})
