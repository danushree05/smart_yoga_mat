// import React, { useState } from 'react'
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';

// const AdminProductCard = ({
//     data,
//     fetchdata
// }) => {
//     const [editProduct,setEditProduct] = useState(false)

//   return (
//     <div className='bg-white p-4 rounded '>
//        <div className='w-40'>
//             <div className='w-32 h-32 flex justify-center items-center'>
//               <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
//             </div> 
//             <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

//             <div>

//                 <p className='font-semibold'>
//                   {
//                     displayINRCurrency(data.sellingPrice)
//                   }
        
//                 </p>

//                 <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
//                     <MdModeEditOutline/>
//                 </div>

//             </div>

          
//        </div>
        
//         {
//           editProduct && (
//             <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
//           )
//         }
    
//     </div>
//   )
// }

// export default AdminProductCard
import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  // Fallback for image and video
  const productImage = data?.productImage?.[0] || "/path/to/default/image.png";
  const productVideo = data?.productVideo?.[0] || ""; // Fallback for video
  const productName = data?.productName || "No product name available";
  const sellingPrice = data?.sellingPrice || 0;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="w-40">
        {/* Image Display */}
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={productImage}
            alt={productName}
            className="mx-auto object-cover h-full"
            onError={(e) => (e.target.src = "/path/to/default/image.png")} // Fallback image
          />
        </div>

        {/* Video Display */}
        {productVideo && (
          <div className="mt-2">
            <video
              src={productVideo}
              width="100%"
              controls
              className="bg-slate-100 border rounded"
              onError={(e) => (e.target.src = "/path/to/default/video.mp4")} // Fallback video
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <h1 className="text-ellipsis line-clamp-2 mt-2">{productName}</h1>

        <div className="mt-2">
          <p className="font-semibold">{displayINRCurrency(sellingPrice)}</p>

          <div
            className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer mt-2"
            onClick={() => setEditProduct(true)}
            aria-label="Edit Product"
            role="button"
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
