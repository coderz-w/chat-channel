import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
const SetUpPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
        Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`servers/${server.id}`);
  }
  return <div>create you server</div>;
};

export default SetUpPage;
