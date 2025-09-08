"use client"

import OrganizationCard from '@/components/OrganizationCard';
import { getCategoryDescription, getCategoryTitle, organizations } from '@/data/organisation';
import { useParams } from 'next/navigation';

const ActorCategory = () => {
  const { category } = useParams<{ category: string }>();
  

  const categoryOrganizations = organizations.filter(org => org.category === category);
  const title = getCategoryTitle(category);
  const description = getCategoryDescription(category);

  return (
  <>
   <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 flex justify-center items-center h-40 w-full">
    <div className="max-w-5xl pt-5 flex h-full items-center px-4 flex-col gap-2">
         <h1 className="text-3xl font-bold text-left text-foreground mb-2">{title} Actors</h1>
          <p className="text-lg text-muted-foreground text-left">{description}</p>
        </div>
   </div>
      <main className=" max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8 ">
          
          <div className="mt-4 font-semibold text-muted-foreground">
            {categoryOrganizations.length} organizations found
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryOrganizations.map((organization) => (
            <OrganizationCard 
              key={organization.id} 
              organization={organization} 
            />
          ))}
        </div>
        
        {categoryOrganizations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No organizations found in this category.</p>
          </div>
        )}
      </main>
    </>
  );
};

export default ActorCategory