import { z } from 'zod'
import user from '../models/usermodel.models.js'
import Product from '../models/Products.models.js'
import imagekit from '../utils/imagekit.js'
import Blogs from '../models/Blogs.models.js'
import Category from '../models/Category.models.js'
import Cart from '../models/Cart.models.js'
import jwt from 'jsonwebtoken'
import { paymentModel } from '../models/Payment.models.js'
import paypal from 'paypal-rest-sdk';
import Order from '../models/Order.models.js'
import Stripe from 'stripe';
import Review from '../models/Review.models.js'
const stripe = new Stripe('sk_test_51QGeC3GCVUDiMIBN5AePLZ76YUKbhPKGWmCiMPK0D8xTFHEWjrsycYf3cBMTiV2QkS7wKAoieKLQMSVBdFCYBQJK00APfT1b3R'); // Secret Key

const productStore = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        // Zod validation schema
        const requirebody = z.object({
            name: z.string().min(5).max(100),
            description: z.string().min(3).max(1000),
            price: z.string().min(1).max(200000), // Adjusted min length
            category: z.string().min(3).max(100),
            stock: z.string().min(1).max(50000),
        });

        // Validate request body
        const parseDataSuccess = requirebody.safeParse(req.body);
        if (!parseDataSuccess.success) {
            console.log(parseDataSuccess.error.message);
            return res.status(400).json({ message: "Incorrect format", error: parseDataSuccess.error });
        }

        // Check if file is uploaded
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log(file.buffer);

        let response;
        try {
            response = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
            });
        } catch (uploadError) {
            console.error('ImageKit upload failed:', uploadError.message);
            return res.status(500).send('Failed to upload image.');
        }
        const usercategory = await Category.findOne({ name: category })
        if (!usercategory) {
            await Category.create({ name: category })
        }

        // Create product with image URL
        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image: response.url, // Save the image URL in the product
        });


        if (!product) {
            return res.json({ message: "Product not added", success: false });
        }

        res.json({ product, success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};




const signin = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        // Check if user already exists
        const isUserExist = await user.findOne({ email });
        if (isUserExist) {
            return res.status(409).json({ message: "User already exists. Please log in or use a different email.", success: false });
        }

        // Check if file is uploaded
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No profile image uploaded. Please upload an image.', success: false });
        }

        let response;
        try {
            response = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
            });
        } catch (uploadError) {
            console.error('ImageKit upload failed:', uploadError.message);
            return res.status(500).json({ message: 'Failed to upload image. Please try again later.', success: false });
        }

        // Create new user
        const userData = await user.create({
            fullname,
            email,
            password,
            address: "",
            phone: "",
            profileImage: response.url,
        });

        if (!userData) {
            return res.status(500).json({ message: "Failed to create user. Please try again.", success: false });
        }

        res.status(201).json({
            message: "Account successfully created!",
            success: true,
            userData
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong. Please try again later.", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const requirebody = z.object({
            email: z.string().min(3).max(100).email(),
            password: z.string().min(8).max(50),
        });

        const parseDataSuccess = requirebody.safeParse(req.body);

        if (!parseDataSuccess.success) {
            console.log(parseDataSuccess.error.message);
            return res.status(400).json({
                statusCode: 400,   // ✅ Include status code in response body
                message: "Invalid input format.",
                error: parseDataSuccess.error,
            });
        }

        const userexist = await user.findOne({ email });

        if (!userexist) {
            return res.status(404).json({
                statusCode: 404,   // ✅ Include status code in response body
                message: "User not found. Please check your credentials.",
                success: false,
            });
        }

        const isMatchPassword = await userexist.comparePassword(password);

        if (!isMatchPassword) {
            return res.status(401).json({
                statusCode: 401,   // ✅ Include status code in response body
                message: "Incorrect password.",
                success: false,
            });
        }

        const token = await userexist.generateToken();

        if (!token) {
            return res.status(500).json({
                statusCode: 500,   // ✅ Include status code in response body
                message: "Token generation failed.",
                success: false,
            });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .cookie("token", token, options)
            .json({
                statusCode: 200,    // ✅ Include status code in response body
                message: "Login successful!",
                success: true,
                token,
                userexist,
            });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            statusCode: 500,   // ✅ Include status code in response body
            message: "Internal server error.",
            success: false,
        });
    }
};


