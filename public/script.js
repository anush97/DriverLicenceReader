function createTableHeader() {
    const headerRow = document.createElement('tr');
    const typeHeader = document.createElement('th');
    typeHeader.textContent = 'Field Type';
    headerRow.appendChild(typeHeader);
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Value';
    headerRow.appendChild(valueHeader);
    return headerRow;
  }
  
  function createTableRow(fieldType, fieldValue) {
    const row = document.createElement('tr');
    const typeCell = document.createElement('td');
    typeCell.textContent = fieldType;
    row.appendChild(typeCell);
    const valueCell = document.createElement('td');
    valueCell.textContent = fieldValue;
    row.appendChild(valueCell);
    return row;
  }
  
  document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const imageInput = document.getElementById('image');
    const outputTable = document.getElementById('output-table');
    const thead = outputTable.querySelector('thead');
    const tbody = outputTable.querySelector('tbody');
  
    if (!imageInput.files.length) {
      alert('Please select an image to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
  
    try {
      // Clear the table before populating it with new data
      thead.innerHTML = '';
      tbody.innerHTML = '';
  
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
  
      const extractedData = await response.json();
  
      if (extractedData.length > 0) {
        // Populate the table header
        thead.appendChild(createTableHeader());
      }
  
      // Populate the table body with extracted data
      for (const data of extractedData) {
        const fieldType = data.type;
        const fieldValue = data.value_detection;
        const tableRow = createTableRow(fieldType, fieldValue);
        tbody.appendChild(tableRow);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  