//let is block scoped and var is function scoped
// let  age=10;
// let name = age>10&&"sachin";
//turnery statement
let name2 = (age > 10) ? "tharuka" : (age < 10) ? "hiruks" : "yumeth";

const person = {
    name: "predro",
    age: 20,
    isMarried: false
}
const person2 = { ...person, name: "tharuka" };

// console.log(name, age, isMarried);
// const { name, age, isMarried } = person;
let names = ["tharuka", "hiruka", "yumeth", "sachin", "sachin", "sachintha"];
const newNames = names.map((name) => {
    names = names + "new"


})
const filter =names.filter(name=>{
    names==="tharuka"
})
//.map, .filter, .reduce


