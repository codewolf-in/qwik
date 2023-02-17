import type { Signal } from "@builder.io/qwik";
import { useContext, useContextProvider } from "@builder.io/qwik";
import {
  component$,
  useTask$,
  useStore,
  useSignal,
  createContext,
} from "@builder.io/qwik";
import { StyledButton } from "./counter.css";

interface State {
  count: number;
  debounced: number;
}

export const MyContext = createContext<State>("stuff");

export default component$(() => {
  const count = useSignal<number>(0);
  const store = useStore<State>({
    count: 0,
    debounced: 0,
  });
  const contextStore = useStore<State>({
    count: 0,
    debounced: 0,
  });

  useContextProvider(MyContext, contextStore);

  useTask$(({ track }) => {
    // track changes in store.count
    track(() => store.count);
    track(() => count);
    console.log("count changed");

    const timer = setTimeout(() => {
      store.debounced = store.count;
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  });

  console.log("<App> renders");
  return (
    <div>
      <div id="child">state count: {count.value}</div>
      <div id="child">store count: {store.count}</div>
      <Child state={store} count={count} />
    </div>
  );
});

export const Child = component$(
  ({ state, count }: { state: State; count: Signal<number> }) => {
    const contextStore = useContext(MyContext);
    console.log("<Child> render");
    return (
      <div>
        <GrandChild state={state} />
        <StyledButton onClick$={() => state.count++}>
          store count +
        </StyledButton>
        <StyledButton onClick$={() => count.value++}>
          state count +
        </StyledButton>
        <StyledButton onClick$={() => contextStore.count++}>
          context count +
        </StyledButton>
      </div>
    );
  }
);

export const GrandChild = component$((props: { state: State }) => {
  const contextStore = useContext(MyContext);
  console.log("<GrandChild> render");
  return (
    <div id="debounced">
      Context store count: {contextStore.count}
      <br />
      Debounced: {props.state.debounced}
    </div>
  );
});
