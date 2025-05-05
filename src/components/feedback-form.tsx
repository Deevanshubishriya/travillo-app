
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { submitFeedback } from '@/actions/feedback'; // Import the server action
import { Loader2, Send } from 'lucide-react';

export function FeedbackForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!message.trim()) {
       toast({
         title: "Feedback Required",
         description: "Please enter your feedback message.",
         variant: "destructive",
       });
      setIsLoading(false);
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('feedback', message);


    try {
      // Call the server action (which currently simulates email sending)
      const result = await submitFeedback(formData);

      if (result.success) {
        toast({
          title: "Feedback Received!",
          description: "Thank you for your valuable feedback. (Note: Email sending is simulated).",
        });
        // Reset form
        setName('');
        setEmail('');
        setMessage('');
      } else {
         toast({
            title: "Submission Error",
            description: result.error || "Could not submit feedback. Please try again.",
            variant: "destructive",
         });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
       <CardHeader>
          <CardTitle className="text-2xl text-primary">Feedback Form</CardTitle>
          <CardDescription>Let us know what you think!</CardDescription>
        </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="space-y-1">
              <Label htmlFor="name">Name (Optional)</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
             <div className="space-y-1">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="message">Feedback Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your experience or suggestions..."
              required
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
             {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Submit Feedback
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
