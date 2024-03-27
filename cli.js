require('dotenv').config()

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

async function main(){
    try {
        sequelize.authenticate()
        const [results, metadata] = await sequelize.query('select * from blogs')
        for (const blog of results) {
            console.log(`${blog.author}: ${blog.url}, ${blog.likes} ${blog.likes !== 0 ? "likes" : "like"}`)
        }
        sequelize.close()
    } catch (error) {
        console.error(error)
    }
}

main()