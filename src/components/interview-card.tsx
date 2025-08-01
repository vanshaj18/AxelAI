
'use client';

import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight, Calendar, Briefcase, Loader2 } from 'lucide-react';
import type { Interview } from '@/lib/types';
import { format } from 'date-fns';
import { useState } from 'react';
import { usePageLoader } from '@/hooks/use-page-loader';
import { useRouter } from 'next/navigation';

export function InterviewCard({ interview }: { interview: Interview }) {
  const { showLoader } = usePageLoader();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const getBadgeVariant = (status: Interview['status']) => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Upcoming':
        return 'secondary';
      case 'Past':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getButtonText = (status: Interview['status']) => {
    switch (status) {
        case 'Active':
            return 'Begin Interview';
        case 'Upcoming':
            return 'Upcoming Interview';
        case 'Past':
            return 'View Feedback';
    }
  }

  const getLink = (status: Interview['status'], id: string) => {
    switch (status) {
        case 'Past':
            return `/interview/${id}/feedback`;
        default:
            return `/interview/${id}`;
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (interview.status === 'Active') {
      e.preventDefault();
      setIsLoading(true);
      showLoader();
      router.push(getLink(interview.status, interview.id));
    } else {
      showLoader();
    }
  };


  return (
    <Card className="flex flex-col transition-all hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-headline text-xl">{interview.role}</CardTitle>
          <Badge variant={getBadgeVariant(interview.status)}>
            {interview.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1">
          <Briefcase size={14} />
          {interview.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{format(new Date(interview.date), 'PPP')}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={getLink(interview.status, interview.id)} className="w-full" passHref>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 animate-spin" /> : null}
            {isLoading ? "Starting..." : getButtonText(interview.status)}
            {!isLoading && <ArrowRight className="ml-2" />}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
