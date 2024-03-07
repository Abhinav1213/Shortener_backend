const express = require('express');
const connect=require('./config/connectdb');
const app = express();
const port = 8020;
const signLogin = require('./userControllers/controllers');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const vistedschema = require('./userSchema/schema');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connect;

app.post('/register', signLogin.registerUser);
app.post('/login', signLogin.loginUser);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const particularUser = await vistedschema.findOne({ "analytics.shortId": shortId });
    if (particularUser == null) return res.sendStatus(404);
    const visitedurls = particularUser.analytics.find((url) => url.shortId === shortId);
    visitedurls.clicks++;
    await particularUser.save();
    res.redirect(visitedurls.full);
 })

app.post('/shorten', verify, async(req, res) => {
    jwt.verify(req.token,"0964eaaca5e4ea2177595c98098ed4eb929cdf4ed126968231b4a7165b94cfd0ca811351ec45eefa170c2c6ece2c63a3c54be7326d657850b457424518ee762f" , async(err, authdata) => {
        if (err) return res.status(403).send({message: 'Unauthorized'});
        const fullUrl = req.body.fullUrl;
        const particularUser = await vistedschema.findOne({ email: authdata.email });
        let check = true;
        particularUser.analytics.find((url) => {
            if (url.full === fullUrl) {
                check = false;
                return res.send({ message: 'Url already exist', url: url.shortId });
            }
        });
        if (check) {
            const shortUrl = shortid.generate();
                const visitedurls = {
                    full: fullUrl,
                    shortId: shortUrl
                }
                particularUser.analytics.push(visitedurls);
                await particularUser.save();
                res.send({particularUser}); 
        }
    })
})

function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    }
    else {
        res.sendStatus(403);
    }
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

