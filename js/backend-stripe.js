const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const app = express();

const stripe = Stripe('sk_test_51N...'); // Add your secret key here

app.use(bodyParser.json());

// Endpoint to create a Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Price ID of the book
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success', // Redirect after successful payment
      cancel_url: 'https://yourwebsite.com/cancel', // Redirect if payment is canceled
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Specify allowed countries for shipping
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});