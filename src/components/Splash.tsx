import Button from "./button";
import { IconPlay } from "@src/icons/play";
import { IconPlus } from "@src/icons/plus";
import { SerializableMovie } from "@src/lib/types";

export function Splash({ featured }: { featured: SerializableMovie }) {
  return (
    <div className="flex flex-col justify-end h-full pb-[156px]">
      <span className="text-xl/5 tracking-[3px] mb-4 drop-shadow-titlesm">
        <span className="font-normal ">Orignal de </span>
        <span className="font-bold">LITEFLIX</span>
      </span>
      {/* negative indent to compensenate "padding" added by the large font*/}
      <h1 className="text-title text-teal-300 text-left -indent-1 font-bold mb-10">
        {featured.name}
      </h1>
      <div>
        <Button variant="solid" className="mr-6 hover:shadow-md">
          <IconPlay color="white" className="align-middle inline-block" />
          <span className="whitespace-pre"> Reproducir</span>
        </Button>
        <Button variant="outline" className="hover:shadow-md">
          <IconPlus color="white" className="align-middle inline-block mr-2" />
          <span>Mi Lista</span>
        </Button>
      </div>
    </div>
  );
}
