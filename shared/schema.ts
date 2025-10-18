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
  }
];
