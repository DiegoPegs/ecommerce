export default class Cpf {
  private value: string
  private FACTOR_DIGIT_2 = 11
  private FACTOR_DIGIT_1 = 10

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('CPF Inválido')
    this.value = value
  }

  getValue() {
    return this.value
  }

  validate(cpf: string): boolean {
    if (!cpf) return false
    cpf = this.cleanCpf(cpf)

    if (this.hasSameDigit(cpf)) return false

    const firstVerifiedDigit = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_1)
    const secondVerifiedDigit = this.calculateCheckDigit(cpf, this.FACTOR_DIGIT_2)

    const sendedDigit = cpf.slice(-2)

    const verifiedDigit = `${firstVerifiedDigit}${secondVerifiedDigit}`
    return sendedDigit == verifiedDigit
  }

  private cleanCpf(cpf: string) {
    return cpf.replace(/[\.\-]/gm, '')
  }
  private hasSameDigit(cpf: string) {
    const [firstDigit] = cpf
    return [...cpf].every((c) => c === firstDigit)
  }
  private calculateCheckDigit(cpf: string, factor: number) {
    let total = 0

    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--
    }

    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }
}
