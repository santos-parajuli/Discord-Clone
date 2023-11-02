import React from 'react';
import { SignUp } from '@clerk/nextjs';

export const metadata = {
	title: 'Signup | Discord Clone',
	description: 'Sign up to our Discord Clone page',
};
export default function Page() {
	return (
		<div className='p-5 flex justify-center items-center'>
			<SignUp />
		</div>
	);
}
