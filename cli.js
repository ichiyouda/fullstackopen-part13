require('dotenv').config()

const { error } = require('console');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

async function main(){
    try {
        sequelize.authenticate()
        const [results, metadata] = await sequelize.query('select * from blogs')
        console.log(results)
        sequelize.close()
    } catch (error) {
        console.log(error)
    }
}

main()