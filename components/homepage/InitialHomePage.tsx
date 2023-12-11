import Image from 'next/image';
import React from 'react';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';

async function InitialHomePage() {
	const servers = await db.server.findMany({
		include: {
			members: true,
		},
	});
	const profile = await currentProfile();
	if (!profile) {
		return redirectToSignIn();
	}
	const isMember = (server: { members: any[] }) => server.members.find((member: { id: string }) => member.id === profile.id);
	return (
		<div>
			<section className='py-20 bg-[#f1f1f1] dark:bg-[#262729]'>
				<div className='container mx-auto '>
					<div className='relative bg-[#b9b6b6] dark:bg-[#101011] z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]'>
						<div className='flex flex-wrap items-center -mx-4'>
							<div className='w-full px-4 '>
								<span className='block mb-4 text-base font-medium text-black dark:text-white'>Discord Clone</span>
								<h2 className='mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0'>
									<span>Invite your friends and have fun...</span>
								</h2>
							</div>
						</div>
						<div>
							<span className='absolute top-0 left-0 z-[-1]'>
								<svg width='189' height='162' viewBox='0 0 189 162' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<ellipse cx='16' cy='-16.5' rx='173' ry='178.5' transform='rotate(180 16 -16.5)' fill='url(#paint0_linear)' />
									<defs>
										<linearGradient id='paint0_linear' x1='-157' y1='-107.754' x2='98.5011' y2='-106.425' gradientUnits='userSpaceOnUse'>
											<stop stopColor='white' stopOpacity='0.07' />
											<stop offset='1' stopColor='white' stopOpacity='0' />
										</linearGradient>
									</defs>
								</svg>
							</span>
							<span className='absolute bottom-0 right-0 z-[-1]'>
								<svg width='191' height='208' viewBox='0 0 191 208' fill='none' xmlns='http://www.w3.org/2000/svg'>
									<ellipse cx='173' cy='178.5' rx='173' ry='178.5' fill='url(#paint0_linear)' />
									<defs>
										<linearGradient id='paint0_linear' x1='-3.27832e-05' y1='87.2457' x2='255.501' y2='88.5747' gradientUnits='userSpaceOnUse'>
											<stop stopColor='white' stopOpacity='0.07' />
											<stop offset='1' stopColor='white' stopOpacity='0' />
										</linearGradient>
									</defs>
								</svg>
							</span>
						</div>
					</div>
				</div>
			</section>
			<div className='flex flex-wrap justify-center items-center gap-5 mt-10'>
				<h1 className='w-full text-center text-3xl'>Available Servers</h1>
				{servers.map((server) => {
					return (
						<div key={server.id} className='w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-900 dark:border-gray-700'>
							<div className='flex flex-col items-center p-3'>
								<Image width='40' height='40' className=' w-20 h-20 mb-3 rounded-full shadow-lg' src={server.imageUrl} alt={server.name} />
								<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>{server.name}</h5>
								<div className='flex mt-4 md:mt-6'>
									<div className='flex mt-4 md:mt-6'>
										{server.members.map((member) => member.profileId == profile.id).some((value) => value === true) ? (
											<a
												href='#'
												className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-900'>
												Alredy Joined
											</a>
										) : (
											<a
												href={`invite/${server.inviteCode}`}
												className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:ring-slate-900'>
												Join
											</a>
										)}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default InitialHomePage;
