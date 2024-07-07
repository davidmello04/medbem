import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Consult from './consult.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Patient extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare cardId: number

  @hasMany(() => Consult, { foreignKey: 'patientId' })
  declare consults: HasMany<typeof Consult>
}
