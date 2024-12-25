const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')

const UploadProductForHomeController = require('../controller/product/uploadProductForHome')
const allEwasteUploads = require('../controller/user/allEwasteUploads')
// const { assignTraderToUser } = require("../controller/user/assignTraderToUser");
const traderController = require("../controller/user/traderController");
const assignmentController=require("../controller/user/assignmentController")


router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)
//ewasteuploads
router.get("/all-ewaste-uploads", authToken, allEwasteUploads.allEwasteUploads);
router.put("/assign-trader", allEwasteUploads.assignTraderToUser);
router.put("/assign-trader", allEwasteUploads.assignEwasteToTrader);

// router.post("/assign-trader", allEwasteUploads.assignTraderToUser);

//product
router.post("/upload-product",authToken,UploadProductController)
router.post("/upload-product-for-home",authToken,UploadProductForHomeController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//trader
router.post("/all-traders", traderController.createTrader);
router.get("/all-traders", traderController.getTraders);
router.post("/all-traders", traderController.traderSignIn);
//assign

router.post("/assignments",authToken, assignmentController.createAssignment);
router.get("/assignments", authToken,assignmentController.getAssignments);






module.exports = router