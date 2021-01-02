var request = require('supertest');
var app = require('../app.js');

describe("homepage", function() {
    it('Shows public Recipes', function(done) {
        request(app)
        .get("/")
        .expect(200)
        .expect(/Social Food/, done);
    })
})

describe("", function() {
    it('shows construction page', function(done) {
        request(app)
        .get('/about')
        .expect(200)
        .expect(/Under Construction/, done)
    })
})