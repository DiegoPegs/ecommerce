import PostgreSqlConnectionAdapter from '../../src/infra/database/PostgreSqlConnectionAdapter'

test('Deve testar a conexão com o banco', async function () {
  const connection = new PostgreSqlConnectionAdapter()
  const items = await connection.query('select * from ccca.item', [])
  expect(items).toHaveLength(3)
  connection.close()
})
