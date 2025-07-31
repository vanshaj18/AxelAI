
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { InterviewCard } from "@/components/interview-card";
import { mockInterviews } from "@/lib/mock-data";

export default function DashboardPage() {
  const activeInterviews = mockInterviews.filter(
    (interview) => interview.status === "Active"
  );
  const upcomingInterviews = mockInterviews.filter(
    (interview) => interview.status === "Upcoming"
  );
  const pastInterviews = mockInterviews.filter(
    (interview) => interview.status === "Past"
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Dashboard</h1>
        {/* <Button>
          <PlusCircle />
          Start New Interview
        </Button> */}
      </div>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          Active Interviews
        </h2>
        {activeInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No active interviews. Start one to get going!
          </p>
        )}
      </section>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          Upcoming Interviews
        </h2>
        {upcomingInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No upcoming interviews scheduled.
          </p>
        )}
      </section>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">
          Past Interviews
        </h2>
        {pastInterviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastInterviews.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No past interview history.</p>
        )}
      </section>
    </div>
  );
}
