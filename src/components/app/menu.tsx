import { NavLink } from "./navlink";
import { DollarSign, Home, LayoutGrid } from "lucide-react";

export function Menu() {
  return (
    <nav className="border-r border-zinc-200 w-full max-w-[240px]">
      <div className="mt-4 px-4">
        <small className="uppercase font-bold">Menu</small>

        <div className="mt-2 flex flex-col gap-2">
          <NavLink
            href="/"
            className="justify-start flex gap-4"
          >
            <Home />
            Início
          </NavLink>

          <NavLink
            href="/projects"
            className="justify-start flex gap-4"
          >
            <LayoutGrid />
            Projetos
          </NavLink>

          <NavLink
            href="/budgets"
            className="justify-start flex gap-4"
          >
            <DollarSign />
            Orçamentos
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
