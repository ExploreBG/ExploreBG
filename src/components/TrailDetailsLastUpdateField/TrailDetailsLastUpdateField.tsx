import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { useTrailDetailsCtx } from '@/contexts/TrailDetailsContext';
import { formatEntityLastUpdate } from '@/utils/utils';

interface TrailDetailsLastUpdateFieldProps {
    lastUpdateDate: string;
}

const TrailDetailsLastUpdateField: React.FC<TrailDetailsLastUpdateFieldProps> = ({
    lastUpdateDate
}) => {
    const t = useTranslations('trail-details');
    const { lastUpdate, setLastUpdate } = useTrailDetailsCtx();

    useEffect(() => {
        setLastUpdate(lastUpdateDate);
    }, []);

    return (
        <p className="trail__last-update">
            <em>{t('last-update')}:</em> &nbsp;
            <time dateTime={lastUpdate}>
                {formatEntityLastUpdate(lastUpdate)}
            </time>
        </p>
    );
};

export default TrailDetailsLastUpdateField;