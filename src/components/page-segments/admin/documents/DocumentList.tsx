'use client';


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Calendar, User, Eye, Languages } from 'lucide-react';

import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContexta';

export default function DocumentsList() {
  const navigate = useRouter();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const documents = [
    {
      id: '1',
      title: 'Economic Development Policy Framework 2024',
      description: 'Comprehensive policy document outlining economic development strategies and initiatives.',
      category: 'national' as const,
      type: 'Policy Document',
      pages: 45,
      dateOfCreation: '2024-01-15',
      author: 'Ministry of Economic Affairs',
      language: 'English',
    },
    {
      id: '2',
      title: 'Regional Infrastructure Guidelines',
      description: 'Technical guidelines for infrastructure development in regional areas.',
      category: 'regulation' as const,
      type: 'Guidelines',
      pages: 32,
      dateOfCreation: '2024-01-10',
      author: 'Infrastructure Authority',
      language: 'French',
    },
    {
      id: '3',
      title: 'International Trade Agreement Analysis',
      description: 'Detailed analysis of recent international trade agreements and their implications.',
      category: 'international' as const,
      type: 'Research Paper',
      pages: 67,
      dateOfCreation: '2024-01-08',
      author: 'Trade Commission',
      language: 'English',
    },
    {
      id: '4',
      title: 'Healthcare System Reform Proposal',
      description: 'Comprehensive proposal for healthcare system reforms and modernization.',
      category: 'national' as const,
      type: 'White Paper',
      pages: 78,
      dateOfCreation: '2024-01-05',
      author: 'Health Ministry',
      language: 'French',
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Browse and manage document library</p>
        </div>
        {user?.role === 'admin' && (
          <Button
            onClick={() => navigate.push('/admin/documents/create')}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Document
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-lg">{getCategoryIcon(document.category)}</span>
                </div>
                <Badge className={getCategoryColor(document.category)}>
                  {document.category}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{document.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {document.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="font-semibold text-lg">{document.pages}</div>
                    <div className="text-muted-foreground">Pages</div>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-muted rounded-lg">
                    <Languages className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{document.language}</span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="truncate">{document.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(document.dateOfCreation).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <Badge variant="outline" className="text-xs">
                    {document.type}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/documents/${document.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'No documents available yet.'}
          </p>
          {!searchTerm && user?.role === 'admin' && (
            <Button onClick={() => navigate.push('/admin/documents/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Document
            </Button>
          )}
        </div>
      )}
    </div>
  );
}