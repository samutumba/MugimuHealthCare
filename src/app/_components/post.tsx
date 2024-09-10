'use client';

import { api } from "@/trpc/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const LatestPosts = () => {
  const [parent, enableAnimations] = useAutoAnimate();
  const posts = api.post.getPosts.useQuery({
    limit: 25,
  });

  return (<div ref={parent} className="flex flex-row gap-4 w-full flex-wrap">
    {posts.data?.map((post) => (<Link key={post.id} href={`/post/${post.id}`}>
      <div className="group block rounded-xl max-w-80 focus:outline-none">
        <div className="aspect-w-16 aspect-h-9">
          <img
            className="w-full max-h-48  object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1656278345213-1645e97a379e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Blog Image"
          />
        </div>
        <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-primary group-focus:text-primary dark:text-neutral-300 dark:group-hover:text-white dark:group-focus:text-white">
          {post.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
          {moment(post.createdAt).fromNow()}
        </p>
      </div>
    </Link>))}
  </div>);

};