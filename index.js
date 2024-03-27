require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express');
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})

Blog.sync()
app.use(express.json())
    

app.get('/api/blogs', async (_req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

    
app.post('/api/blogs', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.json(blog)
})


app.delete('/api/blogs/:id', async (req, res) => {
    const destroyedRow = await Blog.destroy({where:{id: req.params.id}})
    if (destroyedRow === 0){
      res.status(404).send("id doesn't exit!")
    }
    else {
      res.status(204)
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})