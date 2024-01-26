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
import { User } from "@/gql/graphql";
import Image from "next/image";

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItem: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },

  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More Options",
    icon: <SlOptions />,
  },
];

async function FetchCurrentLoggedInUser(token: string) {
  return await graphqlClient.request(DetectLoggedInUser, { token });
}

export default function Home() {
  const [userData, setUserData] = React.useState<User>();
  const [State, setState] = React.useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = window.localStorage.getItem("__twitter_token");
    if (token) {
      FetchCurrentLoggedInUser(token).then((UsEr) => {
        setUserData(UsEr.DetectLoggedInUser!);
      });
    }
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  console.log(userData);
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      console.log(googleToken);

      if (!googleToken) return toast.error("Google token not found");
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        }
      );

      setTimeout(() => {
        toast.success("Verified Success");
      }, 2000);
      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
        window.location.reload();
      }
    },

    []
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-56">
        <div className="col-span-3 justify-start pt-1 ml-20 relative">
          <div className="text-2xl hover:bg-slate-800 rounded-full p-4 h-fit w-fit cursor-pointer transition-all  ">
            <BsTwitter />
          </div>

          <div className=" mt-4 text-1xl pr-4">
            <ul>
              {sideBarMenuItem.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-slate-800 rounded-full px-3 py-2 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 px-3">
              <button className="bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>

          {userData && (
            <div className=" absolute bottom-5 flex gap-2 items-center bg-slate-800 rounded-full px-3 py-3">
              {userData && userData.profileImageUrl && (
                <Image
                  className="rounded-full"
                  src={userData?.profileImageUrl}
                  alt="user-profile"
                  height={40}
                  width={40}
                />
              )}
              <div>
                <h3 className="text-xl uppercase">{userData.firstName}</h3>
                <h3 className="text-xl">{userData.lastName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6  border-r-[1px] border-l-[1px] h-screen overflow-scroll  border-gray-600">
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
                    rows={2}
                    placeholder="Whats happening?"
                    style={{ resize: "none" }}
                  ></textarea>
                  <div className="mt-1 flex justify-between items-center">
                    <BiImageAlt
                      onClick={handleSelectImage}
                      className="text-md"
                    />
                    <div className="mt-2 px-3">
                      <button className="bg-[#1d9bf0] font-semibold text-sm py-1 px-2 rounded-full ">
                        Tweet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>

        <div className="col-span-3">
          {!userData && (
            <div className=" p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
