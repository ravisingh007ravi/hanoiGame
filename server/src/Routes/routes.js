const express = require('express');
const router = express.Router();
const { Usersignup, Userlogin } = require('../Controller/UserController');



router.post('/createuser', Usersignup);
router.post('/Userlogin', Userlogin);
// router.put('/updateApi/:userid', updateApi);

router.all('/*', (req, res) => {
    return res.status(404).send({ status: false, msg: "Invalid URL" });
});

module.exports = router