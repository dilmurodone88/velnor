// Tarjima overlay'ini asl (o'zbekcha) obyektga qo'shadi.
// Satrlar almashtiriladi, obyektlar kalit bo'yicha, obyekt massivlari indeks bo'yicha birlashtiriladi.
export type DeepText<T> = T extends string
  ? string
  : T extends (...args: never[]) => unknown
    ? never
    : T extends readonly (infer U)[]
      ? U extends string
        ? string[]
        : DeepText<U>[]
      : T extends object
        ? { [K in keyof T]?: DeepText<T[K]> }
        : never;

export function overlay<T>(base: T, patch: unknown): T {
  if (patch === undefined || patch === null) return base;
  if (typeof base === "string") return (typeof patch === "string" ? patch : base) as T;
  if (Array.isArray(base)) {
    if (!Array.isArray(patch)) return base;
    if (base.every((x) => typeof x === "string")) return (patch.length ? patch : base) as T;
    return base.map((item, i) => overlay(item, patch[i])) as T;
  }
  if (base && typeof base === "object" && Object.getPrototypeOf(base) === Object.prototype) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(patch as Record<string, unknown>)) {
      if (k in out) out[k] = overlay(out[k], v);
    }
    return out as T;
  }
  return base;
}
