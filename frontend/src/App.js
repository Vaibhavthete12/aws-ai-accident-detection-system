import axios from 'axios';
import { useState } from 'react';
import './App.css';

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

      alert(
        error.response?.data?.message ||
        error.message
      );

    }

  };

  return (

    <div className="container">

      <div className="card">

        <h1>🚨 AI Accident Detection System</h1>

        <p className="subtitle">
          AWS Powered Smart Emergency Detection & Alert Platform
        </p>

        <input
          type="text"
          placeholder="Enter Accident Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={submit}>
          Analyze Accident
        </button>

        {result && (

          <div className="result">

            <h2>📊 Detection Result</h2>

            <div className="info">
              <p><strong>📍 Location:</strong> {result.location}</p>
              <p><strong>🎯 Confidence:</strong> {result.confidence}%</p>
              <p><strong>🚦 Status:</strong> {result.status}</p>
              <p><strong>🆔 Accident ID:</strong> {result.accident_id}</p>
            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;
