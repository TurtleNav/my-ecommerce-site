const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET - /api/tags
// get all tags and get their associated product data
router.get('/', (req, res) => {
  try {
    const tagData = Tag.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET - /api/tags/:id
// Get a particular tag by its id and get its associated product data
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!tagData) {
      return res.status(404).json({message: "No tag exists with that particular id"});
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// POST - /api/tags
// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// PUT - /api/tags/:id
// update a particular tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      return res.status(404).json({message: "No tag exists with that particular id"});
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// DELETE - /api/tags/:id
// Delete a tag by its particular id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      return res.status(404).json({message: "No tag exists with that particular id"});
    }
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;