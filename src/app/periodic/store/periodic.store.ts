import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { debounceTime, delay, of, pipe, switchMap, tap } from "rxjs";
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
        tap((query) => {
          patchState(store, { filter: { query } });
        })
      )
    ),
    clearFilter: () => {
      patchState(store, (state) => ({ filter: { query: "" } }));
    },
    updateData: (
      newValue: string,
      periodicPointer: { id: number; key: string }
    ) => {
      const { id, key } = periodicPointer;

      patchState(store, (state) => ({
        periodics: state.periodics.map((p) =>
          p.position === id ? { ...p, [key]: newValue } : p
        ),
      }));
    },
  }))
);
