
'use client'
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { InterviewCard } from "@/components/interview-card";
import type { Interview } from "@/lib/types";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageLoader } from "@/hooks/use-page-loader";


export default function DashboardPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const q = query(collection(db, "axelaiDatabase/codingNinjasTest/interviews"));
        const querySnapshot = await getDocs(q);
        const fetchedInterviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Interview));
        setInterviews(fetchedInterviews);
      } catch (err) {
        setError("Failed to fetch interviews. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-56 w-full" />)}
          </div>
        ) : interviews.length > 0 ? (
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

      {error && <p className="text-destructive">{error}</p>}

      <InterviewSection title="Active Interviews" interviews={activeInterviews} />
      <InterviewSection title="Upcoming Interviews" interviews={upcomingInterviews} />
      <InterviewSection title="Past Interviews" interviews={pastInterviews} />
      
    </div>
  );
}
