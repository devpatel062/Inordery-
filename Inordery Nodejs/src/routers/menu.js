const express = require("express")
const menu = require("../modules/menu")
const router = express.Router()


router.get("/viewmenu", async (req, res) => {
    console.log("hello1");

    try {
        console.log("hello2");
        const Menu = await menu.find({})
        console.log(Menu)
        res.status(200).json({data:Menu})
        
    }
    catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

router.get("/menu/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const Menu = await menu.findById(_id)
        if (!Menu)
            return res.status(404).send()
        res.status(200).send(Menu)
    }
    catch (err) {
        res.status(500).send(err)
    }

})

router.post("/addmenu", async (req, res) => {
    // const Menu = new menu(req.body)
    const { title, price, desc, img ,category } = req.body
        
    try {
        const data = menu.insertMany({ title, price, desc, img ,category })
        // await Menu.save()
        // res.status(200).json(Menu)
        res.status(200).json({data:data})
    }
    catch (err) {
        res.status(500).send()
    }
})

router.patch("/menu/:id", async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "description", "price"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation)
        return res.status(400).send("Invlid Updates")
    try {
        const Menu = await menu.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        if (!Menu)
            return res.status(404).send("Not Found")
        res.send(Menu)
    }
    catch (err) {
        res.status(500).send(err)
    }

})

router.delete("/deletemenu/:id", async (req, res) => {
    const _id = req.params.id

    try {
        const Menu = await menu.findByIdAndDelete(_id)
        if (!Menu)
            return res.status(404).send("Not Found")
        res.send(Menu)
    }
    catch (err) {
        res.status(500).send(err)
    }
})

module.exports = router