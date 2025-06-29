import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  of,
  pipe,
  switchMap,
  tap,
} from "rxjs";
import { ELEMENT_DATA } from "./mock-data";
import { PeriodicElement } from "./periodic.model";

type PeriodicsState = {
  periodics: PeriodicElement[];
  loading: boolean;
  filter: { query: string };
};

const initialState: PeriodicsState = {
  periodics: [],
  loading: false,
  filter: { query: "" },
};

export const PeriodicsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    fakeFetchData: rxMethod<void>(
      pipe(
        switchMap(() => {
          patchState(store, { loading: true });
          return of(ELEMENT_DATA).pipe(delay(1000));
        }),
        switchMap((periodics) => {
          patchState(store, { periodics, loading: false });
          return of(null);
        })
      )
    ),
    updateFilter: rxMethod<string>(
      pipe(
        debounceTime(2000),
        distinctUntilChanged(),
        tap((query) => {
          patchState(store, { filter: { query } });
        })
      )
    ),
  }))
);
