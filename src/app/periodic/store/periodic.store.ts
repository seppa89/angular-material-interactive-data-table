import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { PeriodicElement } from "./periodic.model";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { delay, of, pipe, switchMap } from "rxjs";
import { on } from "@ngrx/signals/events";
import { ELEMENT_DATA } from "./mock-data";

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
          return of(ELEMENT_DATA).pipe(delay(2000));
        }),
        switchMap((periodics) => {
          patchState(store, { periodics, loading: false });
          return of(null);
        })
      )
    ),
  }))
);
