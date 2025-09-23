"use client";

import OrganizationCard from "@/components/OrganizationCard";

import {
  getCategoryTitle,
  organizations,
} from "@/data/organisation";

import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

import { useParams } from "next/navigation";
import { ActorButtons } from "./ActorButtons";
import { useEffect, useState } from "react";
import { fetchOrganisationsWithoutSubcategory, OrganisationDoc } from "@/firebase/services/projectService";
import { toast } from "react-toastify";
import FullPageLoader from "../layout/FullPageLoader";



const ActorCategory = () => {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();


  const [orga, setOrga] = useState<OrganisationDoc[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadOrg = async () => {
        try {
          setLoading(true);
          const allOrga = await fetchOrganisationsWithoutSubcategory();
          setOrga(allOrga as any);
          console.log('allOrga', allOrga);
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch articles");
        } finally {
          setLoading(false);
        }
      };
  
      loadOrg();
    }, []);


    
  const categoryOrganizations = orga?.filter(
    (org) => org.category.toLowerCase() === category
  );
  const title = getCategoryTitle(category);
  
       if (loading) {
        return (
          <div className="min-h-screen">
    
            <FullPageLoader/>
          </div>
        );
      }

  return (
    <>
      <div className="bg-gradient-to-r from-secondary/60 to-primary/60 via-accent/30 flex justify-center items-center h-40 w-full">
        <div className="max-w-5xl pt-5 flex h-full items-center px-4 flex-col gap-2">
          {/* state actors */}
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
              : ""}
              {' '}
             {t("actor.actors")}
          </h1>
          <p className="text-lg text-muted-foreground text-left">
            {/* {description} */}
          </p>
        </div>
      </div>

      <ActorButtons/>
      <main className=" max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-8 ">
          <div className="mt-4 font-semibold text-muted-foreground">
            {categoryOrganizations.length} {t("actor.orgFound")}
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
            <p className="text-muted-foreground">
              {t("actor.noOrg")}
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default ActorCategory;
