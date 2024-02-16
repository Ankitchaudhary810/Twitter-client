import React, { useCallback } from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { ToggleLikeMutation } from "@/graphql/mutation/tweet";
import { useQueryClient } from "@tanstack/react-query";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const handleLikeToggle = useCallback(
    async (id: string) => {
      await graphqlClient.request(ToggleLikeMutation, { id: id });
      toast.success("Done");

      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
    },
    [queryClient]
  );

  return (
    <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          {data.author?.profileImageUrl && (
            <Image
              className="rounded-full"
              src={data.author.profileImageUrl}
              alt="user-image"
              height={50}
              width={50}
            />
          )}
        </div>
        <div className="col-span-11">
          <h5>
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>
          <p>{data.content}</p>
          {data.imageURL && (
            <Image src={data.imageURL} alt="image" width={400} height={400} />
          )}
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <button onClick={() => handleLikeToggle(data.id)}>
              <div className="flex gap-1 items-center  ">
                {data.likeIds?.includes(user?.id) ? (
                  <>
                    <AiFillHeart color="red" size={19} />
                    {
                      <span color="red" className="text-sm">
                        {data.likeIds?.length || 0}
                      </span>
                    }
                  </>
                ) : (
                  <>
                    <AiOutlineHeart color="red" size={19} />
                    <span color="red" className="text-sm">
                      {data.likeIds?.length || 0}
                    </span>
                  </>
                )}
              </div>
            </button>
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
