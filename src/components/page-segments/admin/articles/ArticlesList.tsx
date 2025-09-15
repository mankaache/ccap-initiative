'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Calendar, User, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/router';

export default function ArticlesList() {
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const articles = [
    {
      id: '1',
      title: 'New Infrastructure Development Initiative',
      description: 'Comprehensive overview of the new infrastructure projects planned for the Central Region.',
      type: 'text' as const,
      category: 'national' as const,
      source: 'Government Press',
      date: '2024-01-15',
      author: 'GU Group',
    },
    {
      id: '2',
      title: 'Community Development Report 2024',
      description: 'Annual report on community development activities and achievements.',
      type: 'pdf' as const,
      category: 'regional' as const,
      source: 'SU Organization',
      date: '2024-01-10',
      author: 'SU Organization',
    },
    {
      id: '3',
      title: 'Economic Growth Projections',
      description: 'Analysis of economic trends and growth projections for the next fiscal year.',
      type: 'text' as const,
      category: 'national' as const,
      source: 'Economic Times',
      date: '2024-01-08',
      author: 'Admin',
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: 'text' | 'pdf') => {
    return type === 'pdf' ? '📄' : '📝';
  };

  const getCategoryColor = (category: 'national' | 'regional') => {
    return category === 'national' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground">Manage news articles and publications</p>
        </div>
        <Button
          onClick={() => navigate.push('/admin/articles/create')}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Article
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-lg">{getTypeIcon(article.type)}</span>
                </div>
                <Badge className={getCategoryColor(article.category)}>
                  {article.category}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span>Source: {article.source}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/articles/${article.id}`)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first article.'}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate.push('/admin/articles/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Article
            </Button>
          )}
        </div>
      )}
    </div>
  );
}