import { createDirectus, rest, createItem, importFile } from '@directus/sdk';

import fs from 'fs/promises';
import path from 'path';

// temp variable to push all the data objects into
let allData = [];

// Function to process a single JSON file
async function processJsonFile(filePath) {
    try {
      const data = await fs.readFile(filePath);
      const jsonData = JSON.parse(data.toString()); // Convert buffer to string
      console.log('Processing:', jsonData.image);
      jsonData.imageAlt = jsonData.image?.alt || ''; // Use optional chaining
      const client = createDirectus('https://cvr-dashboard.com').with(rest());
      let tempImageResult;
      // if there is an image, import it to Directus
        if (jsonData.image) {
            try {
                const imageResult = await client.request(
                  importFile(`https://res.cloudinary.com/dmfgntgym/image/fetch/c_fill,h_450/f_auto/q_auto:eco/https://www.chinovalleyranchers.com/${jsonData.image.src}`)
                );
                tempImageResult = imageResult.id;
              } catch (error) {
                console.error('Error importing image:', error);
                // Set a default value for `jsonData.image` on upload failure (optional)
                tempImageResult = null; // Or a default image ID
              }
        }

      // Process the data here (e.g., console.log, modify, etc.)
      // alter the object to match the Directus schema
      jsonData.image = tempImageResult;
      jsonData.date = new Date(jsonData.date).toISOString(); // Convert to ISO string
      allData.push(jsonData);
      //const result = await client.request(createItem(collection_name, item_object));
      // use try catch to handle errors instead
      try {
        const result = await client.request(
          createItem('news', jsonData)
        );
        console.log('Data submitted to Directus successfully:', result);
      } catch (error) {
        console.error('Error submitting data to Directus:', error);
        // get request entity size in mb
        //const requestSize = JSON.stringify(jsonData).length / 1024 / 1024;
        //console.log('Request size:', requestSize, 'MB');
      }
    } catch (err) {
      // Handle file-specific errors (e.g., not found, invalid JSON)
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
      } else if (err.name === 'SyntaxError') {
        console.error(`Invalid JSON format in: ${filePath}`);
      } else {
        console.error(`Error processing ${filePath}:`, err);
      }
    }
  }

// Function to get all JSON files in the folder (asynchronous)
async function getJsonFiles(directoryPath) {
    try {
      const dirents = await fs.readdir(directoryPath);
      const files = dirents.filter(file => file.endsWith('.json'));
      return files.map(file => path.join(directoryPath, file));
    } catch (err) {
      console.error('Error reading directory:', err);
      return []; // Return empty array to prevent unhandled promise rejections
    }
  }

// Main function to loop through and process files
(async () => {
    const directoryPath = './content/news'; // Replace with your actual path
    const filePaths = await getJsonFiles(directoryPath);

    // Process each file asynchronously using for...of loop
    for (const filePath of filePaths) {
      await processJsonFile(filePath);
    }

    console.log('All JSON files processed successfully!');


  })();