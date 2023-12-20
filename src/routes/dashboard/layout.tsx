import { Slot, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import Navbar from "~/components/shared/navbar/navbar";

export const useCheckAuthCookie = routeLoader$(({cookie, redirect}) => {
  const jwtCookie = cookie.get('jwt');
  //Validamos en el backend con jwt si realmente es el token
  if(jwtCookie){
    console.log(`cookie value: ${jwtCookie}`);
    return;
  }
  
  redirect(302, '/login');
})

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col items-center justify-center mt-5">
        <span class="text-5xl">Dashboard layout</span>
        <Slot />
      </div>
    </>
  )
})