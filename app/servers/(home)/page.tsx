import InitialHomePage from '@/components/homepage/InitialHomePage';
import { InitialModal } from '@/components/modals/initial-modal';
import { db } from '@/lib/db';
import { initialProfile } from '@/lib/initial-profile';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '@clerk/nextjs';

const HomePage = async () => {
	const profile = await initialProfile();
	if (!profile) {
		return redirectToSignIn();
	}

	return <InitialHomePage />;
};

export default HomePage;
