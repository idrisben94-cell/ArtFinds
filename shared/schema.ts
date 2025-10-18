import { z } from "zod";

export interface OnePieceCharacter {
  id: string;
  name: string;
  bounty: number;
  bountyText: string;
  aliases: string[];
  imageUrl?: string;
}

export interface GameSession {
  userId: string;
  channelId: string;
  currentCharacter: OnePieceCharacter;
  attempts: number;
  startTime: number;
}

export interface UserScore {
  userId: string;
  username: string;
  correctGuesses: number;
  totalGames: number;
  fastestTime?: number;
}

export const onePieceCharacters: OnePieceCharacter[] = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    bounty: 3000000000,
    bountyText: "3,000,000,000",
    aliases: ["luffy", "mugiwara", "chapeau de paille"]
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    bounty: 1111000000,
    bountyText: "1,111,000,000",
    aliases: ["zoro", "roronoa"]
  },
  {
    id: "sanji",
    name: "Vinsmoke Sanji",
    bounty: 1032000000,
    bountyText: "1,032,000,000",
    aliases: ["sanji", "vinsmoke", "jambe noir"]
  },
  {
    id: "jinbe",
    name: "Jinbe",
    bounty: 1100000000,
    bountyText: "1,100,000,000",
    aliases: ["jinbe", "jinbei"]
  },
  {
    id: "nami",
    name: "Nami",
    bounty: 366000000,
    bountyText: "366,000,000",
    aliases: ["nami"]
  },
  {
    id: "usopp",
    name: "Usopp",
    bounty: 500000000,
    bountyText: "500,000,000",
    aliases: ["usopp", "god usopp", "sogeking"]
  },
  {
    id: "robin",
    name: "Nico Robin",
    bounty: 930000000,
    bountyText: "930,000,000",
    aliases: ["robin", "nico robin"]
  },
  {
    id: "franky",
    name: "Franky",
    bounty: 394000000,
    bountyText: "394,000,000",
    aliases: ["franky", "cutty flam"]
  },
  {
    id: "brook",
    name: "Brook",
    bounty: 383000000,
    bountyText: "383,000,000",
    aliases: ["brook", "soul king"]
  },
  {
    id: "chopper",
    name: "Tony Tony Chopper",
    bounty: 1000,
    bountyText: "1,000",
    aliases: ["chopper", "tony tony chopper"]
  },
  {
    id: "law",
    name: "Trafalgar D. Water Law",
    bounty: 3000000000,
    bountyText: "3,000,000,000",
    aliases: ["law", "trafalgar"]
  },
  {
    id: "kid",
    name: "Eustass Kid",
    bounty: 3000000000,
    bountyText: "3,000,000,000",
    aliases: ["kid", "eustass kid", "captain kid"]
  },
  {
    id: "kaido",
    name: "Kaido",
    bounty: 4611100000,
    bountyText: "4,611,100,000",
    aliases: ["kaido", "kaido des cent bêtes"]
  },
  {
    id: "bigmom",
    name: "Charlotte Linlin",
    bounty: 4388000000,
    bountyText: "4,388,000,000",
    aliases: ["big mom", "linlin", "charlotte linlin"]
  },
  {
    id: "shanks",
    name: "Shanks",
    bounty: 4048900000,
    bountyText: "4,048,900,000",
    aliases: ["shanks", "le roux"]
  },
  {
    id: "mihawk",
    name: "Dracule Mihawk",
    bounty: 3590000000,
    bountyText: "3,590,000,000",
    aliases: ["mihawk", "dracule mihawk", "œil de faucon"]
  },
  {
    id: "blackbeard",
    name: "Marshall D. Teach",
    bounty: 3996000000,
    bountyText: "3,996,000,000",
    aliases: ["blackbeard", "barbe noire", "teach", "marshall d teach"]
  },
  {
    id: "crocodile",
    name: "Crocodile",
    bounty: 1965000000,
    bountyText: "1,965,000,000",
    aliases: ["crocodile", "sir crocodile"]
  },
  {
    id: "hancock",
    name: "Boa Hancock",
    bounty: 1659000000,
    bountyText: "1,659,000,000",
    aliases: ["hancock", "boa hancock"]
  },
  {
    id: "buggy",
    name: "Buggy",
    bounty: 3189000000,
    bountyText: "3,189,000,000",
    aliases: ["buggy", "buggy le clown"]
  },
  {
    id: "ace",
    name: "Portgas D. Ace",
    bounty: 550000000,
    bountyText: "550,000,000",
    aliases: ["ace", "portgas d ace", "fire fist", "poing ardent"]
  },
  {
    id: "sabo",
    name: "Sabo",
    bounty: 602000000,
    bountyText: "602,000,000",
    aliases: ["sabo"]
  },
  {
    id: "katakuri",
    name: "Charlotte Katakuri",
    bounty: 1057000000,
    bountyText: "1,057,000,000",
    aliases: ["katakuri", "charlotte katakuri"]
  },
  {
    id: "king",
    name: "King",
    bounty: 1390000000,
    bountyText: "1,390,000,000",
    aliases: ["king", "alber"]
  },
  {
    id: "queen",
    name: "Queen",
    bounty: 1320000000,
    bountyText: "1,320,000,000",
    aliases: ["queen"]
  },
  {
    id: "jack",
    name: "Jack",
    bounty: 1000000000,
    bountyText: "1,000,000,000",
    aliases: ["jack", "jack la secheresse"]
  },
  {
    id: "marco",
    name: "Marco",
    bounty: 1374000000,
    bountyText: "1,374,000,000",
    aliases: ["marco", "marco le phenix"]
  },
  {
    id: "doflamingo",
    name: "Donquixote Doflamingo",
    bounty: 340000000,
    bountyText: "340,000,000",
    aliases: ["doflamingo", "donquixote doflamingo", "joker"]
  },
  {
    id: "smoker",
    name: "Smoker",
    bounty: 0,
    bountyText: "Aucune (Marine)",
    aliases: ["smoker"]
  },
  {
    id: "oden",
    name: "Kozuki Oden",
    bounty: 0,
    bountyText: "Inconnue",
    aliases: ["oden", "kozuki oden"]
  },
  {
    id: "yamato",
    name: "Yamato",
    bounty: 0,
    bountyText: "Inconnue",
    aliases: ["yamato"]
  },
  {
    id: "killer",
    name: "Killer",
    bounty: 200000000,
    bountyText: "200,000,000",
    aliases: ["killer", "massacre soldier"]
  },
  {
    id: "bege",
    name: "Capone Bege",
    bounty: 350000000,
    bountyText: "350,000,000",
    aliases: ["bege", "capone bege", "capone"]
  },
  {
    id: "bonney",
    name: "Jewelry Bonney",
    bounty: 320000000,
    bountyText: "320,000,000",
    aliases: ["bonney", "jewelry bonney"]
  },
  {
    id: "hawkins",
    name: "Basil Hawkins",
    bounty: 320000000,
    bountyText: "320,000,000",
    aliases: ["hawkins", "basil hawkins"]
  },
  {
    id: "apoo",
    name: "Scratchmen Apoo",
    bounty: 350000000,
    bountyText: "350,000,000",
    aliases: ["apoo", "scratchmen apoo"]
  },
  {
    id: "drake",
    name: "X Drake",
    bounty: 222000000,
    bountyText: "222,000,000",
    aliases: ["drake", "x drake", "diez drake"]
  },
  {
    id: "benn",
    name: "Benn Beckman",
    bounty: 0,
    bountyText: "Inconnue",
    aliases: ["benn beckman", "beckman"]
  },
  {
    id: "rayleigh",
    name: "Silvers Rayleigh",
    bounty: 0,
    bountyText: "Inconnue (Ancienne)",
    aliases: ["rayleigh", "silvers rayleigh", "dark king"]
  },
  {
    id: "whitebeard",
    name: "Edward Newgate",
    bounty: 5046000000,
    bountyText: "5,046,000,000",
    aliases: ["whitebeard", "barbe blanche", "newgate", "edward newgate"]
  },
  {
    id: "roger",
    name: "Gol D. Roger",
    bounty: 5564800000,
    bountyText: "5,564,800,000",
    aliases: ["roger", "gol d roger", "gold roger"]
  },
  {
    id: "kuma",
    name: "Bartholomew Kuma",
    bounty: 296000000,
    bountyText: "296,000,000",
    aliases: ["kuma", "bartholomew kuma"]
  },
  {
    id: "moria",
    name: "Gecko Moria",
    bounty: 320000000,
    bountyText: "320,000,000",
    aliases: ["moria", "gecko moria"]
  },
  {
    id: "perona",
    name: "Perona",
    bounty: 0,
    bountyText: "Inconnue",
    aliases: ["perona"]
  },
  {
    id: "bepo",
    name: "Bepo",
    bounty: 500,
    bountyText: "500",
    aliases: ["bepo"]
  },
  {
    id: "carrot",
    name: "Carrot",
    bounty: 0,
    bountyText: "Inconnue",
    aliases: ["carrot"]
  },
  {
    id: "vivi",
    name: "Nefertari Vivi",
    bounty: 0,
    bountyText: "Aucune",
    aliases: ["vivi", "nefertari vivi", "princesse vivi"]
  },
  {
    id: "bartolomeo",
    name: "Bartolomeo",
    bounty: 200000000,
    bountyText: "200,000,000",
    aliases: ["bartolomeo", "bartolomeo le cannibale"]
  },
  {
    id: "cavendish",
    name: "Cavendish",
    bounty: 330000000,
    bountyText: "330,000,000",
    aliases: ["cavendish", "hakuba"]
  }
];
