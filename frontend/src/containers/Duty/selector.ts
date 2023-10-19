import { createSelector } from 'reselect'
import { Duty, DutyState } from "./types";

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