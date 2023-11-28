import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/api/uploadthing', '/api/webhooks(.*)', '/api/socket/io'],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
