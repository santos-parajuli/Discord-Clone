import React from 'react';
import { SignIn } from '@clerk/nextjs';

export const metadata = {
	title: 'Signin | Discord Clone',
	description: 'Sign in to our Discord Clone page',
};
export default function Page() {
	return (
		<div className='h-full flex justify-center items-center'>
			<SignIn />;
		</div>
	);
}
