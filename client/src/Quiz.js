import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  // State to hold the rows of text boxes
  const [rows, setRows] = useState([]);

  const populate = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/backend/api/verbs/quiz/2');

        // Here we assume the response is an array of data for the text boxes
        setRows(response.data.rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }

  // Fetch data from the API on component mount
  useEffect(populate, []); // Empty dependency array means it runs once on mount

  const navigate = useNavigate();

    // Function to handle submission of the text box contents
  const handleSubmit = async () => {
    try {
      // Prepare the data as an array of object from the rows
      const inputVerbs = rows.map(row => {
        return {
          id: row.id,

          baseForm: row.baseForm,
          simplePast: row.simplePast,
          pastParticiple: row.pastParticiple,

          baseFormPreset: row.baseFormPreset,
          simplePastPreset: row.simplePastPreset,
          pastParticiplePreset: row.pastParticiplePreset
        }
      });

      navigate('/CheckVerbs', { state:{verbs: inputVerbs} });

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Render the grid of text boxes
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Verbs Autotest</h1>
      <table class="rowstable">
        <tbody>
            <tr>
              <th>Base Form</th>
              <th>Simple Past</th>
              <th>Past Participle</th>
            </tr>
          {rows.map((row, rowIndex) => { 
            let rowBGColor = 'paddingbottom ';
            rowBGColor += rowIndex % 2 === 0 ? 'bgdark' : 'bglight';

            return (
            <>
            <tr class={rowBGColor}>
              <td class="paddingtop">&nbsp;</td>
              <td class="paddingtop">&nbsp;</td>
              <td class="paddingtop">&nbsp;</td>
            </tr>
            <tr key={rowIndex} class={rowBGColor}>
              <td>
                <input 
                  type="text" 
                  value={row.baseForm} 
                  class="marginbottom"
                  onChange={e => {
                    if (! row.baseFormPreset) {
                      const newRows = [...rows];
                      newRows[rowIndex].baseForm = e.target.value; // Update textbox 1 value
                      setRows(newRows);
                    }
                  }} 
                />
              </td>
              <td>
                <input 
                  type="text"
                  value={row.simplePast}
                  class="marginbottom"
                  onChange={e => {
                    if (! row.simplePastPreset) {
                      const newRows = [...rows];
                      newRows[rowIndex].simplePast = e.target.value; // Update textbox 2 value
                      setRows(newRows);
                    }
                  }}
                />
              </td>
              <td>
                <input 
                  type="text" 
                  value={row.pastParticiple} 
                  class="marginbottom"
                  onChange={e => {
                    if (! row.pastParticiplePreset) {
                      const newRows = [...rows];
                      newRows[rowIndex].pastParticiple = e.target.value; // Update textbox 3 value
                      setRows(newRows);
                    }
                  }} 
                />
              </td>
            </tr>
            </>
          )})}
        </tbody>
      </table>
      <div style={{display:'block', marginTop: '10px'}}>
      <button onClick={handleSubmit}>Check</button> {/* Submit button */}
      <button onClick={populate}>Reset</button>
      </div>
    </div>
  );
};

export default Quiz;
