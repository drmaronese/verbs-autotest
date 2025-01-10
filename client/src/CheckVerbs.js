import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './verbs.css';

const CheckVerbs = () => {
  // State to hold the rows of text boxes
  const [verbsState, setVerbsState] = useState({ rows: [] });

  const location = useLocation();

  const navigate = useNavigate();

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/backend/api/verbs/check', location.state);

        // Here we assume the response is an object of data for the text boxes
        setVerbsState(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.state]); // Empty dependency array means it runs once on mount

  // Function to go to the quiz page
  const gotoQuiz = async () => {
    try {
      navigate('/quiz');
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
              <th>Meaning</th>
              <th>Infinite</th>
              <th>Simple Past</th>
              <th>Past Participle</th>
            </tr>
          {verbsState.rows.map((row, rowIndex) => { 
            let rowBGColor = 'paddingbottom ';
            rowBGColor += rowIndex % 2 === 0 ? 'bgdark' : 'bglight';
            return (
            <>
            <tr class={rowBGColor}>
              <td class="paddingtop">&nbsp;</td>
              <td class="paddingtop verbcorrection">{row.baseFormCorrect}&nbsp;</td>
              <td class="paddingtop verbcorrection">{row.simplePastCorrect}&nbsp;</td>
              <td class="paddingtop verbcorrection">{row.pastParticipleCorrect}&nbsp;</td>
            </tr>
            <tr key={rowIndex} class={rowBGColor}>
              <td class="meaning">{row.meaning}</td>
              <td>
                <input
                  type="text" 
                  class={row.baseFormPreset ? 'marginbottom' : (row.baseFormCorrect && row.baseForm !== row.baseFormCorrect ? 'wrongverb marginbottom' : 'correctverb marginbottom')}
                  value={row.baseForm} 
                />
              </td>
              <td>
                <input wrongVerb
                  type="text"
                  class={row.simplePastPreset ? 'marginbottom' : (row.simplePastCorrect && row.simplePast !== row.simplePastCorrect ? 'wrongverb marginbottom' : 'correctverb marginbottom')}
                  value={row.simplePast}
                />
              </td>
              <td>
                <input 
                  type="text" 
                  class={row.pastParticiplePreset ? 'marginbottom' : (row.pastParticipleCorrect && row.pastParticiple !== row.pastParticipleCorrect ? 'wrongverb marginbottom' : 'correctverb marginbottom')}
                  value={row.pastParticiple} 
                />
              </td>
            </tr>
            </>
          )})}
        </tbody>
      </table>
      <div style={{display:'block', marginTop: '10px'}}><button onClick={gotoQuiz}>New Test </button></div>
      <div class="score">SCORE: {verbsState.score} / {verbsState.rowsNumber * 2}</div>
    </div>
  );
};

export default CheckVerbs;