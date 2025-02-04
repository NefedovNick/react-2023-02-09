import { createSelector } from "reselect";
import { REQUEST_STATUSES } from "../../../constants/statuses";
import { restaurantEntityAdapter } from ".";

export const selectRestaurantModule = (state) => state.restaurant;
const restarauntSelectors = restaurantEntityAdapter.getSelectors(selectRestaurantModule);


export const selectRestaraunts = restarauntSelectors.selectAll;

export const selectRestaurantById = (state, { restaurantId }) =>
  selectRestaurantModule(state).entities[restaurantId];

export const selectRestaurantIDsByDish = (state, { dishId }) => {
  return selectRestaraunts(state).filter(({ menu }) => menu.includes(dishId));
}

export const selectRestaurantIds = (state) => selectRestaurantModule(state).ids;

export const selectRestaurantEntities = (state) =>
  selectRestaurantModule(state).entities;

export const selectRestaurantsFilteredByName = createSelector(
  [selectRestaurantEntities, (_, { searchValue }) => searchValue],
  (entities, searchValue) => {
    return Object.values(entities).filter(
      ({ name }) => name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  }
);

// export const createSelectRestaurantsFilteredByName = () =>
//   createSelector(
//     [selectRestaurantEntities, (_, { searchValue }) => searchValue],
//     (entities, searchValue) => {
//       return Object.values(entities).filter(
//         ({ name }) =>
//           name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
//       );
//     }
//   );

export const selectRestaurantMenuById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.menu;

export const selectRestaurantReviewsById = (state, { restaurantId }) =>
  selectRestaurantById(state, { restaurantId })?.reviews;

export const selectRestaurantLoadingStatus = (state) =>
  selectRestaurantModule(state).status;

export const selectIsRestaurantLoading = (state) =>
  selectRestaurantLoadingStatus(state) === REQUEST_STATUSES.pending;

export const selectIsRestaurantLoaded = (state) =>
  selectRestaurantLoadingStatus(state) === REQUEST_STATUSES.success;
