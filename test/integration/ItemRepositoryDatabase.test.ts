import Connection from '../../src/infra/database/Connection'
import PostgreSqlConnectionAdapter from '../../src/infra/database/PostgreSqlConnectionAdapter'
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase'

let connection: Connection

beforeEach(function () {
  connection = new PostgreSqlConnectionAdapter()
})

test('Deve testar o repository de item', async function () {
  const itemRepository = new ItemRepositoryDatabase(connection)
  const item = await itemRepository.getById(1)
  expect(item?.description).toBe('Guitarra')
})

afterEach(async function () {
  await connection.close()
})
