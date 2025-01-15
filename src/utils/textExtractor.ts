import * as pdfjsLib from 'pdfjs-dist';
import PDFWorker from 'pdfjs-dist/build/pdf.worker.min?url';
import { createWorker } from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFWorker;

export async function extractText(file: File): Promise<string> {
  const fileType = file.type.toLowerCase();
  
  if (fileType === 'application/pdf') {
    return extractTextFromPDF(file);
  } else if (fileType.startsWith('image/')) {
    return extractTextFromImage(file);
  }
  
  throw new Error('Unsupported file type. Please upload a PDF or image file.');
}

async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF document.');
  }
}

async function extractTextFromImage(file: File): Promise<string> {
  try {
    const worker = await createWorker('eng');
    
    // Convert File to base64
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const { data: { text } } = await worker.recognize(base64Image);
    await worker.terminate();

    if (!text.trim()) {
      throw new Error('No text could be extracted from the image. Please ensure the image contains clear, readable text.');
    }

    return text.trim();
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error('Failed to extract text from image. Please ensure the image is clear and contains readable text.');
  }
}