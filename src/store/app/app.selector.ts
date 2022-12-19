import { StoreState } from '../store';

export const mainAlertStateSelector = (store: StoreState) => store.app.mainAlert;
