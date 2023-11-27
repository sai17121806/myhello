const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Data = new schema({
    inputName:
    {
        type: String,
        required: true
    },
    inputEmail:
    {
        type: String,
        required: true
    },
    inputPassword:
    {
        type: String,
        required: true
    }
});
const Datas = mongoose.model("User", Data);
module.exports = Datas;