import { sql } from "../config/db.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  const { name , price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({ success: false, message: "Missing some fields" });
  }

  try {
    const respone = await sql`
      INSERT INTO PRODUCTS (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *
    `;

    res.status(201).json({ success: true, data: respone});
  } catch(error) {
    console.log("Error in createProduct function: ", error);
    res.status(500).json({ success: false, message: "Error in createProduct function" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM PRODUCTS
      ORDER BY created_at DESC
    `
    
    res.status(200).json({ success: true, data: products});
  } catch(error) {
    console.log("Error getting all products: " + error);
    res.status(500).json({ success: false, message: "Error getting all products" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({success: false, message: "Missing ID field" });
  }

  try {
    const respone = await sql`
      SELECT * FROM PRODUCTS
      WHERE id = ${id}
    `;

    if (!respone) {
      res.status(400).json({success: false, message: "No product with that ID" });
    } else {
      res.status(200).json({ success: true, data: respone});
    }
  } catch(error) {
    console.log("Error getting product: ", error);
    res.status(500).json({ success: false, message: "Error getting product" });
  }
};

export const updateProdcut = async (req, res) => {
  const { name, price, image } = req.body;
  const { id } = req.params;
  console.log(req.params);

  if (!id || !name || !price || !image) {
    return res.status(400).json({success: false, message: "Missing some fields" });
  }

  try {
    const respone = await sql`
      UPDATE PRODUCTS
      SET name = ${name}, image = ${image}, price = ${price}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!respone) {
      res.status(400).json({success: false, message: "No product with that ID" });
    } else {
      res.status(200).json({ success: true, data: respone});
    }
  } catch(error) {
    console.log("Error updating product: ", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing ID field" });
  }

  try {
    const respone = await sql`
      DELETE FROM PRODUCTS
      WHERE id = ${id}
      RETURNING *
    `;

    if (!respone) {
      res.status(400).json({success: false, message: "No product with that ID" });
    } else {
      res.status(200).json({ success: true, data: respone});
    }
  } catch(error) {
    console.log("Error deletting product: ", error);
    res.status(500).json({ success: false, message: "Error deletting product" });
  }
};