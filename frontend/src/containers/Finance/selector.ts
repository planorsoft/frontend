import { createSelector } from "reselect";
import { Finance, FinanceState } from "./types";

export const selectIncomes = createSelector(
    [
        (state: FinanceState) => state.finances,
    ],
    (finances) => {
        return (finances as Finance[]).filter((finance: Finance) => finance.amount > 0)
    }
);

export const selectOutcomes = createSelector(
    [
        (state: FinanceState) => state.finances,
    ],
    (finances) => {
        return (finances as Finance[]).filter((finance: Finance) => finance.amount < 0)
    }
);