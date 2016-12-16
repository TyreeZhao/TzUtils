/**
 * Simulates enum types
 *
 * @type {string}
 * @private
 */
const CorpType_ALL = 'ALL'
const CorpType_A1 = 'A1'
const CorpType_B = 'B'
const CorpType_C = 'C'
const CorpType_D = 'D'
const CorpType_E = 'E'
const CorpType_A2 = 'A2'

/**
 * CorpType
 */
class CorpType {
  get ALL() { return CorpType_ALL }
  get A1()  { return CorpType_A1 }
  get B()   { return CorpType_B }
  get C()   { return CorpType_C }
  get D()   { return CorpType_D }
  get E()   { return CorpType_E }
  get A2()  { return CorpType_A2 }

  corpTypeMapping = {
    '-1': CorpType_ALL,
    0: CorpType_A1,
    1: CorpType_B,
    2: CorpType_C,
    3: CorpType_D,
    4: CorpType_E,
    5: CorpType_A2,
  }

  label(intType) {
    if (this.corpTypeMapping.hasOwnProperty(intType)) {
      return this.corpTypeMapping[intType]
    }
    return ''
  }
}
