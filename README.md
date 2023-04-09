# Driver Licence Reader

A simple and efficient driver licence reader implemented in Python. This repository contains the source code to extract and parse information from driver licences using OCR (Optical Character Recognition).The extracted data is displayed in a tabular format on the frontend.
[https://driverlicensereader.onrender.com]

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node.js
- Express
- AWS Textract
- Python
- MySQL

## Features
- Reads and extracts information from driver licences.
- Supports various formats and regions.
- Easy to use and integrate into your own projects.

## Installation

1. Clone the repository:
2. Install the required dependencies:
pip install -r requirements.txt
3. Set up the AWS credentials and region in the `app.js` file:

``AWS.config.update({
region: 'your-region',
credentials: new AWS.SharedIniFileCredentials({profile: 'your-aws-profile'})
});``

4. Set up the MySQL database:

- Create a new MySQL database and import the provided SQL schema.
- Update the `db.js` file with your database credentials (host, user, password, and database name).

5. Start the Node.js server:
node app.js
6. Start the Node.js server:
``node app.js ``

7. Access the application in your browser at `http://localhost:3000`.

## Usage

1. Browse to the application in your web browser.
2. Upload a driver's license image using the file input.
3. Click the "Submit" button to process the image.
4. The extracted data will be displayed in a table below the upload form.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
