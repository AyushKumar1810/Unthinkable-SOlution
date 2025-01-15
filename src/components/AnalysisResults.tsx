import React from 'react';
import { BarChart, ThumbsUp, BookOpen } from 'lucide-react';
import { AnalysisResult } from '../types';
import clsx from 'clsx';

interface AnalysisResultsProps {
  results: AnalysisResult;
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const getSentimentColor = (label: string) => {
    switch (label) {
      case 'Positive': return 'text-green-600';
      case 'Negative': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getReadabilityColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Hard': return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <ThumbsUp className="w-6 h-6 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">Sentiment Analysis</h3>
          </div>
          <p className={clsx('text-2xl font-bold', getSentimentColor(results.sentiment.label))}>
            {results.sentiment.label}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Score: {results.sentiment.score}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
            <h3 className="text-lg font-semibold">Readability</h3>
          </div>
          <p className={clsx('text-2xl font-bold', getReadabilityColor(results.readability.level))}>
            {results.readability.level}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Score: {Math.round(results.readability.score)}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <BarChart className="w-6 h-6 mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold">Suggestions</h3>
        </div>
        <ul className="space-y-2">
          {results.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center leading-6 mr-2">
                {index + 1}
              </span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Extracted Text</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {results.text}
          </pre>
        </div>
      </div>
    </div>
  );
}