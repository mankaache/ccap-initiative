"use client";

import { useMemo, useState } from "react";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, MapPin, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const cameroonLocations = {

  extremeNord: [
    { name: "Maroua", lat: 10.59, lng: 14.32, type: "capital" },
    { name: "Kousséri", lat: 12.08, lng: 15.03, type: "city" },
    { name: "Yagoua", lat: 10.34, lng: 15.23, type: "city" },
    { name: "Kaélé", lat: 10.11, lng: 14.45, type: "town" },
    { name: "Mora", lat: 11.05, lng: 14.14, type: "town" },
    { name: "Mokolo", lat: 10.74, lng: 13.80, type: "town" }
  ],

  nord: [
    { name: "Garoua", lat: 9.30, lng: 13.40, type: "capital" },
    { name: "Poli", lat: 8.52, lng: 13.16, type: "town" },
    { name: "Guider", lat: 9.93, lng: 13.95, type: "city" },
    { name: "Tcholliré", lat: 8.38, lng: 14.12, type: "town" }
  ],

  adamaoua: [
    { name: "Tibati", lat: 6.47, lng: 12.62, type: "town" },
    { name: "Tignère", lat: 7.32, lng: 11.98, type: "town" },
    { name: "Banyo", lat: 6.75, lng: 11.81, type: "town" },
    { name: "Meiganga", lat: 6.52, lng: 14.30, type: "town" },
    { name: "Ngaoundéré", lat: 7.33, lng: 13.58, type: "capital" }
  ],

  est: [
    { name: "Yokadouma", lat: 3.51, lng: 15.05, type: "town" },
    { name: "Abong-Mbang", lat: 4.00, lng: 13.08, type: "town" },
    { name: "Batouri", lat: 4.43, lng: 14.36, type: "town" },
    { name: "Bertoua", lat: 4.58, lng: 13.68, type: "capital" },
    { name: "Kenzou", lat: 4.10, lng: 14.50, type: "town" },  // approximate
    { name: "Lomié", lat: 3.16, lng: 13.62, type: "town" }
  ],

  centre: [
    { name: "Nanga-Eboko", lat: 4.67, lng: 12.37, type: "town" },
    { name: "Monatélé", lat: 3.87, lng: 11.30, type: "town" },
    { name: "Bafia", lat: 4.75, lng: 11.23, type: "city" },
    { name: "Ntui", lat: 4.70, lng: 11.15, type: "town" },
    { name: "Mfou", lat: 3.72, lng: 11.76, type: "town" },
    { name: "Ngoumou", lat: 3.60, lng: 11.50, type: "town" },
    { name: "Yaoundé", lat: 3.87, lng: 11.52, type: "capital" },
    { name: "Éséka", lat: 3.65, lng: 10.77, type: "town" },
    { name: "Akonolinga", lat: 3.77, lng: 12.25, type: "town" },
    { name: "Mbalmayo", lat: 3.52, lng: 11.50, type: "town" },
    { name: "Obala", lat: 4.17, lng: 11.53, type: "town" }
  ],

  sud: [
    { name: "Ebolowa", lat: 2.90, lng: 11.15, type: "capital" },
    { name: "Sangmélima", lat: 2.94, lng: 11.98, type: "town" },
    { name: "Kribi", lat: 2.94, lng: 9.91, type: "town" },
    { name: "Ambam", lat: 2.35, lng: 11.47, type: "town" },
    { name: "Campo", lat: 2.23, lng: 9.98, type: "town" }
  ],

  littoral: [
    { name: "Nkongsamba", lat: 4.96, lng: 9.94, type: "town" },
    { name: "Yabassi", lat: 4.47, lng: 9.97, type: "town" },
    { name: "Édéa", lat: 3.80, lng: 10.12, type: "city" },
    { name: "Douala", lat: 4.05, lng: 9.70, type: "capital" },
    { name: "Loum", lat: 4.72, lng: 9.74, type: "town" },
    { name: "Mbanga", lat: 4.51, lng: 9.57, type: "town" },
    { name: "Dizangué", lat: 4.70, lng: 9.68, type: "town" }
  ],

  ouest: [
    { name: "Mbouda", lat: 5.64, lng: 10.25, type: "town" },
    { name: "Bafang", lat: 5.17, lng: 10.18, type: "town" },
    { name: "Baham", lat: 5.23, lng: 10.13, type: "town" },
    { name: "Bandjoun", lat: 5.22, lng: 10.42, type: "town" },
    { name: "Dschang", lat: 5.44, lng: 10.05, type: "town" },
    { name: "Bafoussam", lat: 5.48, lng: 10.42, type: "capital" },
    { name: "Bangangté", lat: 5.14, lng: 10.51, type: "town" },
    { name: "Foumban", lat: 5.73, lng: 10.90, type: "town" }
  ],

  'nord-ouest': [
    { name: "Fundong", lat: 6.25, lng: 10.27, type: "town" },
    { name: "Kumbo", lat: 6.20, lng: 10.67, type: "town" },
    { name: "Nkambé", lat: 6.17, lng: 10.70, type: "town" },
    { name: "Wum", lat: 6.38, lng: 10.07, type: "town" },
    { name: "Bamenda", lat: 5.96, lng: 10.15, type: "capital" },
    { name: "Mbengwi", lat: 6.14, lng: 10.40, type: "town" },
    { name: "Ndop", lat: 6.07, lng: 10.47, type: "town" },
    { name: "Bafut", lat: 5.92, lng: 10.15, type: "town" }
  ],

  'sud-ouest': [
    { name: "Buéa", lat: 4.16, lng: 9.23, type: "capital" },
    { name: "Limbé", lat: 4.02, lng: 9.19, type: "city" },
    { name: "Bangem", lat: 5.15, lng: 9.55, type: "town" },
    { name: "Menji", lat: 5.03, lng: 9.45, type: "town" },
    { name: "Mamfé", lat: 5.78, lng: 9.29, type: "town" },
    { name: "Kumba", lat: 4.64, lng: 9.44, type: "city" },
    { name: "Mundemba", lat: 5.85, lng: 9.38, type: "town" },
    { name: "Tombel", lat: 4.63, lng: 9.32, type: "town" },
    { name: "Tiko", lat: 4.08, lng: 9.36, type: "town" },
    { name: "Fontem", lat: 5.47, lng: 9.88, type: "town" }
  ]

};


