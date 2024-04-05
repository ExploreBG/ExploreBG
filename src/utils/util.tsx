import Image from 'next/image';
import { Link } from '@/navigation';
import { IComment } from '@/interfaces/interfaces';

export const renderComments = (data: IComment[]) => {
    return (
        data
            .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
            .map((c: IComment) => (
                <div key={c.id}>
                    <Link href={{
                        pathname: '/users/[id]',
                        params: { id: c.owner.id }
                    }}>
                        <Image
                            src={c.owner.imageUrl || '/images/user-profile-pic.png'}
                            width={30} height={30} alt="User picture" loading="lazy"
                            title={c.owner.username} priority={false}
                        />
                    </Link>

                    <p>{c.message}</p>
                </div>
            ))
    );
};