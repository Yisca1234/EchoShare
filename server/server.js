const app = require('./app');
const http = require('http');
const PORT = "5000";
const connectToDB = require('./db');
const Auth = require('./models/auth');

//const { PORT } = require('./utils/config');

connectToDB()
// .then(() => {
//   const newAuth = new Auth({
//     username: 'exampleUser',
//     passwordHash: 'hashedPassword123', // Example password hash
//   });

//   newAuth.save()
//     .then(savedAuth => {
//       
//     })
//     .catch(error => {
//       console.error('Error saving auth document:', error);
//     });
// });


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});