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
    {posts.data?.map((post) => (<Link key={post.id} href={`/admin/post/${post.id}`}>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>
            {post.name}
          </CardTitle>
          <CardDescription>
            {
              moment(post.createdAt).fromNow()
            }</CardDescription>
        </CardHeader>
      </Card></Link>))}
  </div>);

};