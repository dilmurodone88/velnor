import type { RuContent } from "../content";
import { ruDirections } from "./directions";
import { ruMisc } from "./misc";
import { ruLegal } from "./legal";

// Rus tilidagi tarjimalar (asl o'zbekcha tuzilma bilan bir xil shaklda va tartibda).
export const ruContent: RuContent = {
  ...ruMisc,
  directions: ruDirections,
  ...ruLegal,
};
