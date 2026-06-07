import axios from 'axios';
import { useState } from 'react';

function App() {

  const [location, setLocation] = useState('');
  const [result, setResult] = useState(null);

  const submit = async () => {

    try {

      const response = await axios.post(
        'http://52.66.210.88:5000/report-accident',
        {
          location
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };

  return (
    <div style={{ padding: '30px' }}>

      <h1>AI Accident Detection System</h1>

      <input
        type="text"
        placeholder="Enter Accident Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>
        Report Accident
      </button>

      <br /><br />

      {result && (
        <div>

          <h3>Detection Result</h3>

          <p>
            <b>Location:</b> {result.location}
          </p>

          <p>
            <b>Confidence:</b> {result.confidence}%
          </p>

          <p>
            <b>Status:</b> {result.status}
          </p>

          <p>
            <b>Accident ID:</b> {result.accident_id}
          </p>

        </div>
      )}

    </div>
  );
}

export default App;
