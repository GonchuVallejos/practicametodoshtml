const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const products = require('../data/productsDataBase.json') //JSON -> JS

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visitedProduct = products.filter((products) => products.category == "visited");
		const inSaleProduct = products.filter((products) => products.category == "in-sale");

		res.render('index', { productosVisitados: visitedProduct, productosOferta: inSaleProduct});
	},
	search: (req, res) => {
		//Capturar la info
		const busqueda = req.query.keywords;

		//Extraer los productos que matcheen con la busqueda
		const productoBuscado = products.filter((products) => products.name.toLowerCase().includes(busqueda.toLowerCase()));
		
		//Vista
		res.render('results', {busqueda: busqueda, productoBuscado: productoBuscado})
	},
};

module.exports = controller;
