'use client';

import React from 'react';

import { IUserSession, IFormEnums, IHut, IPlace } from '@/interfaces/interfaces';
import { ApproveTrailContextProvider } from '@/contexts/ApproveTrailContext';

import CreateTrailForm from '../CreateTrailForm/CreateTrailForm';

interface CreateTrailClientProps {
    userSession: IUserSession | null;
    formEnums: IFormEnums;
    availableAccommodations: IHut[];
    availableDestinations: IPlace[];
}

const CreateTrailClient: React.FC<CreateTrailClientProps> = ({
    userSession, formEnums, availableAccommodations, availableDestinations
}) => {
    return (
        <ApproveTrailContextProvider>
            <CreateTrailForm
                userSession={userSession}
                formEnums={formEnums}
                availableAccommodations={availableAccommodations}
                availableDestinations={availableDestinations}
            />
        </ApproveTrailContextProvider>
    );
};

export default CreateTrailClient;