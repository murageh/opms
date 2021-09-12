import {Action, configureStore, ThunkAction,} from '@reduxjs/toolkit';
import {counterReducer} from '../features/counter';
import kanyeReducer from "../features/kanye/reducer";
import {employeeReducer} from "../features/employees";
import {activityReducer} from "../features/activity/reducer";
import {salesReducer} from "../features/sales/reducer";
import {inventoryReducer} from "../features/inventory/reducer";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        kanyeQuote: kanyeReducer,
        inventory: inventoryReducer,
        employees: employeeReducer,
        activities: activityReducer,
        sales: salesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;