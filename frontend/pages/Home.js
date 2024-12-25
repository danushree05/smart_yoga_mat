// import React from 'react'
// import CategoryList from '../components/CategoryList'
// // import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from '../components/HorizontalCardProduct'
// import VerticalCardProduct from '../components/VerticalCardProduct'

// const Home = () => {
//   return (
//     <div className='bg-gray-700'>
//       <CategoryList/>
//       {/* <BannerProduct/> */}

//       <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}  className="text-white"/>
//       <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>

//       <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
//       <VerticalCardProduct category={"Mouse"} heading={"Mouse"}/>
//       <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
//       <VerticalCardProduct category={"camera"} heading={"Camera & Photography"}/>
//       <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"}/>
//       <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
//       <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
//       <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>
//     </div>
//   )
// }

// export default Home
// import React from "react";
// import CategoryList from "../components/CategoryList";
// // import BannerProduct from '../components/BannerProduct'
// import HorizontalCardProduct from "../components/HorizontalCardProduct";
// import VerticalCardProduct from "../components/VerticalCardProduct";

// const Home = () => {
//   return (
//     <div className="bg-gray-600">
//       <CategoryList />
//       {/* <BannerProduct /> */}

//        <HorizontalCardProduct
//         category={"airpodes"}
//         heading={"Top's Airpodes"}
//         headingClassName="text-white"
//       /> 
//      <HorizontalCardProduct
//         category={"watches"}
//         heading={"Popular's Watches"}
//         headingClassName="text-white"
//       /> 

//       <VerticalCardProduct
//         category={"mobiles"}
//         heading={"Mobiles"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"Mouse"}
//         heading={"Mouse"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"televisions"}
//         heading={"Televisions"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"camera"}
//         heading={"Camera & Photography"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"earphones"}
//         heading={"Wired Earphones"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"speakers"}
//         heading={"Bluetooth Speakers"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"refrigerator"}
//         heading={"Refrigerator"}
//         headingClassName="text-white"
//       />
//       <VerticalCardProduct
//         category={"trimmers"}
//         heading={"Trimmers"}
//         headingClassName="text-white"
//       />
//     </div>
//   );
// };

// export default Home;
import React from "react";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct"; // For horizontal video lists
import VerticalCardProduct from "../components/VerticalCardProduct"; // For vertical video lists

const Home = () => {
  return (
    <div className="bg-gray-600">
      <CategoryList />

      {/* HorizontalCardProduct will display items for each yoga category */}
      <VerticalCardProduct
        category={"beginner_yoga"}
        heading={"Beginner Yoga"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"intermediate_yoga"}
        heading={"Intermediate Yoga"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"advanced_yoga"}
        heading={"Advanced Yoga"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_mats"}
        heading={"Yoga Mats"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_blocks"}
        heading={"Yoga Blocks"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_straps"}
        heading={"Yoga Straps"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"meditation_cushions"}
        heading={"Meditation Cushions"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_wheels"}
        heading={"Yoga Wheels"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_apparel"}
        heading={"Yoga Apparel"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_accessories"}
        heading={"Yoga Accessories"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"prenatal_yoga"}
        heading={"Prenatal Yoga"}
        headingClassName="text-white"
      />
      <VerticalCardProduct
        category={"yoga_for_kids"}
        heading={"Yoga for Kids"}
        headingClassName="text-white"
      />

      {/* Optionally, if you want vertical lists for these categories */}
      {/* <VerticalCardProduct
        category={"beginner_yoga"}
        heading={"Beginner Yoga"}
        headingClassName="text-white"
      /> */}
      {/* Repeat for other categories if needed */}
    </div>
  );
};

export default Home;
