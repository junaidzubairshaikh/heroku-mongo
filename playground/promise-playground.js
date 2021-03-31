
require('../db/mongoose');
const User = require('../models/user');

// id = 
User.findByIdAndUpdate('605c3e30ff88156674a55852', { age: 0 }, (result) => {
    console.log(result);
    return User.countDocuments({ age: 6 });
}).then((result) => {
    console.log('Documents found with age 6 are ', result)
})