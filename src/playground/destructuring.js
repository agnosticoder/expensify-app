//Object Destructuring

const person = {
    name: 'Andrew',
    age: 26,
    location: {
        city: 'Philadelphia',
        temperature: 92
    } 
};

const { name: hisName = 'yoyolo', age} =  person;

console.log(`${hisName} is ${age} yo buddy`);

//Array Destructuring

const address = ['1299', 'Philadelphia', 'Pennsylvania', '1914'];

const [, city, state = 'Bathinda', ...yo] = address;

console.log(`You are in ${city} ${state} and ${yo}`); 
