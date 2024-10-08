import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
  const servers = await db.server.findMany({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  return (
    <div className=" space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1e1f22] py-3">
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] bg-zinc-300  dark:bg-zinc-700 rounded-md w-10 mx-auto"></Separator>
      <ScrollArea className=" flex-1 w-full">
        {servers.map((server) => (
          <div className=" mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              imageUrl={server.imageUrl}
              name={server.name}
            ></NavigationItem>
          </div>
        ))}
      </ScrollArea>
      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[38px] w-[38px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
