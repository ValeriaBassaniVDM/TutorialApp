import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../app.component";

export const selectUserState = createFeatureSelector<User>('user');

export const selectUser = createSelector(
  selectUserState,
  (user: User) => user 
);

export const selectIsAuthenticated = createSelector(
    selectUserState,
    (user: User) => user?.id
);