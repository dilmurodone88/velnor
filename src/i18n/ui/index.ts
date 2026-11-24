// UI matnlari: har bir komponent guruhi o'z nomlar fazosini alohida faylda saqlaydi.
import { metaUz, metaRu } from "./meta";
import { layoutUz, layoutRu } from "./layout";
import { heroUz, heroRu } from "./hero";
import { homeUz, homeRu } from "./home";
import { showcaseUz, showcaseRu } from "./showcase";
import { blocksUz, blocksRu } from "./blocks";
import { pagesUz, pagesRu } from "./pages";

export const ui = {
  meta: metaUz,
  layout: layoutUz,
  hero: heroUz,
  home: homeUz,
  showcase: showcaseUz,
  blocks: blocksUz,
  pages: pagesUz,
};

export const uiRu: typeof ui = {
  meta: metaRu,
  layout: layoutRu,
  hero: heroRu,
  home: homeRu,
  showcase: showcaseRu,
  blocks: blocksRu,
  pages: pagesRu,
};
