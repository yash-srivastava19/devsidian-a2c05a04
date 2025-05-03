
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProject, addEntry } from '@/services/projectService';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Layout from '@/components/Layout';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';

const NewEntry = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: 'productive',
    timeSpent: 30,
    codeSnippet: '',
    resources: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (projectId) {
          const data = await getProject(projectId);
          if (data) {
            setProject(data);
          }
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: "Failed to load project details.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mood: value }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFormData((prev) => ({ ...prev, timeSpent: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Entry title is required",
        variant: "destructive",
      });
      return;
    }
    
    if (!projectId) {
      toast({
        title: "Error",
        description: "Project ID is missing",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Parse resources into array
      const resourcesArray = formData.resources
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      await addEntry(projectId, {
        title: formData.title,
        content: formData.content,
        mood: formData.mood as 'productive' | 'stuck' | 'learning' | 'refactoring' | 'planning',
        timeSpent: formData.timeSpent,
        codeSnippet: formData.codeSnippet.trim() || undefined,
        resources: resourcesArray.length > 0 ? resourcesArray : undefined,
      });
      
      toast({
        title: "Success",
        description: "Progress entry added successfully!",
      });
      
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error('Error adding entry:', error);
      toast({
        title: "Error",
        description: "Failed to add entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Project not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <div className="mb-6">
          <button 
            onClick={() => navigate(`/project/${projectId}`)}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft size={14} className="mr-1" />
            Back to project
          </button>
          <h1 className="text-3xl font-bold">Log Progress for {project.title}</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Add Progress Entry</CardTitle>
              <CardDescription>
                Document what you worked on today and track your development journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Entry Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="What did you accomplish?"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Description</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Describe what you worked on, challenges faced, and solutions found..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mood">How was your session?</Label>
                <RadioGroup 
                  defaultValue={formData.mood} 
                  onValueChange={handleRadioChange}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="productive" id="productive" />
                    <Label htmlFor="productive" className="flex items-center">
                      <span className="mr-1">🚀</span> Productive
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="learning" id="learning" />
                    <Label htmlFor="learning" className="flex items-center">
                      <span className="mr-1">📚</span> Learning
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="stuck" id="stuck" />
                    <Label htmlFor="stuck" className="flex items-center">
                      <span className="mr-1">😓</span> Stuck
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="refactoring" id="refactoring" />
                    <Label htmlFor="refactoring" className="flex items-center">
                      <span className="mr-1">🔧</span> Refactoring
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="planning" id="planning" />
                    <Label htmlFor="planning" className="flex items-center">
                      <span className="mr-1">🗓️</span> Planning
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeSpent">Time Spent (minutes)</Label>
                <Input
                  id="timeSpent"
                  name="timeSpent"
                  type="number"
                  min="0"
                  value={formData.timeSpent}
                  onChange={handleTimeChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="codeSnippet">Code Snippet (optional)</Label>
                <Textarea
                  id="codeSnippet"
                  name="codeSnippet"
                  value={formData.codeSnippet}
                  onChange={handleChange}
                  placeholder="Share a relevant code snippet..."
                  rows={6}
                  className="font-mono"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resources">Resources Used (optional)</Label>
                <Textarea
                  id="resources"
                  name="resources"
                  value={formData.resources}
                  onChange={handleChange}
                  placeholder="Add URLs to helpful resources (one per line)"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Add one URL per line.</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => navigate(`/project/${projectId}`)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Entry'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default NewEntry;
