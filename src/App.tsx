import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisResults } from './components/AnalysisResults';
import { extractText } from './utils/textExtractor';
import { analyzeContent } from './utils/analyzer';
import { AnalysisResult } from './types';
import { FileText, Loader2 } from 'lucide-react';

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      setResults(null);
      
      const text = await extractText(file);
      
      if (!text.trim()) {
        throw new Error('No text could be extracted from the file. Please ensure the file contains readable text.');
      }
      
      const analysisResults = analyzeContent(text);
      setResults(analysisResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze the file. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <FileText className="w-8 h-8 text-blue-500 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            Social Media Content Analyzer
          </h1>
        </div>

        <div className="mb-8">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {isAnalyzing && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <span className="ml-3 text-lg text-gray-600">Analyzing content...</span>
          </div>
        )}

        {results && !isAnalyzing && (
          <AnalysisResults results={results} />
        )}
      </div>
    </div>
  );
}

export default App;