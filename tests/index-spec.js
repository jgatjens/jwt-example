'use strict';

let token = '';
let userid = '';

var request = require('supertest');
var app = require('../src/index');

describe('Create a user', function(){
    it('responds with a json success message', function(done){
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send(
                {
                    "gender": "male",
                    "email": "awesomeguy@18tech.com",
                    "username": "awesomeguy",
                    "password": "rockon",
                    "phone": "(506) 8837-4462",
                    "cell": "(506) 2241-3685",
                    "picture": {
                        "large": "http://jgatjens.com/images/me.jpg",
                        "medium": "http://jgatjens.com/images/me.jpg",
                        "thumbnail": "http://jgatjens.com/images/me.jpg"
                    }
                }
            )
            .expect(200)
            .end(function(err, res){

                if (err) return done(err);

                token = res.body.token;
                userid = res.body._id;
                done();
            });
    });
});


describe('No authorization token send', function(){
    it('responds with a 401 authorization denied', function(done){
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done)
    });
});

describe('Update a user', function(){
    it('responds with a json success message', function(done){
        request(app)
            .post('/users/' + userid)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer '+ token)
            .expect('Content-Type', /json/)
            .send(
                {
                    "phone": "(506) 8837-2211",
                    "cell": "(506) 2241-1111",
                }
            )
            .expect(200, done);
    });
});

describe('Login a user', function(){
    it('responds with a json success message', function(done){
        request(app)
            .post('/users/login')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .send(
               {
                  "username": "awesomeguy",
                  "password": "rockon",
               }
            )
            .expect(200, done);
    });
});

describe('List Users', function(){
    it('responds with a list of users in JSON', function(done){
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer '+ token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('Get a User', function(){
    it('responds with a single todo item in JSON based on the author', function(done){
        request(app)
            .get('/users/' + userid)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer '+ token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('Search a User', function(){
    it('responds with a single todo item in JSON based on the author', function(done){
        request(app)
            .get('/users/search?q=awesome')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer '+ token)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});
