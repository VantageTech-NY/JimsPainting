import type { ImageMetadata } from "astro";

// Real before/after project pairs (plan2.md 3.1 / 5.1). `cat` drives the
// gallery filter and maps to service categories.
import barnBackBefore from "../assets/photos/barn-back-before.jpeg";
import barnBackAfter from "../assets/photos/barn-back-after.jpeg";
import barnFrontBefore from "../assets/photos/barn-front-before.jpeg";
import barnFrontAfter from "../assets/photos/barn-front-after.jpeg";
import basementBefore from "../assets/photos/basement-finish-before.jpeg";
import basementAfter from "../assets/photos/basement-finish-after.jpeg";
import porchBefore from "../assets/photos/front-porch-before.jpeg";
import porchAfter from "../assets/photos/front-porch-after.jpeg";
import sidingBefore from "../assets/photos/home-painting-before.jpeg";
import sidingAfter from "../assets/photos/home-painting-after.jpeg";
import largeHomeBefore from "../assets/photos/large-home-before.jpg";
import largeHomeAfter from "../assets/photos/large-home-after.jpg";
import cabWideBefore from "../assets/photos/kitchen-cabinets-wide-before.jpg";
import cabWideAfter from "../assets/photos/kitchen-cabinets-wide-after.jpg";
import cabCloseBefore from "../assets/photos/kitchen-cabinets-close-before.jpg";
import cabCloseAfter from "../assets/photos/kitchen-cabinets-close-after.jpg";
import stairsBefore from "../assets/photos/stairs-refinishing-before.jpg";
import stairsAfter from "../assets/photos/stairs-refinishing-after.jpg";
import vicFrontBefore from "../assets/photos/victorian-home-front-before.jpeg";
import vicFrontAfter from "../assets/photos/victorian-home-front-after.jpeg";
import vicSideBefore from "../assets/photos/victorian-home-side-before.jpeg";
import vicSideAfter from "../assets/photos/victorian-home-side-after.jpeg";
import deckBefore from "../assets/photos/deck-before.jpg";
import deckAfter from "../assets/photos/deck-after.jpg";
import bbBefore from "../assets/photos/board-batten-before.jpg";
import bbAfter from "../assets/photos/board-batten-after.jpg";
import woodCeilBefore from "../assets/photos/wood-ceiling-before.jpg";
import woodCeilAfter from "../assets/photos/wood-ceiling-after.jpg";
import bathCeilBefore from "../assets/photos/bathroom-ceiling-before.jpg";
import bathCeilAfter from "../assets/photos/bathroom-ceiling-after.jpg";

export type GalleryCategory = "exterior" | "interior" | "cabinets";

export interface GalleryPair {
  before: ImageMetadata;
  after: ImageMetadata;
  alt: string;
  cat: GalleryCategory;
}

export const GALLERY: GalleryPair[] = [
  { before: largeHomeBefore, after: largeHomeAfter, alt: "Full exterior home repaint", cat: "exterior" },
  { before: vicFrontBefore, after: vicFrontAfter, alt: "Victorian home repainted in period colors (front)", cat: "exterior" },
  { before: vicSideBefore, after: vicSideAfter, alt: "Victorian home repainted in period colors (side)", cat: "exterior" },
  { before: sidingBefore, after: sidingAfter, alt: "Home siding repainted", cat: "exterior" },
  { before: porchBefore, after: porchAfter, alt: "Front porch refinished", cat: "exterior" },
  { before: barnFrontBefore, after: barnFrontAfter, alt: "Red barn front, prepped and painted", cat: "exterior" },
  { before: barnBackBefore, after: barnBackAfter, alt: "Red barn back, prepped and painted", cat: "exterior" },
  { before: deckBefore, after: deckAfter, alt: "Deck cleaned and re-stained", cat: "exterior" },
  { before: cabWideBefore, after: cabWideAfter, alt: "Kitchen cabinets refinished", cat: "cabinets" },
  { before: cabCloseBefore, after: cabCloseAfter, alt: "Kitchen cabinets refinished (detail)", cat: "cabinets" },
  { before: basementBefore, after: basementAfter, alt: "Basement finished and painted", cat: "interior" },
  { before: stairsBefore, after: stairsAfter, alt: "Interior staircase refinished", cat: "interior" },
  { before: bbBefore, after: bbAfter, alt: "Board & batten accent wall, built and finished", cat: "interior" },
  { before: woodCeilBefore, after: woodCeilAfter, alt: "Three-season room wood-plank ceiling, installed and finished", cat: "interior" },
  { before: bathCeilBefore, after: bathCeilAfter, alt: "Bathroom wood-plank ceiling replacing a water-damaged ceiling", cat: "interior" },
];

export const GALLERY_FILTERS = [
  { value: "all", label: "All projects" },
  { value: "exterior", label: "Exterior" },
  { value: "interior", label: "Interior" },
  { value: "cabinets", label: "Cabinets" },
] as const;
