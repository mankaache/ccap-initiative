'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Calendar, User, Download, Share, Eye, Languages, BookOpen } from 'lucide-react';
import {useRouter } from 'next/router';

export default function DocumentDetails() {
  const navigate = useRouter();
  const { id } = navigate.query;

  // Mock data - in real app, fetch based on id
  const document = {
    id: '1',
    title: 'Economic Development Policy Framework 2024',
    description: 'Comprehensive policy document outlining economic development strategies and initiatives for sustainable growth, job creation, and poverty reduction across all regions.',
    category: 'national' as const,
    type: 'Policy Document',
    pages: 45,
    dateOfCreation: '2024-01-15',
    author: 'Ministry of Economic Affairs',
    language: 'English',
    contentPreview: `
      <h1>Executive Summary</h1>
      
      <p>The Economic Development Policy Framework 2024 represents a comprehensive roadmap for achieving sustained economic growth and development. This document outlines strategic priorities, implementation mechanisms, and expected outcomes for the next five years.</p>
      
      <h2>Key Policy Objectives</h2>
      
      <ul>
        <li><strong>GDP Growth Target:</strong> Achieve annual GDP growth of 6-8% over the next five years</li>
        <li><strong>Employment Creation:</strong> Generate 500,000 new jobs in priority sectors</li>
        <li><strong>Private Sector Development:</strong> Increase private sector contribution to GDP by 15%</li>
        <li><strong>Regional Balance:</strong> Ensure equitable development across all regions</li>
        <li><strong>Sustainability:</strong> Integrate environmental considerations in all development initiatives</li>
      </ul>
      
      <h2>Strategic Pillars</h2>
      
      <h3>1. Infrastructure Development</h3>
      <p>Massive investment in transport, energy, and digital infrastructure to support economic activities and improve connectivity. Priority areas include road networks, renewable energy projects, and broadband expansion.</p>
      
      <h3>2. Human Capital Development</h3>
      <p>Strengthening education and skills training programs to develop a workforce capable of driving economic transformation. Focus on technical and vocational education, university research capacity, and lifelong learning initiatives.</p>
      
      <h3>3. Innovation and Technology</h3>
      <p>Promoting research and development, supporting startup ecosystems, and facilitating technology transfer to enhance productivity and competitiveness across sectors.</p>
      
      <blockquote>
        "Economic development must be inclusive, sustainable, and beneficial to all citizens. This framework provides the blueprint for achieving these goals." - Minister of Economic Affairs
      </blockquote>
      
      <h2>Implementation Timeline</h2>
      
      <p>The framework will be implemented in three phases:</p>
      
      <ul>
        <li><strong>Phase 1 (2024-2025):</strong> Foundation building and quick wins</li>
        <li><strong>Phase 2 (2026-2027):</strong> Scaling successful initiatives</li>
        <li><strong>Phase 3 (2028-2029):</strong> Consolidation and sustainability</li>
      </ul>
      
      <p>Regular monitoring and evaluation will ensure adaptive management and course correction as needed.</p>
    `,
    fileSize: '2.4 MB',
    downloadCount: 1547,
    lastAccessed: '2024-01-20',
    version: '1.2',
    tags: ['Policy', 'Economic Development', 'Strategy', 'Government', 'Planning'],
    relatedDocuments: [
      {
        id: '2',
        title: 'Infrastructure Investment Guidelines',
        type: 'Guidelines'
      },
      {
        id: '3',
        title: 'Human Resource Development Strategy',
        type: 'Strategy Document'
      }
    ]
  };

  const getCategoryColor = (category: 'international' | 'national' | 'regulation') => {
    switch (category) {
      case 'international':
        return 'bg-primary/10 text-primary';
      case 'national':
        return 'bg-secondary/10 text-secondary';
      case 'regulation':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: 'international' | 'national' | 'regulation') => {
    switch (category) {
      case 'international':
        return '🌍';
      case 'national':
        return '🏛️';
      case 'regulation':
        return '⚖️';
      default:
        return '📄';
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: document.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/documents')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="text-2xl">{getCategoryIcon(document.category)}</span>
                  <Badge className={getCategoryColor(document.category)}>
                    {document.category}
                  </Badge>
                  <Badge variant="outline">
                    {document.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              <CardTitle className="text-3xl mb-4">{document.title}</CardTitle>
              <CardDescription className="text-lg leading-relaxed">
                {document.description}
              </CardDescription>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>By {document.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(document.dateOfCreation).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Languages className="w-4 h-4" />
                    <span>{document.language}</span>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {document.pages} pages
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Content Preview
                  </h3>
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: document.contentPreview }}
                  />
                </div>

                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h4 className="text-lg font-semibold mb-2">Full Document Available</h4>
                  <p className="text-muted-foreground mb-4">
                    Access the complete {document.pages}-page document with detailed analysis and recommendations.
                  </p>
                  <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    <Download className="w-4 h-4 mr-2" />
                    Download Full Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Document Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Type:</span>
                  <span className="ml-2 text-muted-foreground">{document.type}</span>
                </div>
                <div>
                  <span className="font-medium">Category:</span>
                  <span className="ml-2 text-muted-foreground">{document.category}</span>
                </div>
                <div>
                  <span className="font-medium">Language:</span>
                  <span className="ml-2 text-muted-foreground">{document.language}</span>
                </div>
                <div>
                  <span className="font-medium">Pages:</span>
                  <span className="ml-2 text-muted-foreground">{document.pages}</span>
                </div>
                <div>
                  <span className="font-medium">File Size:</span>
                  <span className="ml-2 text-muted-foreground">{document.fileSize}</span>
                </div>
                <div>
                  <span className="font-medium">Version:</span>
                  <span className="ml-2 text-muted-foreground">{document.version}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">{document.downloadCount.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Last Accessed:</span>
                  <span className="ml-2">{new Date(document.lastAccessed).toLocaleDateString()}</span>
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
                {document.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Related Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.relatedDocuments.map((relDoc) => (
                  <div 
                    key={relDoc.id} 
                    className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => navigate.push(`/admin/documents/${relDoc.id}`)}
                  >
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{relDoc.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {relDoc.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="w-4 h-4 mr-2" />
                  View in Browser
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom CSS for document content */}
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
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 1.25rem 0 0.5rem 0;
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