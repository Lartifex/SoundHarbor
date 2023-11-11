import React from 'react';
import { findUserReleases } from '@/lib/models/releases.model';
import Image from 'next/image';
import RecordCard from '@/components/RecordCard';

export default async function Collection() {
  const userReleases = await findUserReleases(1);

  return (
    <>
      <Image
        width={4912 / 10}
        height={3264 / 10}
        alt='collection image'
        src={'/record-collection.jpg'}
      />
      <div className='mx-3'>
        <div className='m-4 mt-6 flex flex-row justify-between align-middle'>
          <h1 className='text-3xl'>Collection</h1>
          <button className='btn btn-secondary max-h-4'>Add record</button>
        </div>
        <div className='flex justify-center mt-8'>
          {userReleases &&
            userReleases.map((release) => (
              <RecordCard key={release.id} release={release} />
            ))}
        </div>
      </div>
    </>
  );
}

/* (
  <div
    key={release.id}
    className='card card-compact text-black shadow-xl bg-primary w-[250px]'
  >
    <figure>
      <Image
        src='/folamour-test.jpeg'
        alt='Music!'
        width={250}
        height={250}
      />
    </figure>
    <div className='card-body'>
      <h2 className='card-title'>{release.label}</h2>
      <p className='text-xs'>
        If a dog chews shoes whose shoes does he choose?
      </p>
    </div>
  </div>
) */
