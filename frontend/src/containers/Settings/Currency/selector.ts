import { CurrencyState } from "./types";

export const selectCurrencyById = (state: CurrencyState, currencyId: number) => {
    return state.currencies.find((currency) => currency.id === currencyId);
}