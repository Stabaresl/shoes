import { useSyncExternalStore } from "react";

const sinSuscripcion = () => () => {};

/**
 * false en el servidor y durante la hidratación; true después. Para lo que sale
 * del navegador (el carrito guardado en localStorage) y no debe chocar con el
 * HTML que mandó el servidor.
 */
export function useMontado(): boolean {
  return useSyncExternalStore(sinSuscripcion, () => true, () => false);
}
