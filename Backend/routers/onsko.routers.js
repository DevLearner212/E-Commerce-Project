import express from 'express'
const  router = express.Router()
import { login, signin, productStore, blogspost, uploadReview, verifyPayment, paypalpayment, updateProductRating, removeallcart, getproducts, getuser, removecart, createCart, getAllProducts, getcart, getProductById, getblogs, getcategory, admin, logout,getreview } from '../controllers/usercontroller.js'
import upload from '../utils/multer.js'

import validationAdmin from '../middlewares/isAdmin.js'



router.route("/signin").post(upload.single('profileImage'), signin)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/admin").post(validationAdmin, admin)
router.route("/blogs").post(upload.single("ImageFile"), blogspost)
router.route("/productadd").post(upload.single("image"), productStore)
router.route("/cart/:id").post(validationAdmin, createCart)
router.route("/getuser").post(getuser)
router.route("/removeallcart").post(validationAdmin, removeallcart)
router.route("/updaterating/:id").post(updateProductRating)
router.route("/uploadReview/:id").post(validationAdmin,uploadReview)


//get request start from here
router.route("/getUserReview/:id").get(getreview)
router.route("/getproducts/:type").get(getproducts)
router.route("/getAllproducts").get(getAllProducts)
router.route("/getProductById/:id").get(getProductById)

router.route("/getblogs").get(getblogs)
router.route("/getcategory").get(getcategory)
router.route("/getcart").get(validationAdmin, getcart)
router.route("/removecart/:id").get(validationAdmin, removecart)

router.route("/create-checkout-session").post(paypalpayment);
// router.route("/create/order").post(validationAdmin, paypalpayment);
router.route("/verify/:id").get(verifyPayment);






export default router