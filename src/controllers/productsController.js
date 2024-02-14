const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products: products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const { id } = req.params;
		const productDetail = products.find((prod) => prod.id == id);
		res.render('detail', { productDetail: productDetail })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const newProduct = {
			id: crypto.randomUUID(),
  			name: req.body.name,
  			price: req.body.price,
  			discount: req.body.discount,
  			category: req.body.category,
  			description: req.body.description,
  			image: "default-image.png"
		}

		products.push(newProduct);

		//Sobreescribo el archivo json original
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))

		//res.redirect('/products'); //PORQUE USA REDIRECT Y NO RENDER
		res.render('products', { products: products });
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;