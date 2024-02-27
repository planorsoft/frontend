import { ProjectState } from "./types";

export const selectProjectById = (projectState: ProjectState, id: number) => {
    return projectState.projects.find(project => project.id === id);
}