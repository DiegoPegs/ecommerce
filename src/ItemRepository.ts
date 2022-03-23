import Item from './Item'

export default interface ItemRepository {
  getById(idItem: number): Item | undefined
}
