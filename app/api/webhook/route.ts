import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { profile } from 'console';

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
	if (!WEBHOOK_SECRET) {
		throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
	}
	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}
	switch (evt.type) {
		case 'user.deleted':
			try {
				const profile = await db.profile.findUnique({
					where: {
						userId: evt.data.id,
					},
				});

				console.log(profile);

				// Update related servers
				await db.server.updateMany({
					where: { profileId: profile?.id },
					data: { profileId: '656565ee7f4124c18fe65ec2' },
				});

				// Update related members
				await db.member.updateMany({
					where: { profileId: profile?.id },
					data: { profileId: '656565ee7f4124c18fe65ec2' },
				});

				await db.channel.updateMany({
					where: { profileId: profile?.id },
					data: { profileId: '656565ee7f4124c18fe65ec2' },
				});
				// Delete the profile
				const result = await db.profile.delete({
					where: { userId: evt.data.id },
				});

				if (result) {
					return new Response('User deleted successfully', { status: 200 });
				} else {
					return new Response('User not found', { status: 404 });
				}
			} catch (error) {
				console.error(error);
				return new Response('Internal Server Error', { status: 500 });
			}
		case 'user.updated':
			return new Response('User Updated', { status: 200 });
	}
	console.log('Webhook body:', body);
	return new Response('Nothing Happened', { status: 200 });
}
