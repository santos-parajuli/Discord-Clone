import { NextResponse } from 'next/server';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { serverId: string } }) {
	try {
		const profile = await currentProfile();

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const server = await db.server.findUnique({
			where: { id: params.serverId },
			include: {
				channels: true,
				members: true,
			},
		});
		if (!server) {
			console.error('Server not found');
			return;
		}
		for (const channel of server.channels) {
			await db.message.deleteMany({ where: { channelId: channel.id } });
		}
		await db.channel.deleteMany({
			where: {
				serverId: params.serverId,
			},
		});
		await db.server.delete({
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
		});

		return NextResponse.json('Deleted Channels with its members, channel conversation etc.');
	} catch (error) {
		console.log('[SERVER_ID_DELETE]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}

export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {
	try {
		const profile = await currentProfile();
		const { name, imageUrl } = await req.json();

		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}

		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
			data: {
				name,
				imageUrl,
			},
		});

		return NextResponse.json(server);
	} catch (error) {
		console.log('[SERVER_ID_PATCH]', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
