import { ActionTooltip } from '../action-tooltip';
import Image from 'next/image';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { NavigationAction } from './navigation-action';
import { NavigationItem } from './navigation-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserButton } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export const NavigationSidebar = async () => {
	const profile = await currentProfile();
	if (!profile) {
		return redirect('/');
	}
	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});
	return (
		<div className='space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] py-3'>
			<ActionTooltip side='right' align='center' label='Direct Messages'>
				{/* <button onClick={() => onOpen('createServer')} className='group flex items-center'> */}
				<div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] bg-[#7289DA] hover:rounded-[16px] transition-all overflow-hidden items-center justify-center dark:bg-[#1E1F22] '>
					<Image src='/images/logo.jpg' alt='Discord Clone Logo' width={48} height={48} className='bg-cover' />
				</div>
				{/* </button> */}
			</ActionTooltip>
			<Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
			<ScrollArea className='flex-1 w-full'>
				{servers.map((server) => (
					<div key={server.id} className='mb-4'>
						<NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
					</div>
				))}
			</ScrollArea>
			<Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
			<div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
				<NavigationAction />
				<ModeToggle />
				<UserButton
					afterSignOutUrl='/'
					appearance={{
						elements: {
							avatarBox: 'h-[48px] w-[48px]',
						},
					}}
				/>
			</div>
		</div>
	);
};
