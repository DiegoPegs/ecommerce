import Item from '../../../domain/entity/Item'
import ItemRepository from '../../../domain/repository/ItemRepository'

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[]

  constructor() {
    this.items = [
      new Item(1, 'Instrumento Musical', 'Guitarra', 1000),
      new Item(2, 'Instrumento Musical', 'Amplificador', 5000),
      new Item(3, 'Instrumento Musical', 'Cabo', 30)
    ]
  }

  async getById(idItem: number) {
    const item = this.items.find((item) => item.idItem === idItem)
    return item
  }
}
