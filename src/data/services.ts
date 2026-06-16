import type { ImageMetadata } from "astro";

// Per-service page content (plan2.md Phase 2: 300–500 words, process, paint
// brands, what's included, project photos). DRAFT copy — owner sign-off pending
// (plan2.md 5.7). Photos for deck-staining and board-and-batten are pending
// real images from the owner (plan2.md 5.1); those pages show a placeholder.

import basementAfter from "../assets/photos/basement-finish-after.jpeg";
import stairsAfter from "../assets/photos/stairs-refinishing-after.jpg";
import largeHomeAfter from "../assets/photos/large-home-after.jpg";
import victorianAfter from "../assets/photos/victorian-home-front-after.jpeg";
import homePaintingAfter from "../assets/photos/home-painting-after.jpeg";
import barnFrontAfter from "../assets/photos/barn-front-after.jpeg";
import cabinetsWideBefore from "../assets/photos/kitchen-cabinets-wide-before.jpg";
import cabinetsWideAfter from "../assets/photos/kitchen-cabinets-wide-after.jpg";
import cabinetsCloseAfter from "../assets/photos/kitchen-cabinets-close-after.jpg";
import deckAfter from "../assets/photos/deck-after.jpg";
import boardBattenAfter from "../assets/photos/board-batten-after.jpg";

export interface ServicePhoto {
  img: ImageMetadata;
  alt: string;
  caption: string;
}

