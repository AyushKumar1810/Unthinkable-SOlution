export function analyzeContent(text: string) {
  // Basic sentiment analysis
  const sentimentScore = calculateSentiment(text);
  const readabilityScore = calculateReadability(text);
  
  return {
    text,
    suggestions: generateSuggestions(text),
    readability: {
      score: readabilityScore,
      level: getReadabilityLevel(readabilityScore)
    },
    sentiment: {
      score: sentimentScore,
      label: getSentimentLabel(sentimentScore)
    }
  };
}

function calculateSentiment(text: string): number {
  // Simple sentiment analysis based on positive/negative word counts
  const positiveWords = ['great', 'awesome', 'excellent', 'good', 'love', 'happy'];
  const negativeWords = ['bad', 'poor', 'terrible', 'hate', 'awful', 'wrong'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  return score;
}

function calculateReadability(text: string): number {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const syllables = countSyllables(text);
  
  // Simplified Flesch Reading Ease calculation
  return 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
}

function countSyllables(text: string): number {
  // Simple syllable counting heuristic
  return text.toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/[^aeiouy]+/g, ' ')
    .trim()
    .split(' ')
    .length;
}

function getReadabilityLevel(score: number): 'Easy' | 'Medium' | 'Hard' {
  if (score > 80) return 'Easy';
  if (score > 50) return 'Medium';
  return 'Hard';
}

function getSentimentLabel(score: number): 'Positive' | 'Neutral' | 'Negative' {
  if (score > 0) return 'Positive';
  if (score < 0) return 'Negative';
  return 'Neutral';
}

function generateSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  
  // Length check
  if (text.length < 100) {
    suggestions.push('Consider adding more content to improve engagement');
  }
  
  // Hashtag check
  if (!text.includes('#')) {
    suggestions.push('Add relevant hashtags to increase visibility');
  }
  
  // Call-to-action check
  const ctaWords = ['click', 'subscribe', 'follow', 'share', 'like'];
  if (!ctaWords.some(word => text.toLowerCase().includes(word))) {
    suggestions.push('Include a clear call-to-action');
  }
  
  // Question mark check
  if (!text.includes('?')) {
    suggestions.push('Consider adding questions to encourage engagement');
  }
  
  return suggestions;
}