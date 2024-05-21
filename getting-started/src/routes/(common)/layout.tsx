import { Slot, component$ } from "@builder.io/qwik";
import Header from "~/components/ui/header/header";
import Sidebar from "~/components/ui/sidebar/sidebar";


export default component$(() => {
  const MOCK_PROPS = {
    items: [{route: "/trending", name:"Trending"}, {route: "/home", name:"Home"}],
    logo: "https://placekitten.com/200/200"
  }
  
  return (
    <>
      <Header />
      <Sidebar {...MOCK_PROPS} />
      <Slot />
    </>
  )
});