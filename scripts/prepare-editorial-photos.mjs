// Local, optimized illustrative photos for the existing demo fixtures.
// Run from the repository root. URLs are explicit; no runtime CDN dependency.
import sharp from "sharp";
const sources = {
  "vinyl-v2": "photo-1470337458703-46ad1756a187",
  "panorama-v2": "photo-1470225620780-dba8ba36b745",
  "dinner-v2": "photo-1528605248644-14dd04022da1",
  "electronics-v2": "photo-1506157786151-b8491531f063",
  "gallery-v2": "photo-1561214115-f2f134cc4912",
  "brunch-v2": "photo-1515003197210-e0cd71810b5f",
  "disco-v2": "photo-1492684223066-81342ee5ff30",
  "acoustic-v2": "photo-1510915361894-db8b60106cb1",
  "villa-cinema-v2": "photo-1478720568477-152d9b164e26",
  "after-race-v2": "photo-1501386761578-eac5c94b800a",
};
await Promise.all(Object.entries(sources).map(async ([name, id]) => {
  const response = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`);
  if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
  const info = await sharp(Buffer.from(await response.arrayBuffer())).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`public/events/${name}.webp`);
  console.log(name, info.size);
}));
