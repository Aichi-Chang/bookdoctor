const router = require('express').Router()

const userControl = require('./lib/userContorl')
const secureRoute = require('./lib/secureRoute')
const userFunc = require('./controllers/userFunc')
const doctorFunc = require('./controllers/doctorFunc')


// ************************ doctors ************************

router.route('/doctors')
  .get(doctorFunc.index)

router.route('/doctors/:id')
  .get(doctorFunc.show)

// router.route('/doctorcalendar/:id')
  //.get(secureRoute, doctors.indexRoute)
  //appointment requests
  // .put(secureRoute, doctors.update)
  // .delete(secureRoute, doctors.remove)

// ************************ appointments? ************************



// ************************ user ************************
router.route('/register')
  .post(userFunc.register)


router.route('/login')
  .post(userFunc.login)


router.route('/user/:id')
  .get(secureRoute, userControl('doctor'), userFunc.showUser)

// router.route('/test')
//   .post(userFunc.userAddCalendar)


// ************************ dashboard ************************

//router.route('/dashboard/:userId')
// .get(secureRoute, userFunc.prescription)
//.put(secureRoute, userFunc.updateprescription)



module.exports = router