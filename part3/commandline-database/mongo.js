const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> <PersonName> <PersonPhone>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const phn = process.argv[4];
console.log("name, phone:", name, phn);

const url = `mongodb+srv://usermongo:${password}@cluster0.ztdpa.mongodb.net/fullstackopen?retryWrites=true&w=majority`;

console.log("mongoose connecting...");
mongoose
  .connect(url)
  .then((e) => console.log("mongoose connected"))
  .catch((err) => console.log("mongoose has error:", err));

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Phone = mongoose.model("Phonebook", phoneBookSchema);

const newPhone = new Phone({
  name: name,
  number: phn,
});

newPhone.save().then((result) => {
  console.log(`Added ${name} number ${phn} to phonebook`);
});

Phone.find({}).then((phones) => {
  console.log("Phonebook:");
  phones.forEach((e) => console.log(e.name, e.number));
  mongoose.connection.close();
});
