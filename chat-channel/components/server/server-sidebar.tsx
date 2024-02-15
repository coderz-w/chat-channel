import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({
  serverId
}: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      Channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      Members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        }
      }
    }
  });
console.log(server)
  const textChannels = server?.Channels.filter((channel) => channel.type === ChannelType.TEXT)
  const audioChannels = server?.Channels.filter((channel) => channel.type === ChannelType.AUDIO)
  const videoChannels = server?.Channels.filter((channel) => channel.type === ChannelType.VIDEO)
  const members = server?.Members.filter((member) => member.profileId !== profile.id)

  if (!server) {
    return redirect("/");
  }

  const role = server.Members.find((member) => member.profileId === profile.id)?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server={server}
        role={role}
      />
    </div>
  )
}