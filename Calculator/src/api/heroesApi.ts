import { generateMyId } from "../utils/generateMyId";

const TOKEN = import.meta.env.VITE_HEROES_API_TOKEN || "";
const BASE_URL = "https://www.superheroapi.com/api.php";

export interface HeroBiography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

export interface HeroAppearance {
  gender: string;
  race: string;
  height: string[];
  weight: string[];
  eyeColor: string;
  hairColor: string;
}

export interface HeroPowerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface HeroWork {
  occupation: string;
  base: string;
}

export interface HeroConnections {
  groupAffiliation: string;
  relatives: string;
}

export interface HeroImage {
  url: string;
}

export interface Hero {
  id: string | number;
  name: string;
  my_id: string;
  image: HeroImage;
  biography: HeroBiography;
  appearance: HeroAppearance;
  powerstats: HeroPowerstats;
  work: HeroWork;
  connections: HeroConnections;
  description?: string;
  longDescription?: string;
  features?: string[];
}

function addMyIdToHero(hero: Omit<Hero, 'my_id'>): Hero {
  return {
    ...hero,
    my_id: generateMyId(),
  };
}

function normalize(data: Record<string, unknown>): Hero | null {
  if (!data) return null;

  const bio = (data.biography as Record<string, unknown>) || {};
  const appear = (data.appearance as Record<string, unknown>) || {};
  const work = (data.work as Record<string, unknown>) || {};
  const conn = (data.connections as Record<string, unknown>) || {};
  const stats = (data.powerstats as Record<string, unknown>) || {};

  const imageUrl =
    (data.image as { url?: string })?.url?.replace("http://", "https://") ||
    (data.url as string)?.replace("http://", "https://") ||
    `https://via.placeholder.com/300x300?text=${encodeURIComponent((data.name as string) || "Hero")}`;

  return addMyIdToHero({
    id: data.id,
    name: (data.name as string) || "Unknown",
    image: { url: imageUrl },
    biography: {
      fullName: (bio["full-name"] as string) || "",
      alterEgos: (bio["alter-egos"] as string) || "",
      aliases: (bio.aliases as string[]) || [],
      placeOfBirth: (bio["place-of-birth"] as string) || "",
      firstAppearance: (bio["first-appearance"] as string) || "",
      publisher: (bio.publisher as string) || "",
      alignment: (bio.alignment as string) || "",
    },
    appearance: {
      gender: (appear.gender as string) || "",
      race: (appear.race as string) || "",
      height: (appear.height as string[]) || [],
      weight: (appear.weight as string[]) || [],
      eyeColor: (appear["eye-color"] as string) || "",
      hairColor: (appear["hair-color"] as string) || "",
    },
    powerstats: {
      intelligence: (stats.intelligence as string) || "0",
      strength: (stats.strength as string) || "0",
      speed: (stats.speed as string) || "0",
      durability: (stats.durability as string) || "0",
      power: (stats.power as string) || "0",
      combat: (stats.combat as string) || "0",
    },
    work: {
      occupation: (work.occupation as string) || "",
      base: (work.base as string) || "",
    },
    connections: {
      groupAffiliation: (conn["group-affiliation"] as string) || "",
      relatives: (conn.relatives as string) || "",
    },
  });
}

export async function getAllHeroes(): Promise<Hero[]> {
  const res = await fetch("https://akabab.github.io/superhero-api/api/all.json");
  const data = await res.json();

  return data.slice(0, 200).map((hero: Record<string, unknown>) =>
    addMyIdToHero({
      id: hero.id,
      name: (hero.name as string),
      image: { url: (hero.images as { md?: string })?.md || "" },
      biography: {
        fullName: (hero.biography as { fullName?: string })?.fullName || "",
        publisher: (hero.biography as { publisher?: string })?.publisher || "",
        alignment: (hero.biography as { alignment?: string })?.alignment || "",
      },
      appearance: {
        gender: (hero.appearance as { gender?: string })?.gender || "",
        race: (hero.appearance as { race?: string })?.race || "",
        height: (hero.appearance as { height?: string[] })?.height || [],
        weight: (hero.appearance as { weight?: string[] })?.weight || [],
      },
      powerstats: (hero.powerstats as Record<string, string>) || {},
      work: (hero.work as Record<string, string>) || {},
      connections: (hero.connections as Record<string, string>) || {},
    })
  );
}

export async function searchHeroes(query: string): Promise<Hero[]> {
  if (!query || query.trim() === "") return [];

  try {
    const url = `${BASE_URL}/${TOKEN}/search/${encodeURIComponent(query.trim())}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 20).map((item: Record<string, unknown>) => normalize(item));
    }
    return [];
  } catch (err) {
    console.error("Search error:", err);
    throw new Error("Failed to search heroes");
  }
}

export async function getHeroById(id: string | number): Promise<Hero> {
  try {
    const paddedId = String(id).padStart(2, "0");
    const url = `${BASE_URL}/${TOKEN}/${paddedId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Hero not found");

    const data = await res.json();
    const normalized = normalize(data);
    if (!normalized) throw new Error("Failed to load hero");
    return normalized;
  } catch (err) {
    throw new Error("Failed to load hero");
  }
}

export function filterHeroesByMyId(heroes: Hero[], myId: string): Hero[] {
  return heroes.filter((hero) => hero.my_id === myId);
}