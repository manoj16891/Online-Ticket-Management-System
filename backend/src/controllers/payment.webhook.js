const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.webhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error`);
  }

  // ✅ Handle events
  switch (event.type) {

    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      console.log("Payment Success:", paymentIntent.id);

      // TODO:
      // 1. Find booking by paymentIntent.id
      // 2. Confirm booking
      // 3. Mark seats as BOOKED

      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      console.log("Payment Failed:", paymentIntent.id);

      // TODO:
      // 1. Unlock seats
      // 2. Mark booking failed

      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  res.json({ received: true });
};
