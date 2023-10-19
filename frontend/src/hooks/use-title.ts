import { setTitle } from "@/containers/Settings/Application/actions"
import { ApplicationState } from "@/containers/Settings/Application/types"
import { useAppDispatch, useAppSelector } from "@/store"

const useTitle = (title : string) => {
    const dispatch = useAppDispatch()
    const applicationState = useAppSelector<ApplicationState>(state => state.applicationState);
    if (applicationState.title !== title) {
        dispatch(setTitle(title))
    }
}

export default useTitle