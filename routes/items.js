const express = require("express")
const { isModuleNamespaceObject } = require("util/types")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function(req, res){
    res.json({items})
})

router.post("/", function(req, res){
    const itemName = req.body.name
    const itemPrice = req.body.itemPrice
    items.push({item: {name: itemName, price: itemPrice}});
    res.status(201).json({ added: item})
})

router.get("/:name", function(req, res){
    const item = items.find(i => i.id === +req.params.id)
    
    if (item === undefined){
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: item })
})

router.patch("/:name"), function(req, res) {
    const itemName = req.params.name;
    const item = req.body;
    const itemId = items.findIndex(item => item.name === itemName);
    
    if (itemId === -1){
        throw new ExpressError(`Item '${itemName}' not found`, 404);
    }
    
    const updItem = {...items[itemId], ...item};
    items[itemId] = updItem;

    res.json({ updated: updItem });
}

router.delete("/:name", function(req, res) {
    const item = items.findIndex(item => item.name === req.params.name)
    if (item === -1 ){
        throw new ExpressError("Item not found", 404)
    }
    item.splice(item, 1)
    res.json({message: "Deleted"})
})

module.exports = router;