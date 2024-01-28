import React, { Children, useCallback, useEffect, useMemo } from "react";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import {
  BiHomeCircle,
  BiHash,
  BiUser,
  BiMoney,
  BiImageAlt,
} from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import { User } from "@/gql/graphql";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {
  DetectLoggedInUser,
  verifyUserGoogleTokenQuery,
} from "@/graphql/query/user";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

async function FetchCurrentLoggedInUser(token: string) {
  return await graphqlClient.request(DetectLoggedInUser, { token });
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

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

  const [userData, setUserData] = React.useState<User>();
  useEffect(() => {
    const token = window.localStorage.getItem("__twitter_token");
    if (token) {
      FetchCurrentLoggedInUser(token).then((UsEr) => {
        setUserData(UsEr.DetectLoggedInUser!);
      });
    }
  }, []);

  const sidebarMenuItems: TwitterSideBarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link: "/",
      },

      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${userData?.id}`,
      },
      {
        title: "More Options",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [userData?.id]
  );

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-44">
        <div className="col-span-2 sm:col-span-3 sm:justify-end pt-1 flex pr-4 relative">
          <div>
            <div className="text-2xl hover:bg-slate-800 rounded-full p-4 h-fit w-fit cursor-pointer transition-all ">
              <BsTwitter />
            </div>

            <div className=" mt-4 text-1xl pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.link}
                      className="flex justify-start items-center gap-4 hover:bg-slate-800 rounded-full px-3 py-2 w-fit cursor-pointer mt-2"
                    >
                      <span className=" text-2xl">{item.icon}</span>
                      <span className="hidden sm:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 px-3">
                <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Tweet
                </button>

                <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  <BsTwitter />
                </button>
              </div>
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
              <div className="hidden sm:block">
                <h3 className="text-md ">
                  {userData.firstName} {userData.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-10 sm:col-span-6  border-r-[1px] border-l-[1px] h-screen overflow-scroll  border-gray-600">
          {props.children}
        </div>

        <div className="col-span-0 sm:col-span-3 p-5">
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
};

export default TwitterLayout;