const logout = async (req, res) => {
    try {


        // Clear the token cookie by setting it to an empty value and an expiration date in the past
        res.cookie("token", "", { expires: new Date(0), httpOnly: true }); // Consider using httpOnly and secure options if applicable
        // Send a response indicating the user has been logged out
        return res.json({ message: "Successfully logged out", success: true });
    } catch (error) {
        // Handle any errors that may occur during the logout process
        return res.status(500).json({ message: "An error occurred during logout", success: false });
    }
};


const blogspost = async (req, res) => {
    try {
        const { headlines, bio } = req.body


        const requirebody = z.object({
            headlines: z.string().min(3).max(50),
            bio: z.string(),
        });
        const parseDataSuccess = requirebody.safeParse(req.body);
        if (!parseDataSuccess.success) {
            console.log(parseDataSuccess.error.message);
            return res.status(400).json({ message: "Incorrect format", error: parseDataSuccess.error });
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }


        let response;
        try {
            response = await imagekit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
            });
        } catch (uploadError) {
            console.error('ImageKit upload failed:', uploadError.message);
            return res.status(500).send('Failed to upload image.');
        }
        const userblog = await Blogs.create({
            headlines, bio, Blogpost: response.url
        })
        if (!userblog) {

            res.json({ message: "blog are not posted..", success: true })
            return
        }
        res.json({ message: "blog are posted", success: true, userblog })
    } catch (error) {
        console.log(error.message);
        res.json({ message: "something went wrong", success: false })

    }

}

const admin = (req, res) => {
    res.send("I am admin")
}


const getproducts = async (req, res) => {
    try {

        const result = await Product.aggregate([
            {
                $match: {
                    category: `${req.params.type}` // Filter by the specified category
                }
            },
            {
                $group: {
                    _id: "$category",      // Include the 'id' field (ensure that 'id' is a valid field in your collection)
                    products: { $push: "$$ROOT" }
                },
            },
            {
                $project: {
                    _id: 0,
                    category: `$_id`,
                    products: { $slice: ["$products", 10] },

                }

            }
        ]);

        const resultObject = result.reduce((acc, item) => {
            acc[item.category] = item.products
            return acc

        }, {})


        res.send(resultObject);
        // res.send(result)
    } catch (error) {
        console.log(error.message);

        res.json({ message: "something went wrong", success: true })
    }
}
const getblogs = async (req, res) => {
    try {
        const getblogs = await Blogs.find()
        res.json(getblogs)
    } catch (error) {
        console.log(error.message);
        res.json({ message: "something went wrong", success: true })
    }
}



const getcategory = async (req, res) => {
    try {
        const getdetail = await Category.find()
        res.json(getdetail)
    } catch (error) {
        console.log(error.message);

        res.json({ message: "something went wrong", success: true })
    }
}

const getAllProducts = async (req, res) => {

    try {
        const getproducts = await Product.find()
        if (!getproducts) {
            res.json({ message: "Network issue", success: true })
            return
        }
        res.json(getproducts)
    } catch (error) {
        console.log(error.message);

        res.json({ message: "something went wrong", success: false })
    }
}
const getProductById = async (req, res) => {

    try {
        const getproducts = await Product.findById(req.params.id)
        if (!getproducts) {
            res.json({ message: "Network issue", success: true })
            return
        }
        res.json(getproducts)
    } catch (error) {
        console.log(error.message);

        res.json({ message: "something went wrong", success: false })
    }
}

