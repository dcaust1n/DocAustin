 // Replace with your Stripe Publishable Key
 const stripe = Stripe('pk_test_51N...'); // Add your publishable key here

 // Function to handle the "Buy Now" button click
 async function handleBuyNow(priceId) {
   try {
     // Send a request to your backend to create a Checkout Session
     const response = await fetch('/create-checkout-session', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({ priceId }), // Pass the price ID of the book
     });

     const session = await response.json();

     // Redirect to Stripe Checkout
     const result = await stripe.redirectToCheckout({ sessionId: session.id });

     if (result.error) {
       alert(result.error.message);
     }
   } catch (error) {
     console.error('Error:', error);
   }
 }

 // Add event listeners to the "Buy Now" buttons
 document.getElementById('buy-now-1').addEventListener('click', () => {
   handleBuyNow('price_1N...'); // Replace with the actual price ID for Book 1
 });

 document.getElementById('buy-now-2').addEventListener('click', () => {
   handleBuyNow('price_2N...'); // Replace with the actual price ID for Book 2
 });