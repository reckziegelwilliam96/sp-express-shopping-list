process.env.NODE_ENV = "test"

const { describe } = require("node:test");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const request = require("supertest");

const app = require("../app");
const { captureStackTrace } = require("../expressError");
let items = require("../fakeDb");

let bag = { name: "bag", price: "22.95"}

beforeEach(function(){
    items.push(bag);
})

afterEach(function(){
    items.length = 0;
})

describe("GET /items", function(){
    test("Get list of items", async function(){
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items: [bag]});
    });
});
describe("GET /items/:name", function(){
    test("Gets a single item", async function(){
        const resp = await request(app).get(`/items/${bag.name}`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({item: bag});
    })
    test("Response with 404 if can't find item", async function(){
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
    });
});
describe("POST /items", function(){
    test("Create a new item", async function(){
        const resp = await request(app)
            .post(`/items`)
            .send({
                name: "carpet",
                price: "49.95"
            });
            expect(resp.statusCode).toBe(201);
            expect(resp.body).toEqual({
                item: {name: "carpet", price: "49.95"}
            });
    });
});

describe('PATCH /items/:name', () => {
    test('Updates an existing item', async () => {
      const newItem = { name: 'new popsicle', price: 2.45 };
      const res = await request(app)
        .patch('/items/popsicle')
        .send(newItem)
        .expect(200);
      expect(res.body).toEqual({ updated: newItem });
    });
  
    test('Returns 404 if item not found', async () => {
      const newItem = { name: 'new popsicle', price: 2.45 };
      const res = await request(app)
        .patch('/items/nonexistent')
        .send(newItem)
        .expect(404);
      expect(res.body).toEqual({ message: "Item 'nonexistent' not found" });
    });
  });
  
  describe('DELETE /items/:name', () => {
    test('Deletes an existing item', async () => {
      const res = await request(app)
        .delete('/items/popsicle')
        .expect(200);
      expect(res.body).toEqual({ message: 'Deleted' });
    });
  
    test('Returns 404 if item not found', async () => {
      const res = await request(app)
        .delete('/items/nonexistent')
        .expect(404);
      expect(res.body).toEqual({ message: "Item not found" });
    });
  });