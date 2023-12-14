'use client';

import { useEffect, useState } from 'react';

import { CreateChannelModal } from '../modals/create-channel-modal';
import { CreateServerModal } from '@/components/modals/create-server-modal';
import { DeleteServerModal } from '../modals/delete-server';
import { EditServerModal } from '../modals/edit-server-modal';
import { InviteModal } from '../modals/invite-modal';
import { LeaveServerModal } from '../modals/leave-server-modal';
import { MembersModal } from '../modals/members-modal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<CreateServerModal />
			<InviteModal />
			<CreateChannelModal />
			<LeaveServerModal />
			<DeleteServerModal />
			<EditServerModal />
			<MembersModal />
		</>
	);
};
