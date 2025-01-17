import Product from '../models/product.models.js';
import mongoose from 'mongoose';

export const createProduct = async (req, res) => {
    const product = req.body;
    
    if(!product.name || !product.price || !product.description || !product.image){
        res.status(400).json({success: false, message:"All fields are required"});
    }
    const newProduct = new Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true, message:"Product created successfully"});
    }catch(error){
        res.status(500).json({success: false, message:"Server error"});
        console.log(`Error in Creating Product: ${error.message}`);
    }
}
export const getProducts =  async (req, res) => {
    try{
       const products = await Product.find({});
       res.status(200).json({success: true, data: products});
    }
    catch(error){
        res.status(500).json({success: false, message:"Server error"});
        console.log(`Error in Fetching Products: ${error.message}`); 
    }
};
export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }
    try{
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); //3rd parameter new is for returning the updated data
        res.status(200).json({success: true, data: updatedProduct});
    }
    catch(error){
        res.status(500).json({success: false, message:"Server error"});
        console.log(`Error in Updating Product: ${error.message}`);
    }
}
export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Product not found"});
    }
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});    
    }catch(error){
        res.status(500).json({success: true, message: "Server error"});
        console.log(`Error in Deleting Product: ${error.message}`);
    }
}