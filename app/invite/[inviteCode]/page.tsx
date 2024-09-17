import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

interface InviteCodePageProps {
	params: {
		inviteCode: string;
	};
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
	const profile = await currentProfile();

	if (!profile) {
		return redirectToSignIn();
	}

	if (!params.inviteCode) {
		return redirect('/');
	}

	const existingServer = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});
	if (existingServer) {
		return redirect(`/servers/${existingServer.id}`);
	}
	try {
		const server = await db.server.update({
			where: {
				inviteCode: params.inviteCode,
			},
			data: {
				members: {
					create: [
						{
							profileId: profile.id,
							role: 'GUEST',
						},
					],
				},
			},
		});
	} catch (error) {
		return (
			<div className=' h-full w-full flex  justify-center items-center '>
				<div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Invalid Invite Code</h5>
					<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Sorry! The invite code is invalid or already expired.</p>
					<a
						href='/'
						className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
						Return to Homepage
						<svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
							<path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
						</svg>
					</a>
				</div>
			</div>
		);
	}
	const server = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
		},
	});
	return redirect(`/servers/${server?.id}`);
};

export default InviteCodePage;