// Available regions
const regions = [
  "centre",
  "littoral",
  "extrême nord",
  "nord",
  "nord-ouest",
  "sud-ouest",
  "ouest",
  "est",
  "sud",
  "adamawa",
];

const EnhancedLocationForm = ({
  organizationData,
  setOrganizationData,
}: any) => {
  const [newRegion, setNewRegion] = useState("");
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  // Available locations based on selected regions
  const availableLocations = useMemo(() => {
    if (!organizationData?.region || organizationData?.region?.length === 0)
      return [];

    return organizationData?.region.reduce((acc: any, regionName: any) => {
      const regionKey = regionName.toLowerCase();
      //@ts-ignore
      if (cameroonLocations[regionKey]) {
        acc.push(
          //@ts-ignore
          ...cameroonLocations[regionKey].map((loc) => ({
            ...loc,
            region: regionName,
            name: `${loc.name} (${regionName})`, // <-- store formatted name here
          }))
        );
      }
      return acc;
    }, []);
  }, [organizationData?.region]);

  // Add / remove region
  const addRegion = () => {
    if (newRegion && !organizationData.region.includes(newRegion)) {
      setOrganizationData((prev: any) => ({
        ...prev,
        region: [...prev.region, newRegion],
        // do NOT reset specificLocation
      }));
      setNewRegion("");
    }
  };

  const removeRegion = (regionToRemove: string) => {
    setOrganizationData((prev: any) => ({
      ...prev,
      region: prev.region.filter((r: string) => r !== regionToRemove),
      // Remove only locations from the removed region
      specificLocation: prev.specificLocation.filter(
        (loc: any) => loc.region !== regionToRemove
      ),
    }));
  };

  // Toggle multi-select location
  const toggleLocation = (location: any) => {
    setOrganizationData((prev: any) => {
      const exists = prev.specificLocation.find(
        (loc: any) => loc.name === location.name
      );
      let updatedLocations;
      if (exists) {
        updatedLocations = prev.specificLocation.filter(
          (loc: any) => loc.name !== location.name
        );
      } else {
        updatedLocations = [...prev.specificLocation, location];
      }
      return { ...prev, specificLocation: updatedLocations };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Region Selection */}
      <div className="space-y-4">
        <Label className="" htmlFor="regions">
          {t("project.region")} *
        </Label>
        <div className="flex space-x-2">
          <Select value={newRegion} onValueChange={setNewRegion}>
            <SelectTrigger className="flex-1">
              <SelectValue
                placeholder={t ? t("project.region2") : "Select a region"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Regions</SelectLabel>
                {regions
                  .filter((region) => !organizationData.region.includes(region))
                  .map((region) => (
                    <SelectItem key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="button"
            className="px-2 text-sm py-2"
            onClick={addRegion}
            disabled={!newRegion}
          >
            {t('map.add')}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {organizationData.region.map((region: string) => (
            <Badge key={region} variant="secondary" className="px-3 py-1">
              {region.charAt(0).toUpperCase() + region.slice(1)}
              <button
                type="button"
                onClick={() => removeRegion(region)}
                className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Multi-Select Specific Location */}
      <div className="space-y-4">
        <Label htmlFor="location">
          {t("map.specificLocation")} *
        </Label>

        {organizationData?.region.length === 0 && (
          <div className="w-full">
            <Input
              placeholder="Please select a region first to see available locations"
              className="w-full"
            />
          </div>
        )}

        {availableLocations.length > 0 && (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-between"
              >
                {organizationData.specificLocation.length > 0
                  ? `${organizationData.specificLocation.length} ${t('map.selected')}`
                  : `${t('map.selectLocations')}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={t('map.search')}/>
                <CommandList>
                  <CommandEmpty>{t('map.noFound')}.</CommandEmpty>
                  <CommandGroup>
                    {availableLocations.map((location: any) => (
                      <CommandItem
                        key={`${location.name}-${location.region}`}
                        onSelect={() => toggleLocation(location)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            organizationData.specificLocation.find(
                              (loc: any) => loc.name === location.name
                            )
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {location.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}

        {/* Show selected as badges */}
        <div className="flex flex-wrap gap-2">
          {organizationData.specificLocation.map((loc: any) => (
            <Badge key={loc.name} variant="outline" className="px-3 py-1">
              {loc.name}
              <button
                type="button"
                onClick={() => toggleLocation(loc)}
                className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLocationForm;
