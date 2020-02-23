
import {
    CREATE_NEW_CATEGORY, EDIT_CATEGORY, FETCH_ALL_CATEGORIES_LIST, FETCH_ALL_CATEGORIES_PAGEABLE,
    REMOVE_CATEGORY
} from "../actions/types";

const categoryReducer = (state={pageable: {}, list: []}, action) => {
    switch (action.type) {
        case FETCH_ALL_CATEGORIES_PAGEABLE:
            state.pageable = action.data
            return  {...state}
        case FETCH_ALL_CATEGORIES_LIST:
            state.list = action.data
            return {...state}
        case CREATE_NEW_CATEGORY:
            return state;
        case REMOVE_CATEGORY:
            return state;
        case EDIT_CATEGORY:
            const editedCategory = action.data;
            const afterEditState = {...state};

            if (state.pageable !== {}) {
                console.log("Pageable");
                const editedCategoryIndexPageable = findIndexOfCategoryWithId(editedCategory.id, state.pageable.content);
                afterEditState.pageable.content[editedCategoryIndexPageable] = editedCategory;
            }

            if (state.list !== undefined && state.list.length !== 0) {
                const editedCategoryIndexList = findIndexOfCategoryWithId(editedCategory.id, state.list);
                afterEditState.list[editedCategoryIndexList] = editedCategory;
            }

            return {...afterEditState};
        default:
            return state;
    }
};

const findIndexOfCategoryWithId = (categoryId, categoryList) => {
    let index = -1;
    for (let category of categoryList) {
        index++;
        if (category.id === categoryId) {
            break;
        }
    }
    return index;
}
export default categoryReducer;