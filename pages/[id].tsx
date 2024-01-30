import FeedCard from "@/Components/FeedCard";
import TwitterLayout from "@/Components/Layout/TwitterLayout";
import { graphqlClient } from "@/clients/api";
import { Tweet, User } from "@/gql/graphql";
import { DetectLoggedInUser } from "@/graphql/query/user";
import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";

async function FetchCurrentLoggedInUser(token: string) {
  return await graphqlClient.request(DetectLoggedInUser, { token });
}

const UserProfilePage: NextPage = () => {
  const router = useRouter();
  const { user } = useCurrentUser();

  // const [userData, setUserData] = React.useState<User>();
  // useEffect(() => {
  //   const token = window.localStorage.getItem("__twitter_token");
  //   if (token) {
  //     FetchCurrentLoggedInUser(token).then((UsEr) => {
  //       setUserData(UsEr.DetectLoggedInUser!);
  //     });
  //   }
  // }, []);
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className=" flex items-center gap-3 py-3 px-3">
            <BsArrowLeft className="text-2xl" />
            <div>
              <h1 className="text-xl font-bold">Ankit Chaudhary</h1>
              <h1 className="text-sm  text-slate-300">100 Tweets</h1>
            </div>
          </nav>
          <div className="p-2  border-b border-slate-800">
            {user && user.profileImageUrl && (
              <Image
                src={user.profileImageUrl}
                className="rounded-full"
                width={100}
                height={100}
                alt="user-profile-image"
              />
            )}
            <h1 className="text-xl  mt-3">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
          <div>
            {user?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfilePage;
