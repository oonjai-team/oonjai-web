enum Operator {}

export class VersionNumber {
  public vtext: string
  private selector = /^[0-9a-z.]+$/
  public operator: Operator
  public vscore: number
  public vclass: string

  constructor(version: string) {
    this.vtext = version
    const pr = this.parse(version)

    if (!pr.operator) {
      throw new Error("Invalid version number")
    }

    this.operator = pr.operator
    this.vscore = pr.vscore
    this.vclass = pr.vclass
  }

  public parse(version: string) {
    let parsedOp: Operator | undefined
    let versionNum = ""

    if (version.substring(1, 2).match(this.selector) !== null) {
      if (version.substring(0, 1).match(this.selector) === null) {
        // One operator
        const op = version.substring(0, 1)
        versionNum = version.substring(1)
        switch (op) {
          case "=":
            parsedOp = Operator.EQ
            break
          case ">":
            parsedOp = Operator.GT
            break
          case "<":
            parsedOp = Operator.LT
            break
        }
      } else {
        versionNum = version
      }
    } else {
      if (version.substring(0, 1).match(this.selector) === null) {
        // Two operator
        const op = version.substring(0, 2)
        versionNum = version.substring(2)
        switch (op) {
          case "==":
            parsedOp = Operator.EQ
            break
          case ">=":
            parsedOp = Operator.GTE
            break
          case "<=":
            parsedOp = Operator.LTE
            break
          case "=<":
            parsedOp = Operator.LTE
            break
          case "=>":
            parsedOp = Operator.GTE
            break
        }
      }
    }

    const vNumNoText = versionNum.replace(/[^\d.-]/g, "")
    const vClass = versionNum.replace(vNumNoText, "")

    const ev = vNumNoText.split(".")
    let vScore = 0

    ev.forEach((v, i) => {
      const t = ev.length - i - 1
      const score = Math.pow(10, t) * parseInt(v)
      vScore += score
    })

    return {
      operator: parsedOp,
      vclass: vClass,
      vscore: vScore,
    }
  }

  public compareTo(version: string): boolean {
    const tr = this.parse(version)

    if (tr.operator) {
      throw new Error("Target version number should not have operator")
    }

    if (tr.vclass !== this.vclass) {
      return false
    }

    switch (this.operator) {
      case Operator.EQ:
        return this.vscore === tr.vscore
      case Operator.GT:
        return tr.vscore > this.vscore
      case Operator.LT:
        return tr.vscore < this.vscore
      case Operator.GTE:
        return tr.vscore >= this.vscore
      case Operator.LTE:
        return tr.vscore <= this.vscore
    }

    return false
  }
}
