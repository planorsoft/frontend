import { createSelector } from 'reselect'
import { Duty, DutySize, DutySizeState, DutyCategoryState, DutyState, DutyCategory } from "./types";

export const selectDutyByProjectId = createSelector(
    [
        ( state : DutyState) => state.duties,
        ( _ : DutyState, projectId? : number) => projectId
    ],
    (duties, projectId) => {
        if (!projectId) return duties;
        return (duties as Duty[]).filter((duty : Duty) => duty.projectId === projectId)
    }
)

export const selectDutySizeById = createSelector(
    [
        ( state : DutySizeState) => state.dutySizes,
        ( _ : DutySizeState, id : number) => id
    ],
    (dutySizes, id) => {
        return (dutySizes as DutySize[]).find((duty : DutySize) => duty.id === id)
    }
)

export const selectDefaultDutyCategory = (dutyCategoryState: DutyCategoryState) => {
    return dutyCategoryState.dutyCategories.sort((a : DutyCategory, b : DutyCategory) => a?.id - b?.id)[0]
}