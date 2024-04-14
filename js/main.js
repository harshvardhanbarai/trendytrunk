const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'fashion_store';

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const productsCollection = db.collection('products');

        const insertResult = await productsCollection.insertOne({
            name: 'New Product',
            image: 'img/newproduct.png',
            category: 'Other',
            price: 99.99
        });
        console.log('Inserted product:', insertResult.insertedId);

        const products = await productsCollection.find({}).toArray();
        console.log('All products:', products);

        const updateResult = await productsCollection.updateOne(
            { _id: ObjectId('609ad6fc0f2e1a1a709d54ab') },
            { $set: { price: 39.99 } }
        );
        console.log('Updated product:', updateResult.modifiedCount);

        const deleteResult = await productsCollection.deleteOne({ _id: ObjectId('609ad6fc0f2e1a1a709d54ac') });
        console.log('Deleted product:', deleteResult.deletedCount);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main().catch(console.error);
