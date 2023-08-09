const express=require('express');
const {registerUser,authUser,allUsers,findOneUser,UpdateUser,deleteUser}=require('../controllers/UserControllers');
const router=express.Router();
const {protect}=require('../middleware/authMiddleware');
const {upload}=require('../helper/multer');


//register users
router.route('/').post(upload.single('pic'),registerUser);

// login to elligible for edit,delete,view all user's details
router.post('/login',authUser);

//get all user make sure to provide Bearer token to perform this operation (Only authorized user able get all users)
router.route('/').get(protect,allUsers);

//search for  a Perticular user (Only authorized user able to search details)
router.route('/:userId').get(protect,findOneUser);

//only authorized user able to  update his details
router.route('/update').put(protect,UpdateUser);

//only authorized user able to delete his details
router.route('/delete').delete(protect,deleteUser)





module.exports=router;