import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
const FeedCard: React.FC = () => {
  return (
    <div className="border border-l-0 border-t-0  border-gray-900 p-4 hover:bg-slate-950 transition-all cursor-pointer">
      <div className=" grid grid-cols-12 gap-2">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/124044913?v=4"
            alt="AvatorImage"
            height={50}
            width={50}
            // className="rounded-full"
          />
        </div>
        <div className="col-span-11">
          <h5>Ankit Chaudhary</h5>
          <p>
            Is it just me or everyone else? do you feel the code quality
            decrease as the project size incerases? just refactored a lot of bad
            code #codinglife
          </p>
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
