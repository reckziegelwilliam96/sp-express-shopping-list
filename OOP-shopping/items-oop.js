const express = require("express");
const { json } = require("stream/consumers");
const router = express.Router();
const ExpressError = require("../expressError");
const Item = require("../OOP-shopping/model");
const itemRoutes = require("../OOP-shopping/model")

router.get('/', (req, res) => {
    const items = Item.all();
    res.json(items);
});

router.post('/', (req, res) => {
    const newItem = new Item(req.body.name, req.body.price);
    const item = Item.create(newItem);
    res.status(201).json({ added: item });
});

router.get('/:name', (req, res) => {
    const item = Item.find(req.params.name);
    if (!item) {
        throw new ExpressError(`Item not found`, 404)
    }
    res.json(item);
});

router.patch('/:name', (req, res) => {
    const item = Item.find(req.params.name);
    if (!item) {
        throw new ExpressError(`Item '${req.params.name}' not found`, 404);
    }
    const updatedItem = new Item(item.name, item.price);
    updatedItem.update(req.body);
    res.json({ updated: updatedItm });
});

router.delete('/:name', (req, res) => {
    const item = Item.find(req.params.name);
    if (!item) {
        throw new ExpressError(`Item '${req.params.name}' not found`, 404);
    }
    const deletedItem = new Item(item.name, item.price);
    deletedItem.delete();
    res.json({ message: 'Deleted'});
});

module.exports = router;