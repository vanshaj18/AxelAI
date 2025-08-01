
'use client';

import { useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PDFGeneratorProps {
  reportElementRef: React.RefObject<HTMLDivElement>;
  interviewId: string;
  onComplete: () => void;
  onError: (error: string) => void;
}

export default function PDFGenerator({
  reportElementRef,
  interviewId,
  onComplete,
  onError,
}: PDFGeneratorProps) {
  useEffect(() => {
    const generatePdf = async () => {
      const reportElement = reportElementRef.current;
      if (!reportElement) {
        onError("Report element not found.");
        onComplete();
        return;
      }

      try {
        const canvas = await html2canvas(reportElement, {
          scale: 2,
          useCORS: true,
          backgroundColor: window.getComputedStyle(document.body).backgroundColor === 'rgb(24, 24, 27)' ? '#18181b' : '#ffffff',
          onclone: (document) => {
            // Ensure the background color of the cloned element is set correctly for canvas capture
            (document.querySelector('[data-testid="report-container"]') as HTMLElement).style.backgroundColor = 
              window.getComputedStyle(document.body).backgroundColor;
          }
        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`Axel_AI_Feedback_Report_${interviewId}.pdf`);
      } catch (err) {
        console.error("Failed to generate PDF", err);
        onError("Could not generate the PDF report. Please try again.");
      } finally {
        onComplete();
      }
    };

    generatePdf();
  }, [reportElementRef, interviewId, onComplete, onError]);

  return null; // This component doesn't render anything itself
}
