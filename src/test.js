var request = require('supertest')
var host_url = 'http://localhost:3000'
var container_url = host_url + '/Login';


describe('Test user:', function () {
    var container = request(container_url);
    it('should create user session for valid user', function (done) {
        container
        .post('/Login')
        .set('Accept','application/json')
        .send({"email": "don.white@example.com", "password": "0101"})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res)
          done();
        });
    })
}) 
