import FeedCard from "@/Components/FeedCard";
import TwitterLayout from "@/Components/Layout/TwitterLayout";
import { graphqlClient } from "@/clients/api";
import { Tweet, User } from "@/gql/graphql";
import { DetectLoggedInUser, getUserByIdQuery } from "@/graphql/query/user";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();

  console.log(props.userInfo);

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
            {props.userInfo && props.userInfo.profileImageUrl && (
              <Image
                src={props.userInfo.profileImageUrl}
                className="rounded-full"
                width={100}
                height={100}
                alt="user-profile-image"
              />
            )}
            <h1 className="text-xl  mt-3">
              {props.userInfo?.firstName} {props.userInfo?.lastName}
            </h1>
          </div>
          <div>
            {props.userInfo?.tweets?.map((tweet) => (
              <FeedCard key={tweet?.id} data={tweet as Tweet} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string;
  if (!id) return { notFound: true, props: { user: undefined } };

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo.getUserById) {
    return { notFound: true };
  }

  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
};

export default UserProfilePage;
