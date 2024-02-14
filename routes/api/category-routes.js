const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// get all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product, as: "products" }],
    });
    res.status(200).json(allCategories);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET - /api/categories/:id
// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    //if category doesn't exist, it will send back an error message and stop running
    if (!category) {
      return res.status(404).json({message: "No category with that id exists"});
    }
    res.status(200).json(category);
  } catch(err) {
    res.status(500).json(err);
  }
});

// POST - /api/categories
// create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// PUT - /api/categories/:id
// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // check if the category exists, if it doesn't it will send back an error message and stop running the request
    if (!categoryData) {
      return res.status(404).json({message: "The desired category to update doesn't exist"});
    }
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// DELETE - /api/categories
// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    // check if the category exists, if it doesn't it will send back an error message and stop running the request
    if (!categoryData) {
      return res.status(404).json({message: "The desired category to delete doesn't exist"});
    }
    //sends back rows in db affected
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
