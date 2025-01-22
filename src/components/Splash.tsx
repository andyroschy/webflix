import { Movie } from "@prisma/client";
import Button from "./button";
import { IconPlay } from "@src/icons/play";
import { IconPlus } from "@src/icons/plus";

export function Splash({ featured }: { featured: Movie }) {
  return (
    <div className="flex flex-col justify-end mb-8">
      <span className="text-xl/5 tracking-[3px] mb-4 drop-shadow-titlesm">
        <span className="font-normal ">Orignal de </span>
        <span className="font-bold">LITEFLIX</span>
      </span>
      {/* negative indent to compensenate "padding" added by the large font*/}
      <h1 className="text-title text-teal-300 text-left -indent-1 font-bold">
        {featured.name}
      </h1>
      <div>
        <Button variant="solid" className="mr-8 my-8">
          <IconPlay color="white" className="align-middle inline-block" />
          <span className="whitespace-pre"> Reproducir</span>
        </Button>
        <Button variant="outline">
          <IconPlus color="white" className="align-middle inline-block mr-2" />
          <span>Mi Lista</span>
        </Button>
      </div>
    </div>
  );
}
