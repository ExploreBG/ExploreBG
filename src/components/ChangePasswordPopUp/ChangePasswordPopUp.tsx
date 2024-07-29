import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { toast } from 'react-toastify';

import { changePassword } from './action';
import { changePasswordSchema } from './changePasswordSchema';
import { passMinLength, passMaxLength } from '@/utils/validations';
import { getToken } from '@/utils/userSession';
import { agent } from '@/api/agent';

import './changePasswordPopUp.scss';
import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';

interface ChangePasswordPopUpProps {
    closePopUp: () => void
    userId: string
}

export const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ closePopUp, userId }) => {
    const t = useTranslations('pop-up');
    const t2 = useTranslations('login-register');
    const [lastResult, action] = useFormState(changePassword, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: changePasswordSchema });
        },

        async onSubmit(event, context) {
            const inputData = context.submission?.payload;

            const token = await getToken();

            try {
                const res = await agent.apiUsers.changePassword(userId, token, inputData);

                if (res.data) {
                    toast.success(res.data.success);
                    closePopUp();
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(res.errors[0]);
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    return (
        <section className="pop-up-wrapper">
            <article className="pop-up-wrapper__modal">
                <form
                    id={form.id}
                    onSubmit={form.onSubmit}
                    action={action}
                    noValidate
                    className="change-pass-form"
                >
                    <div>
                        <label htmlFor="currentPassword">{t('current-pass')}</label>
                        <input
                            type="password"
                            key={fields.currentPassword.key}
                            name={fields.currentPassword.name}
                            defaultValue={fields.currentPassword.initialValue}
                            placeholder="***************"
                        />
                        {fields.currentPassword.errors && (
                            <div className="error-message">{t2(fields.currentPassword.errors[0])}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="newPassword">
                            {t('new-pass')} &nbsp;
                            <CPasswordInfo />
                        </label>
                        <input
                            type="password"
                            key={fields.newPassword.key}
                            name={fields.newPassword.name}
                            defaultValue={fields.newPassword.initialValue}
                            placeholder="***************"
                        />
                        {fields.newPassword.errors && (
                            <div className="error-message">
                                {t2(fields.newPassword.errors[0], {
                                    minLength: passMinLength, maxLength: passMaxLength
                                })}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="confirmNewPassword">{t('confirm-new-pass')}</label>
                        <input
                            type="password"
                            key={fields.confirmNewPassword.key}
                            name={fields.confirmNewPassword.name}
                            defaultValue={fields.confirmNewPassword.initialValue}
                            placeholder="***************"
                        />
                        {fields.confirmNewPassword.errors && (
                            <div className="error-message">{t2(fields.confirmNewPassword.errors[0])}</div>
                        )}
                    </div>

                    <button type="submit">{t('change-btn')}</button>
                </form>

                <button onClick={closePopUp}>{t('cancel-btn')}</button>
            </article>
        </section>
    );
};

export default ChangePasswordPopUp;