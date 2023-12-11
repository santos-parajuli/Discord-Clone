'use client';

import { dark, neobrutalism } from '@clerk/themes';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { useTheme } from 'next-themes';

function Signin() {
	const theme = useTheme().theme === 'dark' ? dark : neobrutalism;
	return <SignIn appearance={{ baseTheme: theme, variables: { colorPrimary: 'blue' } }} />;
}

export default Signin;