export interface ServiceDetail {
  /** Used for <title> and meta. */
  metaDescription: string;
  lead: string;
  body: string[];
  included: string[];
  photos: ServicePhoto[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  interior: {
    metaDescription:
      "Interior painting in Central Connecticut — walls, ceilings, trim, and doors. Careful prep, premium paint, tidy work. Free quotes from Jim's Quality Painting.",
    lead: "Fresh paint is the fastest way to make a room feel new again. We handle interior painting for homes across Central Connecticut — walls, ceilings, trim, doors, and stairwells — with the prep and clean edges that make the difference.",
    body: [
      "Every interior job starts with protecting your home. We move and cover furniture, mask floors and fixtures, and patch nail holes, dents, and cracks before any color goes on. Good prep is most of the work, and it's the part that separates a paint job that lasts from one that peels at the corners in a year.",
      "We use Benjamin Moore and Sherwin-Williams paints, matched to the room — a scrubbable finish for kitchens and busy hallways, a flat that hides imperfections on older ceilings. Not sure on color? We're happy to talk through sheens and samples so you see it on your own wall before we commit.",
      "When we're done, the room goes back the way we found it — switch plates back on, floors vacuumed, trim lines crisp. You should be able to use the room that evening, not spend the weekend cleaning up after us.",
    ],
    included: [
      "Furniture moved and covered, floors and fixtures masked",
      "Patching and sanding of holes, dents, and cracks",
      "Premium Benjamin Moore or Sherwin-Williams paint",
      "Walls, ceilings, trim, doors, and closets as needed",
      "Full cleanup and a walkthrough before we leave",
    ],
    photos: [
      { img: basementAfter, alt: "A finished basement after interior painting", caption: "Finished basement" },
      { img: stairsAfter, alt: "An interior staircase after refinishing", caption: "Refinished staircase" },
    ],
  },

  exterior: {
    metaDescription:
      "Exterior painting in Central Connecticut — siding, trim, porches, and doors. Thorough prep and weather-tough finishes. Free quotes from Jim's Quality Painting.",
    lead: "Central Connecticut weather is hard on a house. Exterior painting from Jim's protects your siding, trim, and porch from sun, rain, and snow — and gives your home serious curb appeal in the process.",
    body: [
      "Exterior work lives or dies on prep. We pressure-wash the surfaces, scrape and sand loose or peeling paint, replace failed caulk, and spot-prime bare wood before the first finish coat. Skipping these steps is why so many repaints fail early — we don't.",
      "We paint clapboard, shingles, trim, porches, doors, and shutters, using exterior-grade Benjamin Moore and Sherwin-Williams products built to flex through the seasons. We work around your schedule and the weather, and we keep the site tidy — drop cloths down, landscaping protected, nothing left in the yard overnight.",
      "From a full repaint on a colonial to refreshing a porch or a barn, we treat the outside of your home like it's the first thing your neighbors see — because it is.",
    ],
    included: [
      "Pressure washing and surface prep",
      "Scraping, sanding, and spot-priming bare wood",
      "Caulking and minor wood-rot touch-ups",
      "Exterior-grade paint — siding, trim, and doors",
      "Daily cleanup and landscaping protection",
    ],
    photos: [
      { img: largeHomeAfter, alt: "A large home after a full exterior repaint", caption: "Full exterior repaint" },
      { img: victorianAfter, alt: "A Victorian home repainted in a period color scheme", caption: "Victorian, period colors" },
      { img: homePaintingAfter, alt: "The side of a home after the siding was painted", caption: "Fresh siding" },
      { img: barnFrontAfter, alt: "The front of a red barn after prep and painting", caption: "Barn exterior" },
    ],
  },

  cabinets: {
    metaDescription:
      "Cabinet refinishing in Central Connecticut — a durable, factory-smooth finish that makes tired kitchens look new, usually in under a week. Free quotes.",
    lead: "New cabinets cost a fortune. Refinishing the ones you have gives you a kitchen that looks new for a fraction of the price — and most jobs are done in under a week.",
    body: [
      "Cabinet refinishing is all about the finish, and the finish is all about prep. We remove doors and hardware, clean off years of grease, sand and de-gloss every surface, and prime so the new color actually bonds. Cut corners here and cabinets chip the first time a drawer slams.",
      "We spray for that smooth, factory-look finish you can't get with a brush, using durable Benjamin Moore and Sherwin-Williams cabinet coatings made to stand up to daily kitchen use. Doors are finished, labeled, and rehung exactly where they came from.",
      "It's the highest-impact, lowest-cost upgrade in most kitchens — and, as more than one client has told us, the only regret is not doing it sooner.",
    ],
    included: [
      "Doors and hardware removed and labeled",
      "Degreasing, sanding, and priming",
      "Sprayed, factory-smooth finish",
      "Durable cabinet-grade Benjamin Moore or Sherwin-Williams paint",
      "Reassembly and a final walkthrough",
    ],
    photos: [
      { img: cabinetsWideBefore, alt: "Kitchen cabinets before refinishing", caption: "Before" },
      { img: cabinetsWideAfter, alt: "The same kitchen cabinets after refinishing", caption: "After" },
      { img: cabinetsCloseAfter, alt: "Close-up of cabinets after a smooth sprayed finish", caption: "Smooth finish detail" },
    ],
  },

  "deck-staining": {
    metaDescription:
      "Deck and fence staining in Central Connecticut — cleaning, prep, and quality stain that protects wood from sun and weather. Free quotes from Jim's Quality Painting.",
    lead: "A deck takes a beating from sun and weather. Cleaning and staining on a regular cycle keeps the wood from graying, cracking, and rotting — and keeps the space somewhere you actually want to sit.",
    body: [
      "We start by cleaning the deck — clearing off old flaking finish, washing away dirt and mildew, and letting the wood dry so the stain can soak in instead of sitting on top. On older decks we'll flag any boards or fasteners that need attention before we coat.",
      "Then we apply a quality exterior stain or sealer suited to your wood and how much sun it gets — transparent to show the grain, or solid for maximum protection and color. We coat decking, railings, steps, and fence sections to match.",
      "Done right, a fresh stain beads water and shrugs off UV for years. We'll let you know roughly when it'll be due again so you can plan ahead instead of waiting until the wood has already gone gray.",
    ],
    included: [
      "Cleaning and removal of old flaking finish",
      "Drying time so the stain penetrates properly",
      "Quality exterior stain or sealer, matched to your wood",
      "Decking, railings, steps, and fences",
      "Protection of nearby siding and landscaping",
    ],
    photos: [
      { img: deckAfter, alt: "A deck after cleaning and re-staining", caption: "Cleaned & re-stained" },
    ],
  },

  "board-and-batten": {
    metaDescription:
      "Board & batten installation in Central Connecticut — accent walls and exterior siding, built and finished. One crew for the carpentry and the paint. Free quotes.",
    lead: "Board and batten adds texture and character that flat walls and plain siding can't — a feature wall behind the bed, an entryway with depth, or a classic exterior look. We build it and finish it.",
    body: [
      "We install board-and-batten the right way: measured and leveled to your space, fastened securely, with battens spaced evenly so the finished wall looks intentional, not improvised. We handle the carpentry and the finishing as one job, so you're not chasing two different trades.",
      "Once it's up, we caulk the seams, fill the nail holes, prime, and paint it in the color you choose — Benjamin Moore or Sherwin-Williams — for a seamless, built-in look. Interior accent walls and exterior applications are both welcome.",
      "It's one of those details that makes a room or a facade feel finished and custom. Tell us the wall and the look you're after and we'll walk you through what's possible.",
    ],
    included: [
      "Layout, measuring, and leveling",
      "Board and batten supplied and installed",
      "Caulking, nail-hole filling, and priming",
      "Finish paint in your chosen color",
      "Interior accent walls or exterior siding",
    ],
    photos: [
      { img: boardBattenAfter, alt: "A finished board & batten accent wall painted dark", caption: "Finished accent wall" },
    ],
  },
};
