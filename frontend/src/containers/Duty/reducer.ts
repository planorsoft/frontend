import { DutyState, Duty, DutyAction, dutyTypes, DutyCategory, DutyCategoryAction, DutyCategoryState, DutySize, DutySizeAction, DutySizeState } from "./types";

const dutyInitialState: DutyState = {
    duties: [],
    duty: {},
    loading: false,
    error: null,
    status: null
};

export const dutyReducer = (state = dutyInitialState, action: DutyAction) => {
    switch (action.type) {
        // ------------------------------------------------------- DUTY
        case dutyTypes.GET_ACTIVE_DUTIES_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_ACTIVE_DUTIES_REQUEST
            };
        case dutyTypes.GET_ACTIVE_DUTIES_SUCCESS:
            return {
                ...state,
                duties: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_ACTIVE_DUTIES_SUCCESS
            };
        case dutyTypes.GET_ACTIVE_DUTIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_ACTIVE_DUTIES_FAILURE
            };
        case dutyTypes.GET_DUTY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_REQUEST
            };
        case dutyTypes.GET_DUTY_SUCCESS:
            return {
                ...state,
                duty: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_SUCCESS
            };
        case dutyTypes.GET_DUTY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_FAILURE
            };
        case dutyTypes.CREATE_DUTY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.CREATE_DUTY_REQUEST
            };
        case dutyTypes.CREATE_DUTY_SUCCESS:
            return {
                ...state,
                duties: [...state.duties, action.payload],
                error: null,
                loading: false,
                status: dutyTypes.CREATE_DUTY_SUCCESS
            };
        case dutyTypes.CREATE_DUTY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.CREATE_DUTY_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.UPDATE_DUTY_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_SUCCESS:
            return {
                ...state,
                duties: state.duties.map((duty: Duty) => duty.id === action.payload.id ? action.payload : duty),
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_ORDERS_REQUEST:
            return {
                ...state,
                duties: state.duties.map(duty => {
                    const updated = action.payload.find(x => x.id === duty.id);
                    if (updated) {
                        return { ...duty, order: updated.order, categoryId: updated.categoryId };
                    }
                    return duty;
                }).sort((a, b) => a.order - b.order),
                loading: false,
                status: dutyTypes.UPDATE_DUTY_ORDERS_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_ORDERS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_ORDERS_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_ORDERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_ORDERS_FAILURE
            };
        case dutyTypes.DELETE_DUTY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.DELETE_DUTY_REQUEST
            };
        case dutyTypes.DELETE_DUTY_SUCCESS:
            return {
                ...state,
                duties: state.duties.filter((duty: Duty) => duty.id !== action.payload),
                loading: false,
                status: dutyTypes.DELETE_DUTY_SUCCESS
            }
        case dutyTypes.DELETE_DUTY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.DELETE_DUTY_FAILURE
            };
        default:
            return state;
    }
}

const dutyCategoriesInitalState: DutyCategoryState = {
    dutyCategories: [],
    dutyCategory: {},
    loading: false,
    error: null,
    status: null
};

export const dutyCategoryReducer = (state = dutyCategoriesInitalState, action: DutyCategoryAction) => {
    switch (action.type) {
        case dutyTypes.GET_DUTY_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_CATEGORIES_REQUEST
            };
        case dutyTypes.GET_DUTY_CATEGORIES_SUCCESS:
            return {
                ...state,
                dutyCategories: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_CATEGORIES_SUCCESS
            };
        case dutyTypes.GET_DUTY_CATEGORIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_CATEGORIES_FAILURE
            };
        case dutyTypes.GET_DUTY_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_CATEGORY_REQUEST
            };
        case dutyTypes.GET_DUTY_CATEGORY_SUCCESS:
            return {
                ...state,
                dutyCategory: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_CATEGORY_SUCCESS
            };
        case dutyTypes.GET_DUTY_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_CATEGORY_FAILURE
            };
        case dutyTypes.CREATE_DUTY_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.CREATE_DUTY_CATEGORY_REQUEST
            };
        case dutyTypes.CREATE_DUTY_CATEGORY_SUCCESS:
            return {
                ...state,
                dutyCategories: [...state.dutyCategories, action.payload],
                error: null,
                loading: false,
                status: dutyTypes.CREATE_DUTY_CATEGORY_SUCCESS
            };
        case dutyTypes.CREATE_DUTY_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.CREATE_DUTY_CATEGORY_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.UPDATE_DUTY_CATEGORY_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_CATEGORY_SUCCESS:
            return {
                ...state,
                dutyCategories: state.dutyCategories.map((dutyCategory: DutyCategory) => dutyCategory.id === action.payload.id ? action.payload : dutyCategory),
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_CATEGORY_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_CATEGORY_FAILURE
            };
        case dutyTypes.DELETE_DUTY_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.DELETE_DUTY_CATEGORY_REQUEST
            };
        case dutyTypes.DELETE_DUTY_CATEGORY_SUCCESS:
            return {
                ...state,
                dutyCategories: state.dutyCategories.filter((dutyCategory : DutyCategory) => dutyCategory.id != action.payload),
                loading: false,
                status: dutyTypes.DELETE_DUTY_SUCCESS
            }
        case dutyTypes.DELETE_DUTY_CATEGORY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.DELETE_DUTY_CATEGORY_FAILURE
            };
        default:
            return state;
    }
}

const dutySizesInitalState: DutySizeState = {
    dutySizes: [],
    dutySize: {
        id: 0,
        name: "",
        score: 0
    },
    loading: false,
    error: null,
    status: null
};

