'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Calendar, User, ExternalLink, Download, Eye, Share } from 'lucide-react';
import {  useRouter } from 'next/router';


export default function ArticleDetails() {
  const navigate = useRouter();
 
  const article = {
    id: '1',
    title: 'New Infrastructure Development Initiative',
    description: 'Comprehensive overview of the new infrastructure projects planned for the Central Region, including road networks, water systems, and digital connectivity improvements.',
    type: 'text' as 'text' | 'pdf',
    category: 'national' as const,
    source: 'Government Press',
    date: '2024-01-15',
    author: 'GU Group',
    content: `
      <h1>Infrastructure Development in Central Region</h1>
      
      <p>The Central Region is set to undergo a massive infrastructure transformation over the next three years, with government and international partners committing significant resources to improve connectivity, water access, and digital infrastructure.</p>
      
      <h2>Key Projects Overview</h2>
      
      <p>The comprehensive development plan includes several major components:</p>
      
      <ul>
        <li><strong>Road Network Expansion:</strong> Construction of 450 kilometers of new roads and rehabilitation of existing infrastructure</li>
        <li><strong>Water Supply Systems:</strong> Installation of modern water treatment facilities serving 150,000 residents</li>
        <li><strong>Digital Connectivity:</strong> Fiber optic cable installation connecting rural communities to high-speed internet</li>
        <li><strong>Educational Infrastructure:</strong> Construction and renovation of 25 schools and educational facilities</li>
      </ul>
      
      <h2>Timeline and Budget</h2>
      
      <p>The total project budget is estimated at <strong>15.2 billion XAF</strong>, with implementation scheduled over 36 months. The first phase, focusing on road construction, will begin in March 2024.</p>
      
      <blockquote>
        "This initiative represents the largest infrastructure investment in the Central Region's history and will significantly improve the quality of life for our citizens." - Regional Development Minister
      </blockquote>
      
      <h2>Community Impact</h2>
      
      <p>The infrastructure development is expected to create over 3,000 direct jobs and stimulate economic growth throughout the region. Local communities have been actively involved in the planning process to ensure projects meet their specific needs.</p>
      
      <p>Environmental impact assessments have been completed, and all projects include sustainability measures to minimize ecological disruption while maximizing long-term benefits.</p>
    `,
    image: null,
    readTime: '5 min read',
    views: 1247,
    tags: ['Infrastructure', 'Development', 'Central Region', 'Government'],
  };

  const getCategoryColor = (category: 'national' | 'regional') => {
    return category === 'national' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/articles')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Article Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <Badge variant="outline">
                    {article.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  {article.type === 'pdf' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
              
              <CardTitle className="text-3xl mb-4">{article.title}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                {article.description}
              </CardDescription>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>By {article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{article.views.toLocaleString()} views</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {article.readTime}
                </div>
              </div>
            </CardHeader>
            
            {article.type === 'text' ? (
              <CardContent>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </CardContent>
            ) : (
              <CardContent>
                <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                  <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">PDF Document</h3>
                  <p className="text-muted-foreground mb-4">
                    This article is available as a PDF document.
                  </p>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Article Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Article Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Source:</span>
                  <span className="ml-2 text-muted-foreground">{article.source}</span>
                </div>
                <div>
                  <span className="font-medium">Type:</span>
                  <span className="ml-2 text-muted-foreground">{article.type}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-muted-foreground">{article.category}</span>
                </div>
                <div>
                  <span className="font-medium">Published:</span>
                  <span className="ml-2 text-muted-foreground">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Source
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
                {article.type === 'pdf' && (
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom CSS for article content */}
      <style>{`
        .prose h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 2rem 0 1rem 0;
          color: hsl(var(--foreground));
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem 0;
          color: hsl(var(--foreground));
        }
        .prose p {
          margin: 1rem 0;
          line-height: 1.7;
          color: hsl(var(--foreground));
        }
        .prose ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }
        .prose li {
          margin: 0.5rem 0;
          color: hsl(var(--foreground));
        }
        .prose blockquote {
          border-left: 4px solid hsl(var(--primary));
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          background: hsl(var(--muted));
          font-style: italic;
          color: hsl(var(--muted-foreground));
        }
        .prose strong {
          font-weight: 600;
          color: hsl(var(--foreground));
        }
      `}</style>
    </div>
  );
}