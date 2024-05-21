import { component$ } from "@builder.io/qwik";

export interface SidebarProps {
  items: {route:string, name:string}[],
  logo: string
}

export default component$(({items}:SidebarProps) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}> {item.name} </li>
        ))}
      </ul>
    </div>
  )
});