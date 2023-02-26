import Stripe from 'stripe';
import envConfig from '../config/envConfig.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
const stripe = new Stripe(envConfig.STRIPE_KEY);

class PaymentController {
  async paymentProcess(req, res) {
    const { cart, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const orderData = cart.map((item) => {
      return {
        _id: item._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        userId: user._id,
      };
    });

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        cart: JSON.stringify(orderData),
      },
    });

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {
        allowed_countries: ['IN'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'inr' },
            display_name: 'Free shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      line_items: cart.map((item) => {
        const percentage = item.discount / 100;
        let actualPrice = item.price - item.price * percentage;
        actualPrice = parseFloat(actualPrice);
        actualPrice = actualPrice * 100;
        actualPrice = actualPrice.toFixed(2);
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.title,
            },
            unit_amount: Number(actualPrice),
          },
          quantity: item.quantity,
        };
      }),
      mode: 'payment',
      customer: customer.id,
      success_url: `${envConfig.CLIENT_URL}/orders?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: envConfig.CLIENT_URL + '/cart',
    });

    res.status(200).json({ url: session.url });
  }

  async checkOutSession(request, response) {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        envConfig.ENDPOINT_SECRET
      );
    } catch (err) {
      console.log(err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        const customer = await stripe.customers.retrieve(data.customer);
        const cart = JSON.parse(customer?.metadata?.cart);

        for (const cartItem of cart) {
          try {
            const findOrder = await Order.findOne({
              productId: cartItem._id,
              userId: cartItem.userId,
              review: true,
            });

            let hasReview = false;

            if (findOrder) {
              hasReview = true;
            }

            await Order.create({
              productId: cartItem._id,
              userId: cartItem.userId,
              size: cartItem.size,
              color: cartItem.color,
              quantities: cartItem.quantity,
              address: data.customer_details.address,
              review: hasReview,
            });

            const product = await Product.findOne({ _id: cartItem._id });

            if (product) {
              let stock = product.stock - cartItem.quantity;

              if (stock < 0) {
                stock = 0;
              }

              await Product.findByIdAndUpdate(
                cartItem._id,
                { stock },
                { new: true }
              );
            }
          } catch (error) {
            return res
              .status(500)
              .json({ errors: [{ msg: 'Internal Server Error' }] });
          }
        }
        break;
      default:
        break;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }

  async paymentVerify(req, res) {
    const { id } = req.params;
    try {
      const session = await stripe.checkout.sessions.retrieve(id);
      return res.status(200).json({
        msg: 'Payment verfied successfully!',
        status: session.payment_status,
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default new PaymentController();
