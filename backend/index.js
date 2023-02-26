import express from 'express';
import cors from 'cors';
import env from './config/envConfig.js';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentRoutes from './routes/payment.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

app.use(
  express.json({
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/api/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(cors());

app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to chawkbazar updated' });
});

const port = env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Your server is running at port number: ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
