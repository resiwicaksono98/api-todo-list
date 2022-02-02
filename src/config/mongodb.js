const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'todo_list';

async function main(){
    await client.connect()
    console.log('Successfull to server');
    return 'done.';
}
const db = client.db(dbName)
const collection = db.collection('task')

main()
.then(console.log())
.catch(console.log())
.finally(() => client.close)

module.exports = db