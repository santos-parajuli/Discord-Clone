import { Metadata } from 'next';
import React from 'react';
import Signup from '@/components/auth/Signup';

export const metadata: Metadata = {
	title: 'Sign Up | Discord Clone',
	description: 'Sign up to join the Discord today !',
};
export default function Page() {
	return (
		<div className='h-full flex justify-center items-center'>
			<Signup />
		</div>
	);
}
