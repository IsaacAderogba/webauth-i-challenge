const md5 = require("md5");
const Path = require('path-parser').default;
const { URL } = require("url");

module.exports = {
  hashPass: function(password, iterations, saltInput) {
    let salt;
    if (saltInput) {
      salt = saltInput
    } else {
      salt = new Date().getTime();
    }
    for(let i = 0; i < iterations; i++) {
      password = md5(`${password}${salt}`);
    }
    return password + `/${iterations}` + `/${salt}`;
  }, 
  comparePass: function(password, hashedPassword) {
    const path = new Path('/:hash/:iterations/:salt');
    const match = path.test(new URL('http://icrypt/' + hashedPassword).pathname);

    
    let inputPassword = this.hashPass(password, parseInt(match.iterations), match.salt);
    if(inputPassword === hashedPassword) {
      return true;
    }
    return false;
  }
}