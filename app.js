const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { spawn } = require('child_process');
const AWS = require('aws-sdk');
const pool = require('./db'); // Import the MySQL connection

const app = express();
const upload = multer({ dest: 'uploads/' });
const arr =[]
// Configure the AWS SDK
AWS.config.update({
  region: 'us-east-1',
});

// Define an endpoint to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  const { path } = req.file;
  const s3 = new AWS.S3();
  const bucketName = 'readdl';

  // Upload the image to the S3 bucket
  const fileContent = fs.readFileSync(path);
  const params = {
    Bucket: bucketName,
    Key: req.file.originalname,
    Body: fileContent,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // Call the Python script to analyze the image
      const python = spawn('python', ['analyze_id.py', 'us-east-1', bucketName, data.Key]);

      let output = '';
      python.stdout.on('data', (data) => {
        output += data.toString();
      });

      python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      python.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);
        // Delete the local file
        fs.unlinkSync(path);

        // Parse the JSON output from the Python script
        const extractedData = JSON.parse(output);

        // Save the extracted data in the MySQL database
        for (const data of extractedData) {
      
            arr.push(data.value_detection)
            
        }
        try {
          const [result] = await pool.query('INSERT INTO extracted_data (first_name, last_name,middle_name,suffix,city_in_address,zip_code_in_address,state_in_address,state_name,document_number,expiration_date,date_of_birth ,date_of_issue,id_type,endorsements,veteran,restrictions,class,address,county,place_of_birth,mrz_code) VALUES (?)',[arr]);

          console.log(`Inserted data with ID: ${result.insertId}`);
        } catch (err) {
          console.error('Error inserting data into the database:', err);
        }
        
        // Return the output to the client
        res.send(output);
      });
    }
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
