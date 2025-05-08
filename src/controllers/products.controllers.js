import { pool } from "../db.js"

const getProducts = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM products");
        if(rows.length==0){
            res.status(200).json({message: 'No records.'})
        }
        res.status(200).json({message: 'Showing products.', data: rows})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error})
    }
}

const getProduct = async(req, res)=> {
    try {
        const { id } = req.params
        const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [id]);
        if(rows.length==0){
            res.status(404).json({message: 'Product not found.'})
        }
        res.status(200).json({message: 'Showing product.', data: rows[0]})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error})
    }
}

const createProduct = async(req, res)=> {
    try {
        const { description, price } = req.body
        const { rows } = await pool.query("INSERT INTO products(description, price) VALUES($1, $2) RETURNING *", [description, price]);
        res.status(200).json({message: 'Product created.', data: rows[0]})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error})
    }
}

const updateProduct = async(req, res)=> {
    try {
        const { id } = req.params
        const { rows } = await pool.query("SELECT * FROM products WHERE id=$1", [id])
        if(rows.length >0){
            const { description, price } = req.body
            const { rows } = await pool.query("UPDATE products SET description=$1, price=$2 WHERE id=$3 RETURNING *", [description, price, id]);
            res.status(200).json({message: 'Product updated.', data: rows[0]})
        }
        res.status(404).json({message: 'Product not found.'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error})
    }
}

const deleteProduct = async(req, res)=> {
    try {
        const { id } = req.params
        const { rowCount } = await pool.query("SELECT * FROM products WHERE id=$1", [id])
        if(rowCount>0){
            await pool.query("DELETE FROM products WHERE id=$1",[id]);
            res.status(200).json({message: 'Product deleted.'})
        }
        res.status(404).json({message: 'Product not found.'})
    } catch (error) {
        res.status(500).json({message: 'Internal server error', error: error})
    }
}

export {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}
