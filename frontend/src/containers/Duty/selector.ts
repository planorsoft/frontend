import { createSelector } from 'reselect'
import { Duty, DutyCategory } from "./types";

export const selectDuties = createSelector(
    state => state.duties,
    state => state.dutyCategories,
    (duties, dutyCategories) => {
        return (duties as Duty[]).map((duty : Duty) => {
            return {
                ...duty,
                category: (dutyCategories as DutyCategory[]).find((category : DutyCategory) => category.id === duty.categoryId) as DutyCategory
            }
        })
    }
)