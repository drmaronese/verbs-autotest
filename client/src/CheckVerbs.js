import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export const CheckVerbs = () => {
  // State to hold the rows of text boxes
  const [rows, setRows] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/backend/api/verbs/quiz/2');
        console.log("RESPONSE");
        console.log(response);
        // Here we assume the response is an array of data for the text boxes
        setRows(response.data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  // Function to handle submission of the text box contents
  const handleSubmit = async () => {
    try {
      // Prepare the data as an array of arrays from the rows
      const payload = rows.map(row => [
        row.textbox1,
        row.textbox2,
        row.textbox3,
      ]);

      // Send POST request with the prepared data
      await axios.post('YOUR_POST_API_ENDPOINT', payload);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Render the grid of text boxes
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Verbs Autotest</h1>
      <table align="center">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input 
                  type="text" 
                  style={{textDecoration: 'line-through'}}
                  value={row.baseForm} 
                  onChange={e => {
                    const newRows = [...rows];
                    newRows[rowIndex].textbox1 = e.target.value; // Update textbox 1 value
                    setRows(newRows);
                  }} 
                />
                <input 
                  type="hidden" 
                  value={row.id} 
                />
              </td>
              <td>
                <input 
                  type="text"
                  style={{textDecoration: 'line-through'}}
                  value={row.simplePast}
                  onChange={e => {
                    const newRows = [...rows];
                    newRows[rowIndex].textbox2 = e.target.value; // Update textbox 2 value
                    setRows(newRows);
                  }}
                />
                <input 
                  type="hidden" 
                  value={row.id}
                />
              </td>
              <td>
                <input 
                  type="text" 
                  style={{textDecoration: 'line-through'}}
                  value={row.pastParticiple} 
                  onChange={e => {
                    const newRows = [...rows];
                    newRows[rowIndex].textbox3 = e.target.value; // Update textbox 3 value
                    setRows(newRows);
                  }} 
                />
                <input 
                  type="hidden" 
                  value={row.id} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button> {/* Submit button */}
    </div>
  );
};
