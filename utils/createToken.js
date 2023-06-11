const jwt = require('jsonwebtoken');
// payLoad is a data in token
const generateToken = (payLoad) => {
        const token = jwt.sign({ userID: payLoad }, 'thisIsAProjF-alcon-Key-IsAProj-jE-C',
                { expiresIn: '90d' }
        );
        return token
}

module.exports = { generateToken }