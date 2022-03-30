import ItemRepository from '../../../domain/repository/ItemRepository'
import SimulateFreightInput from './SimulateFreightInput'
import SimulateFreightOutput from './SimulateFreightOutput'
import Freight from '../../../domain/entity/Freight'

export default class SimulateFreight {
  constructor(readonly itemrepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    const freight = new Freight()
    for (let orderItem of input.orderItems) {
      const item = await this.itemrepository.getById(orderItem.idItem)
      if (!item) throw Error('Item not found')
      freight.addItem(item, orderItem.quantity)
    }
    const output = new SimulateFreightOutput(freight.getTotal())
    return output
  }
}
