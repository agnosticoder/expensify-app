import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const database = firebase.database();

export { firebase, googleAuthProvider, database as default };






























//============================================================================================================
// database.ref('expenses')
//     .once('value')
//     .then(snapshot => {
//         const expenses = [];
//         snapshot.forEach(snapshotChild => {
//             expenses.push({
//                 id: snapshotChild.key,
//                 ...snapshotChild.val()
//             });
//         })
//         console.log(expenses);
//     })
//     .catch(e => console.log(e));

// //Subscrible to the expenses in database
// //Other Events: 'value', 'child_added', 'child_removed', 'child_changed', 'child_moved'
// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach(snapshotChild => {
//         expenses.push({
//             id: snapshotChild.key,
//             ...snapshotChild.val()
//         });
//     });
//     console.log('Subscribed ',expenses);
// }, (e) => {
//     console.log('Error', e);
// });



//==============================================Get data into firebase that firebase likes to work with
// database.ref('expenses').push({
//     description: 'Bill got you',
//     note: 'notes got you',
//     amount: 2344,
//     createdAt: 2344
// });



//==================================================================Working With Array with Push methods
//push method adds the data to the randomly genrated id at reference location
// database.ref('notes').push({
//     title: 'Todo',
//     body: 'Go for a run'
// });

// database.ref('notes').push({
//     title: 'Course Topic',
//     body: 'React Native, Angular, Python'
// }); 


// database.ref('notes/-Lil3P_rYdqupNWA3W4V').update({
//     body: 'Buy Food'
// });







// //===================================================================================Create(C)
// //Set data at the root
// database.ref().set({
//     name: 'Satinder Singh',
//     age: '24',
//     isSingle: true,
//     location: {
//         city: 'Toronto',
//         country: 'Canada'
//     }
// }).then((() => {
//     console.log('Data is saved');
// })).catch((error) => {
//     console.log('This failed',error);
// });

// // database.ref().set('This is my data');

// // database.ref('age').set(25);
// // database.ref('location/city').set('yo');

// //Set data at some location by giving argument to ref
// database.ref('attributes').set({
//     height: '5 feet 7 inches',
//     weight: '68kg'
// }).then(() => console.log('Data is saved')).catch(error => {console.log('This is some error',error)});

// //=================================================================================Delete(D)
// //Removing data from the database
// database.ref('isSingle')
//     .remove()
//     .then(() => console.log('Data Successfully Removed'))
//     .catch(err => console.log('This is some error', err)); 
// //You can also remove data by providing "null" as argument to "set" method

// //==================================================================================Update(U)
// //I can also add new data
// //Also you can delete something by setting that property to null
// database.ref().update({
//     name: 'Mike',
//     age: 29,
//     job: 'Frontend Developer',
//     //To update the nested properties we need the reference of that element as below
//     'location/city': 'San Francisco'
// });

// //===================================================================================Read(R)
// //We can fetch in once(not watching the changes)
// database.ref('location').once('value')
//     .then(snapshot => console.log(snapshot.val()))
//     .catch(e => console.log(e));

// //OR we can subscribe to the database(watching for changes)
// const onValueChange =  database.ref('location').on('value', (data) => {
//     console.log(data.val());
// }, (e) => {
//     console.log('Error with data fetching', e);
// });
// //We can also unsubscribe to the database
// //unsubscriobe all subscription
// database.ref().off();
// //unsubscribe selectively - by passing onValueChange return from the on() function
// database.ref().off('value', onValueChange); 



