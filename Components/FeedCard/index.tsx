import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardData {
  data: Tweet;
}
const FeedCard: React.FC<FeedCardData> = (props) => {
  const { data } = props;

  return (
    <div className="border border-l-0 border-t-0  border-gray-900 p-4 hover:bg-slate-950 transition-all cursor-pointer">
      <div className=" grid grid-cols-12 gap-2">
        <div className="col-span-1">
          {data.author?.profileImageUrl && (
            <Image
              src={data.author.profileImageUrl}
              alt="AvatorImage"
              height={50}
              width={50}
              className="rounded-full"
              // className="rounded-full"
            />
          )}
        </div>
        <div className="col-span-11">
          <h6>
            <Link href={`/${data?.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h6>
          <p>{data.content}</p>
          <div className="flex justify-between mt-5 text-xl items-center w-[90%] ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
