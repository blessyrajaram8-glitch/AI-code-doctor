import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import AnalysisResults from './components/AnalysisResults';
import ApiKeyModal from './components/ApiKeyModal';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

export default function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [samples, setSamples] = useState({});
  const [selectedSample, setSelectedSample] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');

  // Fetch preset samples from backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/samples`)
      .then((res) => res.json())
      .then((data) => setSamples(data))
      .catch((err) => console.log('Could not fetch sample codes from server:', err));
  }, []);

  // Handle loading sample code into editor
  const handleSelectSample = (sampleKey) => {
    setSelectedSample(sampleKey);
    if (sampleKey && samples[sampleKey]) {
      setCode(samples[sampleKey].code);
      setLanguage(sampleKey);
    }
  };

  // Save API Key to localStorage
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  // Perform code analysis
  const handleAnalyze = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setResults(null);

    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error during analysis:', error);
      setResults({
        status: 'error',
        healthScore: 0,
        summary: 'Failed to connect to backend server.',
        errors: [
          {
            type: 'NetworkError',
            message: 'Unable to reach backend Flask service',
            explanation: 'Make sure the Flask backend server is running on http://localhost:5000.',
            fixTip: 'Start backend using: python app.py'
          }
        ],
        correctedCode: code,
        suggestions: ['Check server connection and try again.']
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header
        samples={samples}
        selectedSample={selectedSample}
        onSelectSample={handleSelectSample}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        apiKeyConfigured={!!apiKey}
      />

      <main className="main-content">
        <div className="workbench-grid">
          <CodeEditor
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onAnalyze={handleAnalyze}
            loading={loading}
          />

          <AnalysisResults
            results={results}
            loading={loading}
          />
        </div>
      </main>

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
