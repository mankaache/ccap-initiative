'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, FileText, Calendar, User, ExternalLink, Edit2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/layout/FullPageLoader';
import { useAuth } from '@/firebase/useAuth';
import { toast } from 'react-toastify';
import { fetchAcceptedArticles, fetchAllArticles } from '@/firebase/services/adminService';
import { Article } from '@/types';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

export default function ArticlesList() {
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
const{t} = useTranslation()

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const allArticles = await fetchAcceptedArticles();
        setArticles(allArticles as Article[]);
        console.log('allArticles', allArticles);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

     const filteredArticles = articles?.filter((doc) =>
    [doc.title, doc.source, doc.date]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  
    const {user} = useAuth();

      if (loading) {
    return (
      <div className="min-h-screen">

        <FullPageLoader/>
      </div>
    );
  }




  const getTypeIcon = (type: 'text' | 'pdf') => {
    return type === 'pdf' ? '📄' : '📝';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('admin.articles.title')}</h1>
          <p className="text-muted-foreground">{t('admin.articles.titleDesc')}</p>
        </div>
        <Button
          onClick={() => navigate.push('/admin/articles/create')}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
        {t('admin.articles.add')}
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t('admin.articles.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredArticles.length} {t('admin.articles.article')} {filteredArticles.length !== 1 ? 's' : ''}
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
                 <Link
                      href={`/admin/articles/edit/${article.id}`}
                      className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                          <Edit2Icon className="w-4 h-4"/>{t('admin.articles.edit')}
                      </Link>
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
                    <span>{article.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span>{t('admin.articles.source')}: {article.source}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/articles/${article.id}`)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('admin.articles.readArticle')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('admin.articles.noArticles')}</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? `${t('admin.articles.adjustSearch')}` : `${t('admin.articles.adjustSearchOr')}`}
          </p>
          {!searchTerm && (
            <Button onClick={() => navigate.push('/admin/articles/create')}>
              <Plus className="w-4 h-4 mr-2" />
              {t('admin.articles.createArticle')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}