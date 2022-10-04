const express = require("express");
const Stripe = require("stripe");
const keys = {
  public:
    "pk_test_51Lfk0lBKh2rUDIsL5kBZ36FfMLipojl2u22aOimJiprKd9ShzSKCeFefqsScKEnOL89zvl45nfABmew7Nl09c8ze00Fk1tZ7Rk",
  secret:
    "sk_test_51Lfk0lBKh2rUDIsLrG6aunKgRtpAst6v3pq81CpOV7irbr1PBLUZ2hAL1UbdmusI1XfErJRyTEA2PHR4eNjhQlAe00xHBt85tf",
};

const stripe = new Stripe(keys.secret, {
  apiVersion: "2020-08-27",
});
const app = express();
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount ? amount * 100 : 5000,
    currency: "try",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Server up"));
