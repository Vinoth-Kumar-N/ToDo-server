const mongoose = require('mongoose');
const { Schema } = mongoose;

const toDoListSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String, required: true},
    isCompleted: {type: Boolean, default: false},
    completedOn: String,
    createdBy: {
        type: Schema.ObjectId,
        ref: 'Users'
    },
},
{
    timestamps: true
});


const ToDo = mongoose.model('ToDo', toDoListSchema);

module.exports = ToDo;