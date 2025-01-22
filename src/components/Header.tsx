import { IconFlix } from "@src/icons/flix";
import { IconPlus } from "@src/icons/plus";
import Button from "./button";
import { IconBell } from "@src/icons/bell";
import { IconMenu } from "@src/icons/menu";

export function Header() {
  return (
    <header className="flex flex-row justify-between w-full mt-4">
      <div>
        <IconFlix className="align-middle inline-block" />
        <Button
          variant="text"
          className="ml-16 text-lg leading-[18px] hover:drop-shadow-titlesm"
        >
          <IconPlus color="white" className="align-middle inline-block mr-2" />
          <span>Agregar Películas</span>
        </Button>
      </div>
      <div>
        <IconMenu className="align-middle inline-block mr-8 cursor-pointer hover:drop-shadow-titlesm" />
        <IconBell className="align-middle inline-block mr-8 cursor-pointer hover:drop-shadow-titlesm" />
        <button
          className="w-10 h-10 overflow-hiden align-middle rounded-full bg-[url('/profile.png')] cursor-pointer bg-top hover:shadow-sm hover:shadow-gray-800"
          style={{ backgroundSize: 40 }}
        />
      </div>
    </header>
  );
}
