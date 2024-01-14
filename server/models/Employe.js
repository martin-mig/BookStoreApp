const {Schema, model} = require("mongoose");

const EmployeSchema = Schema({
    id: Number,
    name: String,
    country: Object,
    company: String,
    department: String,
    salary: String,
    date: String,
    jobstatus: String,
    status: String,
    verified: String,
    activity: Number,
    representative: Object,
    balance: Number,
});

module.exports = model("Employe", EmployeSchema, "employes"); 