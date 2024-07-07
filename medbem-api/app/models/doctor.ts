import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Consult from './consult.js'

export default class Doctor extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare register: number

  @hasMany(() => Consult, { foreignKey: 'doctorId' })
  declare consults: HasMany<typeof Consult>
}
