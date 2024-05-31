import React from 'react';
import Image from 'next/image';
import { FaUserNinja, FaMale, FaFemale, FaEdit } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

import './myProfile.scss';
import Layout from '@/components/Layout/Layout';

interface MyProfileProps { }

export const MyProfile: React.FC<MyProfileProps> = () => {
    return (
        <Layout>
            <main className="my-profile-container">
                <article>
                    <h1>My Profile</h1>

                    <section>
                        <figure>
                            <Image
                                src={'/images/user-profile-pic.png'}
                                width={200} height={200} alt="User photo"
                                loading="eager"
                                title="User photo" priority={true}
                            />
                            <FaUserNinja />&nbsp;<figcaption>Username</figcaption>
                        </figure>

                        <p><HiOutlineMail /> <strong>user-email@gmail.com</strong></p>
                        <p><FaMale /> gender: <strong>male</strong> <FaEdit className="edit" /></p>
                        {/* <FaFemale /> */}
                        <p><LiaBirthdayCakeSolid /> birthday: <strong>03 feb 1990</strong> <FaEdit className="edit" /></p>

                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, inventore reiciendis velit magni eum similique nesciunt, corrupti ipsum vitae error officia ut. Quo harum quam repudiandae quaerat rem, saepe fugit id. Ex nam deleniti sapiente at amet, doloremque rerum corrupti fugit non recusandae accusantium qui pariatur. Quas dicta nisi voluptatum necessitatibus optio quis, iste tempora animi recusandae, temporibus fugiat? Eos sint natus iure error modi fugiat qui ad aperiam quae, commodi ullam debitis sed facilis dolor ipsa ex nisi odio est voluptates corrupti placeat ea quod nesciunt? Enim, quam incidunt quae reprehenderit delectus vel modi perspiciatis saepe ratione deserunt corrupti? <FaEdit className="edit" /></p>

                        <aside>
                            <button>Delete this account</button>
                            <button>Change password</button>
                        </aside>
                    </section>
                </article>
            </main>
        </Layout>
    );
};

export default MyProfile;