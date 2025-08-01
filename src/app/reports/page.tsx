// src/app/reports/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import { ReportsClient } from './_components/reports-client';
import type { Report } from '@/lib/types';

async function getReports(): Promise<Report[]> {
  const transcriptsDir = path.join(process.cwd(), 'transcripts');
  try {
    const files = await fs.readdir(transcriptsDir);
    // We only want to list the .txt files which are the transcripts/reports
    const reportFiles = files.filter(file => file.endsWith('.txt'));

    const reports = await Promise.all(reportFiles.map(async file => {
      // Extract interview ID from filename, e.g., '1_Priya_Kapoor_report.txt' -> '1'
      const interviewId = file.split('_')[0];
      const filePath = path.join(transcriptsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      
      return {
          filename: file,
          interviewId: interviewId,
          content: content,
      }
    }));
    return reports;

  } catch (error) {
    // If the directory doesn't exist, return an empty array
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [];
    }
    console.error("Error reading reports directory:", error);
    return [];
  }
}

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <div className="space-y-8">
       <div>
            <h1 className="font-headline text-3xl font-bold">Feedback Reports</h1>
            <p className="text-muted-foreground">Review and download feedback from completed interviews.</p>
        </div>
      
        <ReportsClient reports={reports} />
    </div>
  );
}
