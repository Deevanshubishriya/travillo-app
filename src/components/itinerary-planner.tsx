'use client';

import { useState, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { generateItineraryAction } from '@/actions/plan-itinerary';
import { Loader2, Send, Sparkles, CalendarDays, MapPin, ThumbsUp } from 'lucide-react';

export function ItineraryPlanner() {
  const { toast } = useToast();
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [interests, setInterests] = useState('');
  const [generatedItinerary, setGeneratedItinerary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setGeneratedItinerary(null);

    if (!destination.trim() || duration === '' || Number(duration) <= 0 || !interests.trim()) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in destination, a valid duration (days), and your interests.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await generateItineraryAction(destination, Number(duration), interests);
      if (result.success && result.itineraryPlan) {
        setGeneratedItinerary(result.itineraryPlan);
        toast({
          title: 'Itinerary Generated!',
          description: 'Your personalized travel plan is ready below.',
        });
      } else {
        setGeneratedItinerary(`Error: ${result.error || 'Could not generate itinerary.'}`);
        toast({
          title: 'Generation Failed',
          description: result.error || 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting itinerary request:', error);
      setGeneratedItinerary('Error: An unexpected error occurred. Please check the console.');
      toast({
        title: 'Generation Failed',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-accent" /> AI Itinerary Planner
        </CardTitle>
        <CardDescription>Tell us about your dream trip to Uttarakhand, and we&apos;ll craft a plan for you!</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="destination" className="flex items-center"><MapPin className="h-4 w-4 mr-1 text-muted-foreground"/> Destination</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Rishikesh, Auli, Nainital"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="flex items-center"><CalendarDays className="h-4 w-4 mr-1 text-muted-foreground"/> Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="e.g., 3"
                min="1"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests" className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1 text-muted-foreground"/>Interests</Label>
            <Textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., Trekking, spirituality, wildlife, local cuisine, adventure sports"
              required
              rows={3}
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
            Generate Itinerary
          </Button>
        </CardFooter>
      </form>

      {generatedItinerary && (
        <div className="mt-6 p-6 border-t">
          <h3 className="text-xl font-semibold text-primary mb-3">Your Custom Itinerary:</h3>
          <div
            className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md whitespace-pre-wrap font-mono text-xs"
          >
            {generatedItinerary}
          </div>
        </div>
      )}
    </Card>
  );
}
