const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {
    try{
   const Salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, Salt);
    return hashedPassword;
    }catch(err){
        console.log(err);
    }
}

const comparePassword = async (password, hasedPassword) => {
    
    const isMatch = await bcrypt.compare(password, hasedPassword);
    return isMatch;
}

module.exports = {
    encryptPassword,
    comparePassword
}