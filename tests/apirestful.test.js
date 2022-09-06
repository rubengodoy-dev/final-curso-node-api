import assert from "node:assert";
import chai from "chai";
import chaiHttp from "chai-http";
let should = chai.should();
chai.use(chaiHttp);

import dotenv from 'dotenv';

dotenv.config();
const URL = process.env.URL || "http://localhost:3000"

describe("Listar Users", () => {
    it("Listado de usuarios: estado 200 y array de DTO de Users", (done) => {
        chai
            .request(URL)
            .get("/users")
            .end((err, res) => {
                //   console.log(res)
                res.should.have.status(200);
                res.body.should.be.a("Array");
                done();
            });
    });
})

describe("Crear User", () => {
    it("Crear usuario enviando todos los campos: estado 201 y el DTO de User creado", (done) => {
        const newUser = {
            first_name: "creadoEnTest",
            last_name: "last1",
            enterprise: "enter1",
            job: "job1"
        }
        chai
            .request(URL)
            .post("/users")
            .send(newUser)
            .set("Accept", "application/json")
            .end((err, res) => {
                //   console.log(res)
                res.should.have.status(201);
                res.body.should.be.a("Object");
                res.body.should.have.property('id')
                done();
            });
    });
    it("Crear usuario sin campos requeridos: estado 400 y el registro de error", (done) => {
        const newUser = {
            first_name: "prueba1",
            last_name: "",
            enterprise: "enter1",
            job: "job1"
        }
        chai
            .request(URL)
            .post("/users")
            .send(newUser)
            .set("Accept", "application/json")
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a("Object");
                res.body.should.have.property('error')
                done();
            });
    });
})


describe("Modificar User", () => {
    it("Modifica un usuario: estado 200 y el DTO de User modificado", (done) => {
        const updateUser = {
            id:"6304e14a108d0f8d83ad5780",
            content:{
              first_name:"Ruben13"
            }
          }
        chai
            .request(URL)
            .put("/users")
            .send(updateUser)
            .set("Accept", "application/json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.should.have.property('id')
                done();
            });
    });
    it("Modifica un usuario y el id no existe: estado 500 y el mensaje", (done) => {
        const updateUser = {
            id:"6304e14a108d0f8d83ad5781",
            content:{
              first_name:"Ruben13"
            }
          }
        chai
            .request(URL)
            .put("/users")
            .send(updateUser)
            .set("Accept", "application/json")
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("Object");
                res.body.should.have.property('message')
                done();
            });
    });
})

describe("Eliminar User", () => {
    it("Elimina el registro: estado 200 y objeto con id", (done) => {
        chai
            .request(URL)
            .delete("/users/630765e3f8db82bd07638651")
            .set("Accept", "application/json")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("Object");
                res.body.should.have.property('id')
                done();
            });
    });

    it("Elimina el registro y el id no existe: estado 500 y el mensaje", (done) => {
        chai
            .request(URL)
            .delete("/users/630765e3f8db82bd07638651")
            .set("Accept", "application/json")
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a("Object");
                res.body.should.have.property('message')
                done();
            });
    });

})