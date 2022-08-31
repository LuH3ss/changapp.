const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51Lb2ZIKO72YUdcCNms5TiiqU5bIrmzLzFNgZgmQKxdRkc6xw7v039b2peRu9zTnH15bpt4L39cWmFZ9KzoFgCCJT00mF6RRlOa"
  // "sk_test_51LcCp7EP7te43QfZE6MuPkgfb9GjW9ExMhKnMn1tZN8jPcwec1N9k07m2e66FvpRTCokPmb167adKo5emqqBLsrv00VXmB7WKQ"
);

const paymentMethod = async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "ARS",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    res.send({ message: "Successful payment" });
  } catch (error) {
    res.json({ message: error.raw.message });
  }
};

module.exports = {
  paymentMethod,
};
