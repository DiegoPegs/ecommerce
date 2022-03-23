import Cpf from '../src/Cpf'

test('Should validate a correct cpf', function () {
  const cpf = new Cpf('33113701805')

  expect(cpf.getValue()).toBe('33113701805')
})

test('Should not validate a wrong cpf', function () {
  expect(() => new Cpf('33113701806')).toThrow(new Error('CPF Inválido'))
})

const sameDigitsCpf = [
  '111.111.111-11',
  '222.222.222-22',
  '333.333.333-33',
  '444.444.444-44',
  '555.555.555-55',
  '666.666.666-66',
  '777.777.777-77',
  '888.888.888-88',
  '999.999.999-99',
  '000.000.000-00'
]

describe.each(sameDigitsCpf)('Validate cpf with same number', function (cpf) {
  test(`${cpf}`, function () {
    expect(() => new Cpf(cpf)).toThrow(new Error('CPF Inválido'))
  })
})
