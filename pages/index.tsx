import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import {
  BiHomeCircle,
  BiHash,
  BiUser,
  BiMoney,
  BiImageAlt,
} from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import React, { useCallback, useEffect } from "react";
import FeedCard from "@/Components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import {
  DetectLoggedInUser,
  verifyUserGoogleTokenQuery,
} from "@/graphql/query/user";
import {} from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { Tweet, User } from "@/gql/graphql";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import TwitterLayout from "@/Components/Layout/TwitterLayout";

async function FetchCurrentLoggedInUser(token: string) {
  return await graphqlClient.request(DetectLoggedInUser, { token });
}

export default function Home() {
  const [State, setState] = React.useState(false);
  const [userData, setUserData] = React.useState<User>();

  const [content, setContent] = React.useState("");

  const queryClient = useQueryClient();
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("__twitter_token");
    if (token) {
      FetchCurrentLoggedInUser(token).then((UsEr) => {
        setUserData(UsEr.DetectLoggedInUser!);
      });
    }
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({ content });
  }, [content, mutate]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <div className="border border-l-0 border-t-0  border-gray-900 p-4 hover:bg-slate-950 transition-all cursor-pointer">
            <div className=" grid grid-cols-12 gap-2">
              <div className="col-span-1">
                {userData && userData.profileImageUrl && (
                  <Image
                    className="rounded-full"
                    src={userData?.profileImageUrl}
                    alt="AvatorImage"
                    height={50}
                    width={50}

                    // className="rounded-full"
                  />
                )}
              </div>
              <div className="col-span-11">
                <textarea
                  className=" w-full bg-transparent text-md p-2 border-b border-slate-700 focus:outline-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={2}
                  placeholder="Whats happening?"
                  style={{ resize: "none" }}
                ></textarea>
                <div className="mt-1 flex justify-between items-center">
                  <BiImageAlt onClick={handleSelectImage} className="text-md" />
                  <div className="mt-2 px-3">
                    <button
                      className="bg-[#1d9bf0] font-semibold text-sm py-1 px-2 rounded-full "
                      onClick={handleCreateTweet}
                    >
                      Tweet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {tweets &&
          tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
      </TwitterLayout>
    </div>
  );
}
