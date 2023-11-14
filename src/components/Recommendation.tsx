import React from 'react';
import { IDiscogsRelease } from '@/lib/utils/discogsUtils';
import { truncate } from '@/lib/utils/utils';
import Image from 'next/image';

// TODO add button to listen on Spotify
export default function Recommendation({
  recommendation,
}: {
  recommendation: IDiscogsRelease;
}) {
  return (
    <div className='flex flex-row flex-nowrap flex-shrink bg-neutral justify-stretch pl-0 py-0 pr-3 rounded-lg relative'>
      <Image
        src={
          recommendation.cover_image
            ? recommendation.cover_image
            : '/record-generic.jpg'
        }
        alt={recommendation.title + ' image.'}
        width={75}
        height={75}
        className='ml-0 my-0 rounded-tl-lg rounded-bl-lg'
      ></Image>
      <div className='flex flex-row flex-nowrap flex-shrink items-center justify-between w-max'>
        <p className='ml-1 text-sm'>{truncate(recommendation.title, 25)}</p>
        <button className='btn btn-secondary btn-sm justify-self-end absolute right-2'>
          <a
            target='_blank'
            href={'https://www.discogs.com' + recommendation.uri}
          >
            Buy
          </a>
        </button>
      </div>
    </div>
  );
}
