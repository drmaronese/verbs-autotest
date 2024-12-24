import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TextBoxRow {
  textBox1: string;
  textBox2: string;
  textBox3: string;
  hiddenField1: string;
  hiddenField2: string;
  hiddenField3: string;
}

const TextBoxGrid: React.FC = () => {
  const [rows, setRows] = useState<TextBoxRow[]>([]); // State to hold the text box rows

  useEffect(() => {
    // Fetch data from the API on component mount
    const fetchData = async () => {
      try {
        const response = await axios.get<TextBoxRow[]>('https://api.example.com/data');
        setRows(response.data); // Set the fetched data into the state
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle the POST request with the textbox data
  const handleSubmit = async () => {
    try {
      await axios.post('https://api.example.com/submit', rows); // Submit the array of rows
      alert('Data submitted successfully!'); // Simple success alert
    } catch (error) {
      console.error('Failed to submit data', error);
    }
  };

  const handleChange = (rowIndex: number, field: keyof TextBoxRow, value: string) => {
    const updatedRows = rows.map((row, index) => 
      index === rowIndex ? { ...row, [field]: value } : row
    );
    setRows(updatedRows); // Update the state with the modified row
  };

  return (
    <div>
      <h1>TextBox Grid</h1>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input 
                  type="text" 
                  value={row.textBox1} 
                  onChange={(e) => handleChange(index, 'textBox1', e.target.value)} 
                />
                <input 
                  type="text" 
                  value={row.textBox2} 
                  onChange={(e) => handleChange(index, 'textBox2', e.target.value)} 
                />
                <input 
                  type="text" 
                  value={row.textBox3} 
                  onChange={(e) => handleChange(index, 'textBox3', e.target.value)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button> {/* Button to submit data */}
    </div>
  );
};

export default TextBoxGrid;
