require('../db/mongoose');
const Task = require('../models/task');


Task.findByIdAndDelete('605c3fa2c9306c1190124cc0').then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
}).then((result) => {
    console.log(result);
}).catch(err => {
    console.log(err);
});