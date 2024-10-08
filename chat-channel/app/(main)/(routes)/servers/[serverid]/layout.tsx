import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverid: string };
}) => {
  const profile = await currentProfile();
  if (!profile) return redirectToSignIn();
  const server = db.server.findUnique({
    where: {
      id: params.serverid,
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  return (
    <div className=" h-full">
      <div className=" hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={params.serverid}></ServerSidebar>
      </div>
      <main className=" h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
