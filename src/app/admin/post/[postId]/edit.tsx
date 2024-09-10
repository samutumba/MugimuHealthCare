"use client";

import { Post } from "@prisma/client";
import {
  PropertyList,
  Property,
  PropertyLabel,
  PropertyValue,
} from '@saas-ui/react';

export const EditPostPage = async ({ post }: { post: Post; }) => {
  return (
    <>
      <PropertyList>
        <Property>
          <PropertyLabel>Title</PropertyLabel>
          <PropertyValue>{post.name}</PropertyValue>
        </Property>
        <Property>
          <PropertyLabel>Content</PropertyLabel>
          <PropertyValue>{post.content}</PropertyValue>
        </Property>
      </PropertyList>
    </>
  );

};