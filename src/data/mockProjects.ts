import React from 'react'

import { useTranslation } from "@/hooks/useTranslation";


export function getMockProjects() {
  const { t } = useTranslation();


    return  [
    {
      id: "1",
      title: t("project.title1"),
      description: t("project.description1"),
      status: t("project.status.ongoing"),
      budget: "$2.5M",
      fundingSource: "World Bank",
      location: "Douala",
      region: "Littoral Region",
      actors: ["MINEPDED", "Local Communities", "WWF"],
      startDate: "2023-01-15",
      category: "adaptation",
      programs: ["Coastal Protection", "Sustainable Fisheries"]
    },
    {
      id: "2",
      title: t("project.title2"),
      description:  t("project.description2"),
      status: t("project.status.completed"),
      budget: "$1.8M",
      fundingSource: "Green Climate Fund",
      location: "Bamenda",
      region: "Northwest Region",
      actors: ["Private Sector", "Research Institutions", "MINEPDED"],
      startDate: "2022-06-01",
      endDate: "2023-12-15",
      category: "mitigation",
      programs: ["Renewable Energy", "Rural Development"]
    },
    {
      id: "3",
      title: t("project.title3"),
      description: t("project.description3"),
      status: t("project.status.planned"),
      budget: "$3.2M",
      fundingSource: "Global Environment Facility",
      location: "Yaoundé",
      region: "Centre Region",
      actors: ["NGOs", "Local Communities", "Research Institutions"],
      startDate: "2024-03-01",
      category: "forestry",
      programs: ["Forest Conservation", "Biodiversity"]
    },
    {
      id: "4",
      title: t("project.title4"),
      description: t("project.description4"),
      status: t("project.status.ongoing"),
      budget: "$4.1M",
      fundingSource: "World Bank",
      location: "Ebolowa",
      region: "South Region",
      actors: ["MINEPDED", "NGOs", "Local Communities"],
      startDate: "2023-08-10",
      category: "redd",
      programs: ["Carbon Sequestration", "Community Forestry"]
    },
    {
      id: "5",
      title: t("project.title5"),
      description: t("project.description5"),
      status: t("project.status.completed"),
      budget: "$2.9M",
      fundingSource: "European Union",
      location: "Douala",
      region: "Littoral Region",
      actors: ["Private Sector", "Government of Cameroon", "MINEPDED"],
      startDate: "2023-03-20",
      category: "mitigation",
      programs: ["Urban Planning", "Green Infrastructure"]
    },
    {
      id: "6",
      title: t("project.title6"),
      description: t("project.description6"),
      status: t("project.status.planned"),
      budget: "$1.5M",
      fundingSource: "African Development Bank",
      location: "Bafoussam",
      region: "West Region",
      actors: ["Research Institutions", "Local Communities", "NGOs"],
      startDate: "2024-06-01",
      category: "adaptation",
      programs: ["Sustainable Agriculture", "Food Security"]
    }
  ];


  }
