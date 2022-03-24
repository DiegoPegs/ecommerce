export default class OrderCode {
  value: string
  constructor(issueDate: Date, sequence: number) {
    this.value = this.generateCode(issueDate, sequence)
  }

  generateCode(issueDate: Date, sequence: number) {
    const year = issueDate.getFullYear()

    return `${year}${String(sequence).padStart(8, '0')}`
  }
}
