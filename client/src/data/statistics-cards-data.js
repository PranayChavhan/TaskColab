import {
  FolderIcon,
  BriefcaseIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: FolderIcon,
    title: "Total Projects",
    value: "8",
    footer: {
      color: "text-green-500",
      value: "",
      label: "than last week",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Total Tasks",
    value: "24",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
  {
    color: "green",
    icon: BriefcaseIcon,
    title: "My Projects",
    value: "25",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Total Users",
    value: "28",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  }
];

export default statisticsCardsData;
