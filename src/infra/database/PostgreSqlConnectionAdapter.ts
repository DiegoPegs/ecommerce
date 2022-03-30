import Connection from './Connection'
import pgp from 'pg-promise'

export default class PostgreSqlConnectionAdapter implements Connection {
  connection: any
  constructor() {
    this.connection = pgp()('postgres://postgres:123456@localhost:5432/app')
  }

  async query(stmt: string, params: any): Promise<any> {
    return this.connection.query(stmt, params)
  }

  async close(): Promise<void> {
    this.connection.$pool.end()
  }
}
