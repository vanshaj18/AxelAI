'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';

export async function downloadReportAction(filename: string) {
  const transcriptsDir = path.join(process.cwd(), 'transcripts');
  const filePath = path.join(transcriptsDir, filename);

  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      throw new Error('Report not found.');
    }
    const fileContents = await fs.readFile(filePath, 'utf8');

    const headersList = headers();

    return {
      success: true,
      data: fileContents,
    };
  } catch (error) {
    console.error('Download error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage, data: null };
  }
}
