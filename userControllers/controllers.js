const express = require('express');
const vistedschema = require('../userSchema/schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class userController {
    static async registerUser(req, res) {
        try {
            const { username, email, password } = req.body;
            const alreadyexist = await vistedschema.findOne({ email: email });
            if (alreadyexist) {
                return res.status(400).send('Email already exist');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await vistedschema.create({
                username:username,
                email:email,
                password:hashedPassword
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }

    }
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await vistedschema.findOne({ email });
            if (user == null) {
                return res.status(400).send('Cannot find user');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const accessToken =jwt.sign({email:user.email},"0964eaaca5e4ea2177595c98098ed4eb929cdf4ed126968231b4a7165b94cfd0ca811351ec45eefa170c2c6ece2c63a3c54be7326d657850b457424518ee762f",
                    { expiresIn: '1h' });
                // cookie section:--
                const options = {
                    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.status(200).cookie('Token', accessToken, options).json({
                    accessToken,
                    success: true,
                    user: user
                });
                return res.json({ accessToken });
            } else {
                res.send.json({message:'Invalid password'});
            }
        } catch {
            res.status(500).send();
        }
    }
}
module.exports = userController;