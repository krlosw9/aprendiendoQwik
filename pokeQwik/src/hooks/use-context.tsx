import { $, useComputed$, useSignal } from "@builder.io/qwik";


export const useCounter = (initialValue: number) => {
  const counter = useSignal(initialValue);

  const decrease = $(() =>{
    counter.value--;
  })

  const increase = $(() =>{
    counter.value++;
  })

  return {
    counter: useComputed$(() => counter.value),
    decrease,
    increase
  };
}