// Super Hero API Service
// API Docs: https://www.superheroapi.com/API.html
// Token: 8b548b41603739c35a5eba581d9a64ac

const TOKEN = "8b548b41603739c35a5eba581d9a64ac";
const BASE_URL = "https://www.superheroapi.com/api.php";

// Helper to convert hyphenated keys to camelCase and extract image URL
function normalize(data) {
  if (!data) return data;

  const bio = data.biography || {};
  const appear = data.appearance || {};
  const work = data.work || {};
  const conn = data.connections || {};
  const stats = data.powerstats || {};

  // Image URL - try image.url first, then direct url field
  const imageUrl =
    data.image?.url?.replace("http://", "https://") ||
    data.url?.replace("http://", "https://") ||
    `https://via.placeholder.com/300x300?text=${encodeURIComponent(data.name || "Hero")}`;

  return {
    id: data.id,
    name: data.name || "Unknown",
    image: { url: imageUrl },
    biography: {
      fullName: bio["full-name"] || "",
      alterEgos: bio["alter-egos"] || "",
      aliases: bio.aliases || [],
      placeOfBirth: bio["place-of-birth"] || "",
      firstAppearance: bio["first-appearance"] || "",
      publisher: bio.publisher || "",
      alignment: bio.alignment || "",
    },
    appearance: {
      gender: appear.gender || "",
      race: appear.race || "",
      height: appear.height || [],
      weight: appear.weight || [],
      eyeColor: appear["eye-color"] || "",
      hairColor: appear["hair-color"] || "",
    },
    powerstats: {
      intelligence: stats.intelligence || "0",
      strength: stats.strength || "0",
      speed: stats.speed || "0",
      durability: stats.durability || "0",
      power: stats.power || "0",
      combat: stats.combat || "0",
    },
    work: {
      occupation: work.occupation || "",
      base: work.base || "",
    },
    connections: {
      groupAffiliation: conn["group-affiliation"] || "",
      relatives: conn.relatives || "",
    },
  };
}

// Get all heroes IDs 01-100 (first 100 heroes)
export async function getAllHeroes() {
  const res = await fetch("https://akabab.github.io/superhero-api/api/all.json");
  const data = await res.json();

  return data.slice(0, 200).map((hero) => ({
    id: hero.id,
    name: hero.name,
    image: { url: hero.images?.md },
    biography: {
      fullName: hero.biography?.fullName || "",
      publisher: hero.biography?.publisher || "",
      alignment: hero.biography?.alignment || "",
    },
    appearance: {
      gender: hero.appearance?.gender || "",
      race: hero.appearance?.race || "",
      height: hero.appearance?.height || [],
      weight: hero.appearance?.weight || [],
    },
    powerstats: hero.powerstats || {},
    work: hero.work || {},
    connections: hero.connections || {},
  }));
}

// Search heroes by name
export async function searchHeroes(query) {
  if (!query || query.trim() === "") return [];

  try {
    const url = `${BASE_URL}/${TOKEN}/search/${encodeURIComponent(query.trim())}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.slice(0, 20).map(normalize);
    }
    return [];
  } catch (err) {
    console.error("Search error:", err);
    throw new Error("Failed to search heroes");
  }
}

// Get single hero by ID
export async function getHeroById(id) {
  try {
    const paddedId = String(id).padStart(2, "0");
    const url = `${BASE_URL}/${TOKEN}/${paddedId}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Hero not found");

    const data = await res.json();
    return normalize(data);
  } catch (err) {
    throw new Error("Failed to load hero");
  }
}
