import { NextRequest } from "next/server";
import { writeDiscogsAuthBaseHeader } from "@/lib/utils/externalAuthUtils";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import querystring from 'querystring'


const authUrl = 'https://api.discogs.com/oauth/';
const accessTokenUrl = authUrl + 'access_token';


export const GET = async (req:NextRequest) => {
  const params = req.nextUrl.searchParams;
  const token = params.get('oauth_token');
  const verifier = params.get('oauth_verifier');
  const discogsNonce = cookies().get('discogsNonce')!.value;
  const discogsSecret = cookies().get('discogs_secret')!.value;
  
  if (!token || !verifier) return new Error('Not token received in callback');
  

  // Refer to this for the below: https://www.discogs.com/forum/thread/785104?message_id=8307207#7793236
  const incompleteSignature = process.env.DISCOGS_CLIENT_SECRET! + '&';
  let headerString = writeDiscogsAuthBaseHeader(Date.now(), discogsNonce);
  headerString += `,oauth_token="${token}",oauth_verifier="${verifier}"`;
  headerString = headerString.replace(incompleteSignature, incompleteSignature + discogsSecret);
  
  
  console.log('headerString: callback :>> ', headerString);
  const response = await fetch(accessTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': headerString
    }
  })
  const {oauth_token, oauth_token_secret} = querystring.parse(await response.text());

  if (!oauth_token || !oauth_token_secret ) {
    return Response.json({status:500, message: 'No token in discogs response'});
  }

  cookies().set('discogs_access_token', oauth_token as string);
  cookies().set('discogs_token_secret', oauth_token_secret as string);
  redirect('/dashboard');
}


// export async function getAccessTokens(token: string, verifier: string) {
  
//   console.log('headerString :>> ', headerString);

//   try {

//   } catch (e) {
//     console.log('Error on server-side getAccessTokens');
//     return e;
//   }
// }