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
    name: "Monkey D. Luffy, Trafalgar D. Water Law et Eustass Kid",
    bounty: 3000000000,
    bountyText: "3,000,000,000",
    aliases: ["luffy", "mugiwara", "chapeau de paille", "law", "trafalgar", "trafalgar d law", "water law", "water", "trafalgar law", "trafalgar d water law", "kid", "eustass kid", "captain kid", "kidd", "eustass kidd"]
  },
  {
    id: "zoro",
    name: "Roronoa Zoro",
    bounty: 1111000000,
    bountyText: "1,111,000,000",
    aliases: ["zoro", "roronoa", "roronoa zoro"]
  },
  {
    id: "sanji",
    name: "Vinsmoke Sanji",
    bounty: 1032000000,
    bountyText: "1,032,000,000",
    aliases: ["sanji", "vinsmoke", "jambe noir", "vinsmoke sanji"]
  },
  {
    id: "jinbe",
    name: "Jinbe",
    bounty: 1100000000,
    bountyText: "1,100,000,000",
    aliases: ["jinbe", "jinbei", "jimbe", "jimbei"]
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
    aliases: ["usopp", "god usopp", "sogeking", "goat"]
  },
  {
    id: "robin",
    name: "Nico Robin",
    bounty: 930000000,
    bountyText: "930,000,000",
    aliases: ["robin", "nico robin", "nico"]
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
    id: "kaido",
    name: "Kaido",
    bounty: 4611100000,
    bountyText: "4,611,100,000",
    aliases: ["kaido"]
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
    aliases: ["blackbeard", "barbe noire", "teach", "marshall d. teach"]
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
    aliases: ["hancock", "boa hancock", "boa"]
  },
  {
    id: "buggy",
    name: "Buggy",
    bounty: 3189000000,
    bountyText: "3,189,000,000",
    aliases: ["buggy", "buggy le clown", "clown d buggy"]
  },
  {
    id: "ace",
    name: "Portgas D. Ace et Little Oars Jr",
    bounty: 550000000,
    bountyText: "550,000,000",
    aliases: ["ace", "portgas d ace", "fire fist", "poing ardent", "oz", "little oz", "little oars", "little oars jr"]
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
    aliases: ["queen", "scien"]
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
    id: "killer",
    name: "Killer et Bartolomeo",
    bounty: 200000000,
    bountyText: "200,000,000",
    aliases: ["killer", "massacre soldier", "barto", "bartolomeo"]
  },
  {
    id: "bege",
    name: "Capone Bege et Scratchmen Apoo",
    bounty: 350000000,
    bountyText: "350,000,000",
    aliases: ["bege", "capone bege", "capone", "apoo", "scratchmen apoo"]
  },
  {
    id: "bonney",
    name: "Jewelry Bonney, Basil Hawkins et Gecko Moria",
    bounty: 320000000,
    bountyText: "320,000,000",
    aliases: ["bonney", "jewelry bonney", "hawkins", "basil hawkins", "basil", "moria", "gecko moria", "kozuki moria"]
  },
  {
    id: "drake",
    name: "X Drake",
    bounty: 222000000,
    bountyText: "222,000,000",
    aliases: ["drake", "x drake", "diez drake"]
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
    id: "bepo",
    name: "Bepo",
    bounty: 500,
    bountyText: "500",
    aliases: ["bepo"]
  },
  {
    id: "cavendish",
    name: "Cavendish et Pekoms",
    bounty: 330000000,
    bountyText: "330,000,000",
    aliases: ["cavendish", "hakuba", "pekoms"]
  },
  {
    id: "loki",
    name: "Loki",
    bounty: 2600000000,
    bountyText: "2,600,000,000",
    aliases: ["loki"]
  },
  {
    id: "dorry",
    name: "Dorry et Brogy",
    bounty: 1800000000,
    bountyText: "1,800,000,000",
    aliases: ["dorry", "brogy", "dorry et brogy"]
  },
  {
    id: "cracker",
    name: "Charlotte Cracker",
    bounty: 860000000,
    bountyText: "860,000,000",
    aliases: ["cracker", "charlotte cracker"]
  },
  {
    id: "perospero",
    name: "Charlotte Perospero",
    bounty: 700000000,
    bountyText: "700,000,000",
    aliases: ["perospero", "charlotte perospero"]
  },
  {
    id: "smoothie",
    name: "Charlotte Smoothie",
    bounty: 930000000,
    bountyText: "930,000,000",
    aliases: ["smoothie", "charlotte smoothie"]
  },
  {
    id: "urouge",
    name: "Urouge",
    bounty: 108000000,
    bountyText: "108,000,000",
    aliases: ["urouge"]
  },
  {
    id: "chinjao",
    name: "Don Chinjao",
    bounty: 542000000,
    bountyText: "542,000,000",
    aliases: ["chinjao", "don chinjao"]
  },
  {
    id: "izo",
    name: "Izo",
    bounty: 510000000,
    bountyText: "510,000,000",
    aliases: ["izo", "izou"]
  },
  {
    id: "whos_who",
    name: "Who's-Who",
    bounty: 546000000,
    bountyText: "546,000,000",
    aliases: ["who's who", "whos-who"]
  },
  {
    id: "snack",
    name: "Charlotte Snack",
    bounty: 600000000,
    bountyText: "600,000,000",
    aliases: ["snack"]
  },
  {
    id: "edward_weevil",
    name: "Edward Weevil et Black Maria",
    bounty: 480000000,
    bountyText: "480,000,000",
    aliases: ["weevil", "edward weevil","weeble", "edward weeble", "black maria", "maria"]
  },
  {
    id: "sasaki",
    name: "Sasaki",
    bounty: 472000000,
    bountyText: "472,000,000",
    aliases: ["sasaki"]
  },
  {
    id: "belo_betty",
    name: "Belo Betty",
    bounty: 457000000,
    bountyText: "457,000,000",
    aliases: ["betty", "belo betty"]
  },
  {
    id: "tamago",
    name: "Tamago",
    bounty: 429000000,
    bountyText: "429,000,000",
    aliases: ["tamago"]
  },
  {
    id: "pedro",
    name: "Pedro",
    bounty: 382000000,
    bountyText: "382,000,000",
    aliases: ["pedro"]
  },
  {
    id: "lindbergh",
    name: "Lindbergh",
    bounty: 316000000,
    bountyText: "316,000,000",
    aliases: ["lindbergh"]
  },
  {
    id: "charlotte_daifuku",
    name: "Charlotte Daifuku, Charlotte Oven et Ceasar Clown",
    bounty: 300000000,
    bountyText: "300,000,000",
    aliases: ["daifuku", "charlotte daifuku", "oven", "charlotte oven", "ceasar", "ceasar clown", "clown"]
  },
  {
    id: "ulti",
    name: "Ulti et Karasu",
    bounty: 400000000,
    bountyText: "400,000,000",
    aliases: ["ulti", "karasu"]
  }
];
