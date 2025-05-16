const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const {json} = require('express')

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password) {
    res.status(400)
    throw new Error("Syötä tarvittavat tiedot")
  }

  const userExists = await User.findOne({ email })
  
  if (userExists) {
    res.status(400)
    throw new Error("Käyttäjä jo olemassa")
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  res.status(201).json(user)

}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email })
  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json(user)
  } else {
    res.status(401).json({message: "Kirjautuminen virheellinen"})
  }
}

module.exports = {registerUser, loginUser}