# Social Media Content Analyzer

A powerful web application that analyzes social media posts and provides engagement improvement suggestions. The application supports both PDF documents and images (with OCR capabilities) for content analysis.

🚀 **[Live Demo](https://stellar-alpaca-492bb5.netlify.app)**

## Features

- **Document Upload**
  - Supports PDF and image files (PNG, JPG, JPEG, GIF, BMP, WEBP)
  - Drag-and-drop interface
  - File size limit: 10MB

- **Text Extraction**
  - PDF parsing with PDF.js
  - OCR for images using Tesseract.js
  - Maintains text formatting

- **Content Analysis**
  - Sentiment analysis
  - Readability scoring
  - Engagement improvement suggestions
  - Real-time processing

## Technical Approach

The application is built using React and TypeScript, focusing on modularity and user experience. For text extraction, we use PDF.js for PDFs and Tesseract.js for OCR on images. The analysis pipeline processes the extracted text through multiple stages:

1. **Text Extraction Layer**: Handles different file formats with appropriate extractors
2. **Analysis Engine**: Processes text through sentiment analysis and readability scoring
3. **Suggestion Generator**: Creates actionable recommendations based on content analysis

The UI is built with Tailwind CSS for responsive design and uses Lucide React for icons. Error handling and loading states are implemented throughout the application to ensure a smooth user experience.

## Tech Stack

- React + TypeScript
- Tailwind CSS
- PDF.js for PDF parsing
- Tesseract.js for OCR
- Lucide React for icons
- Vite for build tooling

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Production Build

```bash
npm run build
npm run preview
```

## License

MIT
