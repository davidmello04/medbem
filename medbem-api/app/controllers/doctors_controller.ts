import type { HttpContext } from '@adonisjs/core/http'
import Patient from '#models/patient'
import Consults from '#models/consult'
import Doctor from '#models/doctor'

export default class DoctorsController {
  // Métodos para consultas
  async createConsult({ request, response }: HttpContext) {
    const data = request.only(['entryDate', 'outDate', 'note', 'doctorId', 'patientId'])
    const consults: Consults = await Consults.create(data)
    return response.json(consults)
  }

  async getAllConsults({ response }: HttpContext) {
    const consults = await Consults.query().preload('doctor').preload('patient')
    return response.json(consults)
  }

  async updateConsult({ params, request, response }: HttpContext) {
    try {
      const consult = await Consults.findOrFail(params.id)
      const data = request.only(['entryDate', 'outDate', 'note', 'doctorId', 'patientId'])
      consult.merge(data)
      await consult.save()
      return response.json(consult)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to update consultation' })
    }
  }

  async deleteConsult({ params, response }: HttpContext) {
    const consult = await Consults.findOrFail(params.id)
    await consult.delete()
    return response.json({ message: 'Consultation deleted successfully' })
  }

  // Métodos para Pacientes
  async createPatient({ request, response }: HttpContext) {
    const data = request.only(['name', 'cardId'])
    const patient: Patient = await Patient.create(data)
    return response.json(patient)
  }

  async getAllPatients({ response }: HttpContext) {
    const patients = await Patient.all()
    return response.json(patients)
  }

  async updatePatient({ params, request, response }: HttpContext) {
    try {
      const patient = await Patient.findOrFail(params.id)
      const data = request.only(['name', 'cardId'])
      patient.merge(data)
      await patient.save()
      return response.json(patient)
    } catch (error) {
      return response.status(500).json({ error: 'Failed to update patient' })
    }
  }

  async deletePatient({ params, response }: HttpContext) {
    try {
      const patient = await Patient.findOrFail(params.id)
      await patient.delete()
      return response.json({ message: 'Patient deleted successfully' })
    } catch (error) {
      return response.status(500).json({ error: 'Failed to delete patient' })
    }
  }

  // Métodos para Médicos
  async createDoctor({ request, response }: HttpContext) {
    const data = request.only(['name', 'register'])
    const doctor: Doctor = await Doctor.create(data)
    return response.json(doctor)
  }

  async getAllDoctors({ response }: HttpContext) {
    const doctors = await Doctor.all()
    return response.json(doctors)
  }
}