const getcart = async (req, res) => {
    try {
        const users = await Cart.findOne({ user: req.user.id }).populate("products.product");

        if (!users) {
            return res.status(404).json({ message: "Cart not found" });
        }

        let cartDataStructure = {};

        // Assuming products is an array within the user document
        users.products.forEach((product) => {
            let key = product.product._id.toString(); // Assuming product.product contains the product details
            if (cartDataStructure[key]) {
                cartDataStructure[key].quantity += 1;
            } else {
                cartDataStructure[key] = {
                    ...product.product._doc, // Spread the product details
                    quantity: 1,
                };
            }
        });

        let finalArray = Object.values(cartDataStructure); // Corrected method name
        if (!finalArray) {
            res.json({ message: "Empty Cart......" })
        }
        res.json({ cart: finalArray, finalPrice: users.totalPrice }); // Ensure totalPrice is available
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message); // Use a 500 status code for server errors
    }


}
const createCart = async (req, res) => {

    try {

        // Verify the JWT token
        // Find the user's cart
        let cart = await Cart.findOne({ user: req.user.id });
        const product = await Product.findById(req.params.id)
        if (!cart) {
            cart = await Cart.create({ user: req.user?.id, products: [{ product: req.params.id }], totalPrice: product?.price })

        } else {
            cart.products.push({ product: req.params.id })
            cart.totalPrice = (cart.totalPrice) + (product.price)
            await cart.save()

        }
        res.json({ success: true, cart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const removecart = async (req, res) => {
    try {
        // Find the cart for the user
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).send("Cart is empty.");
        }

        // Find the product by ID
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found.");
        }

        // Check if the product is in the cart
        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.id);
        if (productIndex === -1) {
            return res.status(404).send("Product not in cart.");
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);
        cart.totalPrice -= product.price; // Ensure totalPrice is updated correctly

        // Save the updated cart
        await cart.save();

        // Send the updated cart
        res.json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};

const removeallcart = async (req, res) => {
    try {
        // Find the cart for the user
        const cart = await Cart.findOneAndDelete({ user: req.user.id });
        if (!cart) {
            return res.status(404).send("Cart is empty or does not exist.");
        }

        // Optionally, you can also send a success message or the deleted cart
        res.json({ message: "Cart has been successfully deleted.", success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};





const getuser = async (req, res) => {
    const { token } = req.body

    // Validate the presence of the token
    if (!token) {
        return res.status(400).json({ message: "Token is not valid.", success: false });
    }
    try {
        // Verify the token and extract the email
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const users = await user.findOne({ email })
        if (!users) {
            res.json({ message: "users is not exist", success: false })
            return
        }

        // Respond with the user data
        return res.status(200).json(users);
    } catch (error) {
        // Handle any errors, such as token verification failure
        return res.status(401).json({ message: "Invalid token.", success: false });
    }


}

const paypalpayment = async (req, res) => {
    try {
        const { products } = req.body
        const lineItems = products.map((product) => ({
            price_data: {
                currency: 'usd', // Currency should be in lowercase
                product_data: {
                    name: product.name,  // Product name
                    images: [product.image], // Product image URL, array format
                },
                unit_amount: Math.round(product.price * 100), // Price in cents, rounding the value
            },
            quantity: product.quantity, // Quantity of the product

        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'amazon_pay'],
            line_items: lineItems, // Pass in the line items for the session
            mode: 'payment', // You can also use 'subscription' if you are creating subscriptions
            success_url: `http://localhost:5173/paymentsuccess`, // Redirect after success
            cancel_url: `http://localhost:5173/cart`, // Redirect after cancel
        });
        res.json({ id: session.id });


    } catch (error) {
        console.error('Error creating checkout session:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


const verifyPayment = async (req, res) => {

    const sig = req.headers['stripe-signature']; // Stripe signature to verify the request
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object; // Get the session object

            // Retrieve session details (includes the line items and customer details)
            const sessionId = session.id;

            // Optionally, you can fetch more details about the session
            const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

            // Retrieve the customer details
            const customer = checkoutSession.customer;
            const customerEmail = checkoutSession.customer_email;

            // Retrieve the line items
            const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);

            // You now have the line items and the session details
            console.log('Payment Success! Order Details:', lineItems);

            // Process the order details as you need, e.g., store them in a database, etc.
            // You can store customer and product data, etc.
            // Example: Save the order in the database or send an email to the user.

            res.status(200).send('Event received');
        } else {
            res.status(400).send('Event type not handled');
        }
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(400).send('Webhook error');
    }


};


const updateProductRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        if (!id) {
            return res.json({ message: "Id not found", success: false });
        }

        if (typeof rating === 'undefined' || rating === null) {
            return res.json({ message: "Rating not provided", success: false });
        }

        const product = await Product.findByIdAndUpdate(id, { rating }, { new: true });

        if (!product) {
            return res.json({ message: "Product not found", success: false });
        }

        res.json({ message: "Rating updated successfully", success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong", success: false });
    }

}


const uploadReview = async (req, res) => {
    try {
        const { id } = req.params; // Product ID
        const { review } = req.body;
        const user = req.user; // Assuming you're using auth middleware to attach user to req

        if (!id) {
            return res.json({ message: "Product ID not found", success: false });
        }

        if (!review || review.trim() === "") {
            return res.json({ message: "Review not provided", success: false });
        }

        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.json({ message: "Product not found", success: false });
        }

        // Add new review
        const newReview = {
            user: user._id,
            comment: review,
            date: new Date()
        } ;

        product.reviews.push(newReview);

        await product.save();

        res.json({ message: "Review added successfully", success: true, product });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};


export { login, logout, uploadReview, signin, paypalpayment, verifyPayment, updateProductRating, removeallcart, getuser, productStore, createCart, removecart, blogspost, getproducts, getblogs, getAllProducts, getProductById, getcategory, getcart, admin }