const db = require("../models");
const Product_info = db.Product_info;
const Product_option = db.Product_option;


const getAllProducts = async () => {
   return await Product_info.findAll();
};

const getProductDetail = async (product_no) => {
   return await Product_info.findByPk(product_no, {
      include: [
         {
            model: Product_option,
            attributes: ["option_no", "option_title", "option_price"],
         }
      ]
   });
};

const regProduct = async (data) => {
   try {
      const newProduct = await Product_info.create(data);
      return newProduct;
   }
   catch (error) {
      console.log(error);
      throw error;
   }
};

// const getByCategory = async()


module.exports = { getAllProducts, getProductDetail, regProduct };