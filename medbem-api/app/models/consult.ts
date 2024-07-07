import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Doctor from './doctor.js'
import Patient from './patient.js'

export default class Consult extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare entryDate: number

  @column()
  declare outDate: number

  @column()
  declare note: string

  @column()
  declare doctorId: number

  @column()
  declare patientId: number

  @belongsTo(() => Doctor, { foreignKey: 'doctorId' })
  declare doctor: BelongsTo<typeof Doctor>

  @belongsTo(() => Patient, { foreignKey: 'patientId' })
  declare patient: BelongsTo<typeof Patient>
}
