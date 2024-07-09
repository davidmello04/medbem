import router from '@adonisjs/core/services/router'
const DoctorsController = () => import('#controllers/doctors_controller')

router.post('/consults', [DoctorsController, 'createConsult'])
router.get('/consults', [DoctorsController, 'getAllConsults'])
router.put('/consults/:id', [DoctorsController, 'updateConsult'])
router.delete('/consults/:id', [DoctorsController, 'deleteConsult'])

router.post('/doctors', [DoctorsController, 'createDoctor'])
router.get('/doctors', [DoctorsController, 'getAllDoctors'])

router.post('/patients', [DoctorsController, 'createPatient'])
router.get('/patients', [DoctorsController, 'getAllPatients'])
router.put('/patients/:id', [DoctorsController, 'updatePatient'])
router.delete('/patients/:id', [DoctorsController, 'deletePatient'])
