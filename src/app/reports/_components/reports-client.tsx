// src/app/reports/_components/reports-client.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Download } from 'lucide-react';
import { ReportDownloader } from './report-downloader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Report } from '@/lib/types';

export function ReportsClient({ reports }: { reports: Report[] }) {
    const [selectedReportContent, setSelectedReportContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleViewClick = (content: string) => {
        setSelectedReportContent(content);
        setIsModalOpen(true);
    }

  return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
                {reports.length > 0 ? (
                    <ul className="space-y-4">
                        {reports.map((report) => (
                        <li key={report.filename} className="flex items-center justify-between p-4 rounded-lg bg-muted flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <FileText className="h-6 w-6 text-primary" />
                                <div>
                                    <p className="font-medium">{report.filename.replace('.txt', '').replace(/_/g, ' ')}</p>
                                    <p className="text-sm text-muted-foreground">Interview ID: {report.interviewId}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => handleViewClick(report.content)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Report
                                </Button>
                                <ReportDownloader filename={report.filename} />
                            </div>
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
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-3xl h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Feedback Report</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-full">
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap p-4">
                        {selectedReportContent}
                    </pre>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    </>
  );
}
