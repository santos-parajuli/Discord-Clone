// If user is logging in for the first time, it will save the profile information in the database

import { currentUser, redirectToSignIn } from '@clerk/nextjs';

import { db } from '@/lib/db';

export const initialProfile = async () => {
	const user = await currentUser();
	// if not logged in, redirect for signin
	if (!user) {
		return redirectToSignIn();
	}
	const profile = await db.profile.findUnique({
		where: {
			userId: user.id,
		},
	});
	// if logged in and already have profile in database, return the profile
	if (profile) {
		return profile;
	}
	// if logged in and doesnot already have profile in database, create a new profile for that user and return that user profile.
	const newProfile = await db.profile.create({
		data: {
			userId: user.id,
			name: `${user.firstName} ${user.lastName}`,
			imageUrl: user.imageUrl,
			email: user.emailAddresses[0].emailAddress,
		},
	});
	return newProfile;
};
