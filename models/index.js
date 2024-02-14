// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {foreignKey: "category_id"});

// Categories have many Products - hasMany
// use CASCADE to delete any instances of that category in
// Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
// can't seem to get through to work
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: "product_id",
    unique: false,
  },
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: "product_tag",
    onDelete: "CASCADE",
    unique: false,
  },
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
