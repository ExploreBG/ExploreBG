'use client';

import React, { ReactNode, useTransition, ChangeEvent } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/navigation';

import './localeSwitcherSelect.scss';

interface LocaleSwitcherSelectProps {
    children: ReactNode;
    defaultValue: string;
}

const LocaleSwitcherSelect: React.FC<LocaleSwitcherSelectProps> = ({
    children,
    defaultValue
}) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const nextLocale = e.target.value;

        startTransition(() => {
            // @ts-expect-error -- TypeScript will validate that only known `params`
            // are used in combination with a given `pathname`. Since the two will
            // always match for the current route, we can skip runtime checks.
            router.replace({ pathname, params }, { locale: nextLocale });
        });
    };

    return (
        <label>
            <figcaption>
                {defaultValue == 'bg' && (
                    <Image
                        src={'/bg-flag.png'}
                        width={20} height={20} loading="eager"
                        alt="Bulgarian flag icon" title="Bulgarian flag icon"
                        priority={true}
                    />
                )}
                {defaultValue == 'en' && (
                    <Image
                        src={'/uk-flag.png'}
                        width={20} height={20} loading="eager"
                        alt="UK flag icon" title="UK flag icon"
                        priority={true}
                    />
                )}
            </figcaption>

            <select
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
                className="select"
            >
                {children}
            </select>
        </label>
    );
};

export default LocaleSwitcherSelect;