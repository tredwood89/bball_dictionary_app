const request = require("supertest")
const expect = require('chai').expect;
const rewire = require('rewire');
const app = rewire('../app');

describe("Dictionary App", function () {

    it("Loads the home page", function(done){
      request(app).get("/").expect(200).end(done)
    });

    describe("Dictionary API", function () {

        beforeEach(function () {

        	this.defs = [
                {
                    term: "One",
                    defined: "Term One Defined"
                },
                {
                    term: "Two",
                    defined: "Term Two Defined"
                }
            ];

            app.__set__("basketballTerms", this.defs);
        });

        it("GETS dictionary-api", function(done){
          request(app).get("/dictionary-api").expect(200).end(done)
        });

        it("POSTS dictionary-api", function(done){
          request(app).post("/dictionary-api")
            .send({"term":"threee", "define":"third term defined"})
            .expect(200)
            .end(done)
        });

        it("DELETES dictionary-api", function(done){
          request(app)
            .delete("/dictionary-api/One")
            .expect(200)
            .end(done)
        });

    });

});