export interface AnalysisResult {
  text: string;
  suggestions: string[];
  readability: {
    score: number;
    level: 'Easy' | 'Medium' | 'Hard';
  };
  sentiment: {
    score: number;
    label: 'Positive' | 'Neutral' | 'Negative';
  };
}

export interface FileWithPreview extends File {
  preview?: string;
}