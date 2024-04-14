const fs = require('fs');
const path = require('path');


const jsonFilePath = path.join(__dirname, 'products.json');

function readJsonFile() {
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
    }
}

function writeJsonFile(data) {
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
        console.log('JSON file updated successfully.');
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
}

const data = readJsonFile();
console.log('Data from JSON file:', data);


if (data) {
    data.products.push({
        name: 'New Product',
        image: 'img/newproduct.png',
        category: 'Other',
        price: 99.99
    });

  
    writeJsonFile(data);
}
