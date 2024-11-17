import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

export const categories = [
  {
    label: "Groups",
    icon: TbBeach,
    description: "Groups that organize community events",
  },
  {
    label: "Activities",
    icon: GiWindmill,
    description: "Individual activities in your community",
  },
  {
    label: "Promoted",
    icon: MdOutlineVilla,
    description: "Promoted gatherings in your local community",
  },
  {
    label: "Solo",
    icon: TbMountain,
    description: "Activities or interests for the solo adventurer",
  },
  {
    label: "Family",
    icon: GiCastle,
    description: "Family friendly filter applied for all ages",
  },
  {
    label: "Kids",
    icon: GiCaveEntrance,
    description: "Totally for kids!",
  },
  {
    label: "Outdoors",
    icon: GiForestCamp,
    description: "For the outdoor adventurer",
  },
];
