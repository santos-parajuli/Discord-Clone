'use client';

import { dark, neobrutalism } from '@clerk/themes';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { useTheme } from 'next-themes';

function Signup() {
	const theme = useTheme().theme === 'dark' ? dark : neobrutalism;
	return (
		<div className='flex justify-center items-center h-full'>
			<SignUp appearance={{ baseTheme: theme, variables: { colorPrimary: 'blue' } }} />
		</div>
	);
}

export default Signup;
