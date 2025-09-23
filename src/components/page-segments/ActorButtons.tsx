"use client";

import { useAuth } from "@/firebase/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export function ActorButtons() {
  const { t } = useTranslation();
    const {user} = useAuth();
  const pathname = usePathname();
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (!user || !user.actorCategory  || !pathname) {
      setShowActions(false);
      return;
    }

    // Extract the category from the URL
    // Matches /actor/[category]/... or /actor/[category]/[subcategory]/...
    const pathSegments = pathname.split("/").filter(Boolean); // remove empty
    if (pathSegments[0] === "actor") {
      const routeCategory = pathSegments[1];
      if (routeCategory?.toLowerCase() === user.actorCategory.toLowerCase()) {
        setShowActions(true);
        return;
      }
    }

    setShowActions(false);
  }, [pathname, user]);

  if (!showActions) return null;

  return (
    <div className="flex max-w-7xl justify-end py-8 items-center gap-4">
      <Link
        className="bg-gradient-to-l from-primary to-secondary text-white py-2 px-4 rounded text-sm"
        href="/create-project"
      >
        {t('actor.createProject')}
      </Link>
    
    </div>
  );
}
