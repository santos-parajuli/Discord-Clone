import { Metadata } from 'next';
import React from 'react';
import Signin from '@/components/auth/Signin';

export const metadata: Metadata = {
	title: 'Sign In | Discord Clone',
	description: 'Sign in to join the Discord today !',
};
export default function Page() {
	return (
		<div className='h-full flex justify-center items-center'>
			<Signin />
		</div>
	);
}
