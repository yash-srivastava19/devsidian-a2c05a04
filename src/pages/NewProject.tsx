
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '@/services/projectService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const NewProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    isPublic: true,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isPublic: checked }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Project title is required",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const newProject = await createProject({
        ...formData,
        tags,
        userId: 'user1', // In a real app, this would come from authentication
      });
      
      toast({
        title: "Success",
        description: "Project created successfully!",
      });
      
      navigate(`/project/${newProject.id}`);
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Enter the basic information about your project to start documenting your journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A brief description of your project"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-theme-50 text-theme-500 dark:bg-theme-900 dark:text-theme-200">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
                <Input
                  id="tagInput"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add tags (press Enter to add)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repository"
                  type="url"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://your-demo-site.com"
                  type="url"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isPublic" 
                  checked={formData.isPublic}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isPublic">Make project public</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </Layout>
  );
};

export default NewProject;
