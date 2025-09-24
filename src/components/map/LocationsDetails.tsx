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
  centre: [
    { name: "Yaoundé", lat: 3.8667, lng: 11.5167, type: "capital" },
    { name: "Mbalmayo", lat: 3.5167, lng: 11.5, type: "city" },
    { name: "Obala", lat: 4.1833, lng: 11.5333, type: "city" },
    { name: "Eséka", lat: 3.65, lng: 10.7667, type: "city" },
    { name: "Mfou", lat: 3.7167, lng: 11.6333, type: "city" },
    { name: "Bafia", lat: 4.75, lng: 11.2333, type: "city" },
    { name: "Ntui", lat: 4.8167, lng: 11.8167, type: "town" },
    { name: "Ayos", lat: 3.9, lng: 12.5333, type: "town" },
    { name: "Akonolinga", lat: 3.25, lng: 12.25, type: "town" },
  ],
  littoral: [
    { name: "Douala", lat: 4.06, lng: 9.7, type: "capital" },
    { name: "Edéa", lat: 3.8, lng: 10.1333, type: "city" },
    { name: "Nkongsamba", lat: 4.95, lng: 9.9333, type: "city" },
    { name: "Loum", lat: 4.7167, lng: 9.7333, type: "city" },
    { name: "Mbanga", lat: 4.5, lng: 9.5667, type: "city" },
    { name: "Dizangué", lat: 3.7, lng: 10.05, type: "town" },
  ],
  "extrême nord": [
    { name: "Maroua", lat: 10.5833, lng: 14.3167, type: "capital" },
    { name: "Kousseri", lat: 12.0833, lng: 15.0333, type: "city" },
    { name: "Mokolo", lat: 10.7333, lng: 13.8, type: "city" },
    { name: "Yagoua", lat: 10.3333, lng: 15.2333, type: "city" },
    { name: "Kaélé", lat: 10.1, lng: 14.45, type: "city" },
    { name: "Mora", lat: 11.05, lng: 14.1333, type: "town" },
    { name: "Waza", lat: 11.4, lng: 14.6333, type: "town" },
  ],
  nord: [
    { name: "Garoua", lat: 9.3, lng: 13.4, type: "capital" },
    { name: "Ngaoundéré", lat: 7.3167, lng: 13.5833, type: "city" },
    { name: "Figuil", lat: 9.75, lng: 13.9667, type: "city" },
    { name: "Guider", lat: 9.9333, lng: 13.95, type: "city" },
    { name: "Rey Bouba", lat: 8.6667, lng: 14.1833, type: "town" },
    { name: "Tcholliré", lat: 8.3833, lng: 14.1167, type: "town" },
  ],
  "nord-ouest": [
    { name: "Bamenda", lat: 5.9597, lng: 10.1494, type: "capital" },
    { name: "Kumbo", lat: 6.2, lng: 10.6833, type: "city" },
    { name: "Wum", lat: 6.3833, lng: 10.0667, type: "city" },
    { name: "Ndop", lat: 6.0167, lng: 10.4167, type: "city" },
    { name: "Bafut", lat: 6.0833, lng: 10.1167, type: "town" },
    { name: "Tubah", lat: 6.0, lng: 10.2333, type: "town" },
  ],
  "sud-ouest": [
    { name: "Buea", lat: 4.15, lng: 9.2333, type: "capital" },
    { name: "Limbe", lat: 4.0167, lng: 9.2167, type: "city" },
    { name: "Kumba", lat: 4.6333, lng: 9.45, type: "city" },
    { name: "Tiko", lat: 4.0833, lng: 9.3667, type: "city" },
    { name: "Mamfe", lat: 5.7667, lng: 9.3, type: "city" },
    { name: "Tombel", lat: 4.6333, lng: 9.6167, type: "town" },
    { name: "Fontem", lat: 5.4833, lng: 9.9, type: "town" },
  ],
  ouest: [
    { name: "Bafoussam", lat: 5.4667, lng: 10.4167, type: "capital" },
    { name: "Dschang", lat: 5.45, lng: 10.05, type: "city" },
    { name: "Mbouda", lat: 5.6167, lng: 10.25, type: "city" },
    { name: "Bandjoun", lat: 5.3833, lng: 10.4, type: "city" },
    { name: "Bangangté", lat: 5.15, lng: 10.5167, type: "city" },
    { name: "Foumban", lat: 5.7167, lng: 10.9, type: "city" },
    { name: "Bafang", lat: 5.15, lng: 10.1833, type: "town" },
  ],
  est: [
    { name: "Bertoua", lat: 4.5833, lng: 13.6833, type: "capital" },
    { name: "Batouri", lat: 4.4333, lng: 14.3667, type: "city" },
    { name: "Yokadouma", lat: 3.5167, lng: 15.05, type: "city" },
    { name: "Abong-Mbang", lat: 3.9833, lng: 13.1833, type: "city" },
    { name: "Kenzou", lat: 4.2667, lng: 13.4333, type: "town" },
    { name: "Lomié", lat: 3.1833, lng: 13.6167, type: "town" },
  ],
  sud: [
    { name: "Ebolowa", lat: 2.9, lng: 11.15, type: "capital" },
    { name: "Kribi", lat: 2.9333, lng: 9.9167, type: "city" },
    { name: "Sangmélima", lat: 2.9333, lng: 11.9833, type: "city" },
    { name: "Mbalmayo", lat: 3.5167, lng: 11.5, type: "city" },
    { name: "Ambam", lat: 2.3833, lng: 11.2667, type: "town" },
    { name: "Campo", lat: 2.3667, lng: 9.8167, type: "town" },
  ],
  adamawa: [
    { name: "Ngaoundéré", lat: 7.3167, lng: 13.5833, type: "capital" },
    { name: "Meiganga", lat: 6.5167, lng: 14.2833, type: "city" },
    { name: "Tibati", lat: 6.4667, lng: 12.6333, type: "city" },
    { name: "Tignère", lat: 7.3667, lng: 12.65, type: "city" },
    { name: "Banyo", lat: 6.75, lng: 11.8167, type: "town" },
    { name: "Kontcha", lat: 8.2, lng: 12.2333, type: "town" },
  ],
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
