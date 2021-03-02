var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../server');

describe('/GET login', ()=> {
    it('it should succesfully log in', (done)=>{
        let login = {
            username: "hi",
            password: "hi"
        }
        chai.request(server)
        .get('/api/login')
        .send(login)
        .end((err, res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})