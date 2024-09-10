'use client';

import Link, { LinkProps } from 'next/link';
import { SaasProvider, baseTheme } from '@saas-ui/react';
import React from 'react';
/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
  colors: {
    primary: {
      50: '#FBF5EF',
      100: '#e6f3ff',
      200: '#E2B88D',
      300: '#99ccff',
      400: '#4da6ff',
      500: "#CE853B",
      600: '#B5722C',
      700: '#945E24',
      800: '#633E18',
      900: '#633E18',
    },
    brand: {
      50: '#FBF5EF',
      100: '#e6f3ff',
      200: '#E2B88D',
      300: '#99ccff',
      400: '#4da6ff',
      500: "#CE853B",
      600: '#B5722C',
      700: '#945E24',
      800: '#633E18',
      900: '#633E18',
    },
  },
}, baseTheme);

const NextLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} {...props} />
);

NextLink.displayName = 'NextLink';

export function Providers({ children }: { children: React.ReactNode; }) {
  return <SaasProvider linkComponent={NextLink}>{children}</SaasProvider>;
}