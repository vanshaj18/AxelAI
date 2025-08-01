
'use client'
import { InterviewCard } from "@/components/interview-card";
import type { Interview } from "@/lib/types";
import { mockInterviews } from "@/lib/mock-data";


export default function DashboardPage() {
  const interviews: Interview[] = mockInterviews;

  const activeInterviews = interviews.filter(
    (interview) => interview.status === "Active"
  );
  const upcomingInterviews = interviews.filter(
    (interview) => interview.status === "Upcoming"
  );
  const pastInterviews = interviews.filter(
    (interview) => interview.status === "Past"
  );

  const InterviewSection = ({ title, interviews }: { title: string, interviews: Interview[] }) => {
    return (
      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          {title}
        </h2>
        {interviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No {title.toLowerCase()} interviews found.
          </p>
        )}
      </section>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
      </div>

      <InterviewSection title="Active Interviews" interviews={activeInterviews} />
      <InterviewSection title="Upcoming Interviews" interviews={upcomingInterviews} />
      <InterviewSection title="Past Interviews" interviews={pastInterviews} />
      
    </div>
  );
}
