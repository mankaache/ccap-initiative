"use client";
import { getCategoryTitle, getSubcategories, hasSubcategories, organizations } from '@/data/organisation';
import { useTranslation } from '@/hooks/useTranslation';
import { useParams } from 'next/navigation';
import OrganizationCard from '../OrganizationCard';
// ... other imports

const SubActorCategory = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();
  const { t } = useTranslation();

  // Filter organizations based on whether we're viewing a category or subcategory
  const filteredOrganizations = subcategory 
    ? organizations.filter(
        //@ts-ignore
        (org) => org.category === category && org.subcategory === subcategory
      )
    : organizations.filter(
        (org) => org.category === category
      );

  const title = getCategoryTitle(category, subcategory);
  const parentTitle = subcategory ? getCategoryTitle(category) : null;

  return (
    <>
      <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 flex justify-center items-center h-40 w-full">
        <div className="max-w-5xl pt-5 flex h-full items-center px-4 flex-col gap-2">
          {/* Breadcrumb navigation */}
          {subcategory && (
            <div className="self-start text-sm text-muted-foreground">
              <a href="/actor" className="hover:text-foreground">
                {t('header.actor')}
              </a>
              {' > '}
              <a href={`/actor/${category}`} className="hover:text-foreground">
                {getCategoryTitle(category)}
              </a>
              {' > '}
              <span className="text-foreground">{title}</span>
            </div>
          )}
          
          <h1 className="text-3xl font-bold capitalize text-left text-foreground mb-2">
            {title === "Etatiques"
              ? `${t("header.actor.State")}`
              : title === "ONGI"
              ? `${t("header.actor.ONGI")}`
              : title === "OSC"
              ? `${t("header.actor.OSC")}`
              : title === "OBC"
              ? `${t("header.actor.OBC")}`
              : title === "SECTEUR PRIVEE"
              ? `${t("header.actor.secteur-privee")}`
              : title}{' '}
            {t("actor.actors")}
          </h1>
          
          {subcategory && parentTitle && (
            <p className="text-lg text-muted-foreground text-left">
              {t('actor.subcategoryOf')} {parentTitle}
            </p>
          )}
        </div>
      </div>
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Show subcategories if we're on a category page that has subcategories */}
        {!subcategory && hasSubcategories(category) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{t('actor.subcategories')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getSubcategories(category).map((subcat) => (
                <a
                  key={subcat.slug}
                  href={`/actor/${category}/${subcat.slug}`}
                  className="block p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <h3 className="font-medium">{subcat.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('actor.exploreSubcategory')}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-8">
          <div className="mt-4 font-semibold text-muted-foreground">
            {filteredOrganizations.length} {t("actor.orgFound")}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrganizations.map((organization) => (
            <OrganizationCard
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("actor.noOrg")}
            </p>
          </div>
        )}
      </main>
    </>
  );
};



export default SubActorCategory