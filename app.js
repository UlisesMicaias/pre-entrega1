const express = require('express');
const ProductManager = require('./productManager');

const app = express();
const PORT = 3000;
const manager = new ProductManager('./products.json');

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
    const id = req.params.pid;
    const product = await manager.getProductById(id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
