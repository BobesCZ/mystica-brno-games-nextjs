import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const providers = [];

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const secret = process.env.NEXTAUTH_SECRET;

if (clientId && clientSecret) {
  providers.push(
    GoogleProvider({
      clientId,
      clientSecret,
    }),
  );
}

export const authOptions = {
  providers,
  secret,
} satisfies NextAuthOptions;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
