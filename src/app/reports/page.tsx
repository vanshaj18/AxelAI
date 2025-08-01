
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

async function getReports() {
  const transcriptsDir = path.join(process.cwd(), 'transcripts');
  try {
    const files = await fs.readdir(transcriptsDir);
    // We only want to list the .txt files which are the transcripts/reports
    return files.filter(file => file.endsWith('.txt')).map(file => {
        // Extract interview ID from filename, e.g., '1_Priya_Kapoor_report.txt' -> '1'
        const interviewId = file.split('_')[0];
        return {
            filename: file,
            interviewId: interviewId,
        }
    });
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
      
        <Card>
            <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
                {reports.length > 0 ? (
                    <ul className="space-y-4">
                        {reports.map((report) => (
                        <li key={report.filename} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-medium">{report.filename.replace('.txt', '').replace(/_/g, ' ')}</p>
                                    <p className="text-sm text-muted-foreground">Interview ID: {report.interviewId}</p>
                                </div>
                            </div>
                            <Link href={`/interview/${report.interviewId}/feedback`} passHref>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    View & Download PDF
                                </Button>
                            </Link>
                        </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No reports found.</p>
                        <p className="text-sm">Complete an interview to generate a new feedback report.</p>
                    </div>
                )}
            </CardContent>
        </Card>

    </div>
  );
}
