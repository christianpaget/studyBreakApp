var assert = require('assert');
let chai = require('chai');
const request = require('supertest');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../server');

describe('GET /version', function() {
    it('responds with the current version', function(done) {
      request(server)
        .get('/version')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chai.expect(JSON.parse(res.text)).to.eql({ version: '1.0.0' });
          return done();
        });
    });
  });

describe('/POST login', ()=> {
    it('should succesfully log in', function() {
        let login = {
            username: "hi",
            password: "hi"
        }
        request(server)
        .post('/api/login')
        .send({ username: "hi", password: "hi"})
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            chai.expect(JSON.parse(res.statusMessage)).to.eql("Success");
            chai.expect(JSON.parse(res.userID).to.be.a("int"))
            done();
        })
        })
    it('should not succesfully log in', function() {
        let login = {
            username: "hiFail",
            password: "hiFail"
        }
        request(server)
        .post('/api/login')
        .send(login)
        .set('Accept', 'application/json')
        //.expect(404)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            chai.expect(JSON.parse(res.statusMessage)).to.eql("Failed");
            //chai.expect(JSON.parse(res.userID).to.be.a("int"))
            done();
        })
        })
    })

describe('POST Create User success', ()=>{
    it('should succesfully create a new user', function(){
        let newUser = {
            username: "hiNew",
            password: "hiNew"
        }
        request(server)
        .post('/api/new/user')
        .send(newUser)
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            chai.expect(JSON.parse(res.statusMessage)).to.eql("blaaaa");
            //chai.expect(JSON.parse(res.userID).to.be.a("int"))
            done();
        })
        })
})

describe('/POST Create Playlist Success', ()=>{
    it('should successfully create a playlist', function(){
        let newPlaylist = {
            
        }
    })
})