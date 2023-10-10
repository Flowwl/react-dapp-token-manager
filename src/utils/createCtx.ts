import { createContext, ProviderExoticComponent, ProviderProps, useContext } from "react";

/**
 * A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 */

//https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context
export function createCtx<A>(): readonly [() => A, ProviderExoticComponent<ProviderProps<A | undefined>>] {
  const ctx = createContext<A | undefined>(undefined);

  function useCtx(): A {
    const c = useContext<A | undefined>(ctx);
    if (c === undefined) throw new Error("useCtx must be inside a Provider with a value");
    return c;
  }

  return [useCtx, ctx.Provider];
}
