
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AxelLogo } from '@/components/axel-logo';
import { generateLoginCode, verifyLoginCode } from './actions';
import { Loader2 } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

const codeSchema = z.object({
  email: z.string().email(),
  code: z.string().min(8, { message: 'Code must be 8 characters long.' }).max(8),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type CodeFormValues = z.infer<typeof codeSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
    },
  });

  const codeForm = useForm<CodeFormValues>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      email: '',
      code: '',
    },
  });

  const handleGenerateCode = async (values: EmailFormValues) => {
    setIsGeneratingCode(true);
    const result = await generateLoginCode(values.email);

    if (result.success) {
      toast({
        title: 'Code Generated',
        description: 'A login code has been sent to your email. (Check console for mock).',
      });
      setStep('code');
      codeForm.setValue('email', values.email);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
    setIsGeneratingCode(false);
  };

  const handleVerifyCode = async (values: CodeFormValues) => {
    setIsVerifying(true);
    const result = await verifyLoginCode(values.email, values.code);
    if (result.success) {
      toast({
        title: 'Login Successful',
        description: "You've been successfully logged in.",
      });
      router.push('/dashboard');
      router.refresh(); 
    } else {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: result.error,
      });
    }
    setIsVerifying(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <AxelLogo />
          </div>
          <CardTitle className="font-headline text-2xl">Login Interview Session</CardTitle>
          <CardDescription>
            {step === 'email'
              ? 'Enter your email to receive a login code.'
              : 'Check your email for the 8-character code.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' ? (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleGenerateCode)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isGeneratingCode}>
                  {isGeneratingCode ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Generate Code
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...codeForm}>
              <form onSubmit={codeForm.handleSubmit(handleVerifyCode)} className="space-y-6">
                 <FormField
                  control={codeForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={codeForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input placeholder="A1B2C3D4" {...field} autoComplete="one-time-code" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isVerifying}>
                   {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Login
                </Button>
                 <Button variant="link" size="sm" className="w-full" onClick={() => {
                   setStep('email');
                   emailForm.setValue('email', codeForm.getValues('email'));
                   }}>
                    Use a different email
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
