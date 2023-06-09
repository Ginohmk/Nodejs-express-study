const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');

// Connect Db
mongoose
  .connect(
    'mongodb+srv://kanumikechibundu:QOZc1s0sHWmAV7LO@mongodb-demo.roz9auo.mongodb.net/blog-app?retryWrites=true&w=majority'
  )
  .then((res) => console.log('Db connected !!!'))
  .catch((err) => console.log(err));

//Link express
const app = express();

// Enable json response
// Middleware
app.use(express.json());

// Listen on Port
const PORT = process.env.PORT || '3000';
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// User Schema
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      'https//cdn.pixabay.com/photo/2015/08/05/04/25/people-875617_960_720.jpg',
  },
});

// Model
const User = mongoose.model('User', userSchema);

// Routes

// -----
// Cookies
// ------

// Send cookies
app.get('/send-cookie', (req, res) => {
  res.cookie('name', 'Mike');
  res.send('Cookie Sent..');
});

// Register post
app.post('/register', async (req, res) => {
  const { fullName, username, password } = req.body;
  const salt = await bcrypt.genSalt(10);

  const hashedPssword = await bcrypt.hash(password, salt);

  try {
    const userDetails = await User.create({
      fullName,
      username,
      password: hashedPssword,
    });

    return res.json(userDetails);
  } catch (err) {
    return res.json(err);
  }
});

//  Login post

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const userFound = await User.findOne({ username });

  if (!userFound) return res.json({ Message: 'User not found' });

  const isPasswordValid = await bcrypt.compare(password, userFound.password);

  if (!isPasswordValid) return res.json({ Message: 'User not found' });

  return res.json({
    message: 'Success',
    userFound,
  });
});