export const dutySizeReducer = (state = dutySizesInitalState, action: DutySizeAction) => {
    switch (action.type) {
        case dutyTypes.GET_DUTY_SIZES_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_SIZES_REQUEST
            };
        case dutyTypes.GET_DUTY_SIZES_SUCCESS:
            return {
                ...state,
                dutySizes: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZES_SUCCESS
            };
        case dutyTypes.GET_DUTY_SIZES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZES_FAILURE
            };
        case dutyTypes.GET_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_SIZE_REQUEST
            };
        case dutyTypes.GET_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySize: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.GET_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZE_FAILURE
            };
        case dutyTypes.CREATE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.CREATE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.CREATE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: [...state.dutySizes, action.payload],
                error: null,
                loading: false,
                status: dutyTypes.CREATE_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.CREATE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.CREATE_DUTY_SIZE_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.UPDATE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: state.dutySizes.map((dutySize: DutySize) => dutySize.id === action.payload?.id ? action.payload : dutySize),
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_SIZE_FAILURE
            };
        case dutyTypes.DELETE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.DELETE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.DELETE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: state.dutySizes.filter((dutySize : DutySize) => dutySize.id != action.payload),
                loading: false,
                status: dutyTypes.DELETE_DUTY_SUCCESS
            }
        case dutyTypes.DELETE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.DELETE_DUTY_SIZE_FAILURE
            };
        default:
            return state;
    }
}


/*
        // ------------------------------------------------------- DUTY PRIORITY
        case dutyTypes.GET_DUTY_PRIORITIES_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_PRIORITIES_REQUEST
            };
        case dutyTypes.GET_DUTY_PRIORITIES_SUCCESS:
            return {
                ...state,
                dutyPriorities: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_PRIORITIES_SUCCESS
            };
        case dutyTypes.GET_DUTY_PRIORITIES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_PRIORITIES_FAILURE
            };
        case dutyTypes.GET_DUTY_PRIORITY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_PRIORITY_REQUEST
            };
        case dutyTypes.GET_DUTY_PRIORITY_SUCCESS:
            return {
                ...state,
                dutyPriority: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_PRIORITY_SUCCESS
            };
        case dutyTypes.GET_DUTY_PRIORITY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_PRIORITY_FAILURE
            };
        case dutyTypes.CREATE_DUTY_PRIORITY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.CREATE_DUTY_PRIORITY_REQUEST
            };
        case dutyTypes.CREATE_DUTY_PRIORITY_SUCCESS:
            return {
                ...state,
                dutyPriorities: [...state.dutyPriorities, action.payload],
                error: null,
                loading: false,
                status: dutyTypes.CREATE_DUTY_PRIORITY_SUCCESS
            };
        case dutyTypes.CREATE_DUTY_PRIORITY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.CREATE_DUTY_PRIORITY_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_PRIORITY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.UPDATE_DUTY_PRIORITY_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_PRIORITY_SUCCESS:
            return {
                ...state,
                dutyPriorities: state.dutyPriorities.map((dutyPriority: DutyPriority) => dutyPriority.id === action.payload ? action.payload : dutyPriority),
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_PRIORITY_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_PRIORITY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_PRIORITY_FAILURE
            };
        case dutyTypes.DELETE_DUTY_PRIORITY_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.DELETE_DUTY_PRIORITY_REQUEST
            };
        case dutyTypes.DELETE_DUTY_PRIORITY_SUCCESS:
            return {
                ...state,
                dutyPriorities: state.dutyPriorities.filter((dutyPriority) => dutyPriority.id !== action.payload),
                loading: false,
                status: dutyTypes.DELETE_DUTY_SUCCESS
            }
        case dutyTypes.DELETE_DUTY_PRIORITY_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.DELETE_DUTY_PRIORITY_FAILURE
            };
        // ------------------------------------------------------- DUTY SIZE
        case dutyTypes.GET_DUTY_SIZES_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_SIZES_REQUEST
            };
        case dutyTypes.GET_DUTY_SIZES_SUCCESS:
            return {
                ...state,
                dutySizes: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZES_SUCCESS
            };
        case dutyTypes.GET_DUTY_SIZES_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZES_FAILURE
            };
        case dutyTypes.GET_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.GET_DUTY_SIZE_REQUEST
            };
        case dutyTypes.GET_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySize: action.payload,
                error: null,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.GET_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.GET_DUTY_SIZE_FAILURE
            };
        case dutyTypes.CREATE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.CREATE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.CREATE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: [...state.dutySizes, action.payload],
                error: null,
                loading: false,
                status: dutyTypes.CREATE_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.CREATE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.CREATE_DUTY_SIZE_FAILURE
            };
        case dutyTypes.UPDATE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.UPDATE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.UPDATE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: state.dutySizes.map((dutySize: DutySize) => dutySize.id === action.payload ? action.payload : dutySize),
                error: null,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_SIZE_SUCCESS
            };
        case dutyTypes.UPDATE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.UPDATE_DUTY_SIZE_FAILURE
            };
        case dutyTypes.DELETE_DUTY_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                status: dutyTypes.DELETE_DUTY_SIZE_REQUEST
            };
        case dutyTypes.DELETE_DUTY_SIZE_SUCCESS:
            return {
                ...state,
                dutySizes: state.dutySizes.filter((dutySize) => dutySize.id !== action.payload),
                loading: false,
                status: dutyTypes.DELETE_DUTY_SUCCESS
            }
        case dutyTypes.DELETE_DUTY_SIZE_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
                status: dutyTypes.DELETE_DUTY_SIZE_FAILURE
            };
*/