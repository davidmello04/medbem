import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consults'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.dateTime('entry_date').nullable()
      table.dateTime('out_date').nullable()
      table.text('note').nullable()
      table.timestamps(true, true)
      table.integer('doctor_id').unsigned().references('id').inTable('doctors').onDelete('CASCADE')
      table
        .integer('patient_id')
        .unsigned()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
