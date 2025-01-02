import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CheckVerbs } from './CheckVerbs';

const Quiz = () => {
  // State to hold the rows of text boxes
  const [rows, setRows] = useState([]);

  // Fetch data from the API on component mount
  useEffect(populate, []); // Empty dependency array means it runs once on mount

  function populate() {
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
  }
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
      //await axios.post('YOUR_POST_API_ENDPOINT', payload);
      populate();
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Render the grid of text boxes
  return (
    <div style={{ textAlign: 'center' }}>
      <input type="button" value="Reset" onClick={populate} />
      <h1>Text Box Grid</h1>
      <table align="center">
        <tbody>
            <tr>
              <th>Base Form</th>
              <th>Simple Past</th>
              <th>Past Participle</th>
            </tr>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input 
                  type="text" 
                  value={row.baseForm} 
                  onChange={e => {
                    const newRows = [...rows];
                    newRows[rowIndex].baseForm = e.target.value; // Update textbox 1 value
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
                    newRows[rowIndex].simplePast = e.target.value; // Update textbox 2 value
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
                    newRows[rowIndex].pastParticiple = e.target.value; // Update textbox 3 value
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

export default Quiz;
