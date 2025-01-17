// netlify/functions/product.js

const mongoose = require('mongoose');
const Product = require('../../backend/models/product.model'); // Adjust path if needed
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Ensure MongoDB URI is set in environment variables

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

exports.handler = async (event, context) => {
  const method = event.httpMethod;
  switch (method) {
    case 'GET':
      return await getProducts(event);
    case 'POST':
      return await createProduct(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};

const getProducts = async (event) => {
  try {
    const products = await Product.find(); // Retrieve products from MongoDB
    return {
      statusCode: 200,
      body: JSON.stringify({ products }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving products', error }),
    };
  }
};

const createProduct = async (event) => {
  try {
    const body = JSON.parse(event.body); // Parse incoming data
    const product = new Product(body); // Create new product
    await product.save();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Product created', product }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error creating product', error }),
    };
  }
};
