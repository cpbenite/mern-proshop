import dotenv from 'dotenv';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDb from "./config/db.js";

dotenv.config()
connectDb();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts);

    console.log('Data Imported to Mongo DB!')

    process.exit();

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data deleted from Mongo DB!')
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}