import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/bfhl`, parsedJson);
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input or Error processing request');
        }
    };

    const handleSelectChange = (event) => {
        const options = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="App">
            <h1>0827CS211112</h1> 
            <h1>Kamakhya Singh</h1> 
            <h1>Acropolis Institute of Technology and Research</h1> 
            <input
                type="text"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='Enter JSON here'
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {response && (
                <div>
                    <select multiple={true} onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && (
                            <div>
                                <h2>Alphabets</h2>
                                <p>{response.alphabets.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <div>
                                <h2>Numbers</h2>
                                <p>{response.numbers.join(', ')}</p>
                            </div>
                        )}
                        {selectedOptions.includes('highest_lowercase_alphabet') && (
                            <div>
                                <h2>Highest Lowercase Alphabet</h2>
                                <p>{response.highest_lowercase_alphabet.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
