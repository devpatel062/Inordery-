const express = require("express");
const order = require("../modules/order");
const router = new express.Router();

router.get("/order", async (req, res) => {
  try {
    const orders = await order.find({});
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/order/pending", async (req, res) => {
  try {
    const orders = await order.find({ ispending: true });
    // res.status(200).send(orders);
    res.status(200).json({data:orders});
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/order/completed", async (req, res) => {
  try {
    const orders = await order.find({ ispending: false });
    // res.status(200).send(orders);
    res.status(200).json({data:orders});
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/order/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const Order = await order.findById(_id);
    if (!Order)  res.status(404).send("Order Not Found");
    else
    {
      res.status(200).send(Order);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/order", async (req, res) => {
  // const Order = new order(req.body);
  const { username, phone, items } = req.body;
  console.log("hello");

  try {
    // const od = await Order.save();
    const data = order.insertMany({ username, phone, items});
    res.status(200).json({data:data});
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/order/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "id",
    "username",
    "phone",
    "date",
    "ispending",
    "items",
  ];
  const isValidOpertaion = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOpertaion) res.status(400).send("Invalid Updates");

  else
  {
    try {
      const Order = await order.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
      if (!Order)  res.status(404).send("Order Not Found");
      else
      {
        res.send(Order);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

router.delete("/deleteorder/:id", async (req, res) => {
  try {
    const Order = await order.findByIdAndDelete(req.params.id);
    if (!Order) return res.status(404).send("Order Not Found");
    res.send(Order);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
