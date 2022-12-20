const Product = require('../models/product.model');

exports.createProduct = (req, res) => {
  // const newProduct = new Product(req.body);
  // newProduct.save(req.body)
  Product.create(req.body)
    .then((product) => {
      res.send(product);
    })
    .catch((err) => res.status(404).send(err));
};

//filtrage par produit
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      stock: {
        $gt: 0,
      },
      reference: {
        $regex: new RegExp('^AF', 'i'),
      },
      //   ...req.body.searchString ?
      //     {
      //       $or: [
      //         {
      //           description: {
      //             $regex: new RegExp(req.body.searchString, "i")
      //           }
      //         },
      //         {
      //           name: {
      //             $regex: new RegExp(req.body.searchString, "i")
      //           }
      //         }
      //       ]
      //     }
      //     : {},
      //   ...req.body.range ?
      //     {
      //       price: {
      //         $lte: req.body.range[1],
      //         $gte: req.body.range[0] || 0
      //       }
      //     }
      //     : {}
    });
    //FOR
    //.filter
    const filteredProducts = products.filter((product) => {
      return (
        req.body.searchString &&
        product.name.includes(
          req.body.searchString ? req.body.searchString.toLowerCase() : ''
        ) &&
        product.description.includes(
          req.body.searchString ? req.body.searchString.toLowerCase() : ''
        ) &&
        req.body.range &&
        product.price >= req.body.range[0] &&
        product.price <= req.body.range[1]
      );
    });
    res.send(filteredProducts);
  } catch (err) {
    res.status(400).send(err);
  }
};
