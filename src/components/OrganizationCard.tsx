import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IOrganization } from "@/data/organisation";
import Link from "next/link";

interface OrganizationCardProps {
  organization: IOrganization;
}

const OrganizationCard = ({ organization }: OrganizationCardProps) => {
  return (
    <Card className="group hover:shadow-hover transition-smooth bg-gradient-card border-border/50">
      <CardHeader className="">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-fast">
            {organization.name}
          </CardTitle>
          {organization.website && (
            <div className="flex items-center gap-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-fast">
              <span className="text-sm">website</span>
              <ExternalLink className="h-3 w-3 text-muted-foreground " />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {organization.description}
        </p>

        <div className="flex items-center gap-4 mb-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {organization.location}
          </div>
        </div>

        <Link
          href={
            organization.subcategory
              ? `/actor/${organization.category}/${organization.subcategory}/${organization.id}`
              : `/actor/${organization.category}/details/${organization.id}`
          }
          className="inline-flex items-center w-full justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-green-600 transition-all duration-200 transform hover:scale-105"
        >
          View Projects
          <ExternalLink className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
