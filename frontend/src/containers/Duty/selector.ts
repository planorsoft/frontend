import { createSelector } from 'reselect'
import { Duty, DutySize, DutySizeState, DutyState } from "./types";

export const selectDutyByProjectId = createSelector(
    [
        ( state : DutyState) => state.duties,
        ( _ : DutyState, projectId? : string) => projectId
    ],
    (duties, projectId) => {
        if (!projectId) return duties;
        const id = parseInt(projectId);
        return (duties as Duty[]).filter((duty : Duty) => duty.projectId === id)
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