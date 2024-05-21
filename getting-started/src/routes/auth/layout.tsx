import { Slot, component$ } from "@builder.io/qwik";


export default component$(() => {
  return (
    <section>
      <div>Esto solo es visible en auth</div>
      <Slot />
    </section>
  )
})