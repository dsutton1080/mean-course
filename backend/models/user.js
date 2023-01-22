const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({   // Schema is a blueprint, need to use a model to do actual work
  email: { type: String, required: true, unique: true },  //unique is not a validotor, we need to validate ourselves
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
