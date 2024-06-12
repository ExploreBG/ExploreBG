import React from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { toast } from 'react-toastify';

import { changePassword } from './action';
import { changePasswordSchema } from './changePasswordSchema';
import { passwordErrors } from '@/utils/validations';

import './changePasswordPopUp.scss';
import CPasswordInfo from '../common/CPasswordInfo/CPasswordInfo';

interface ChangePasswordPopUpProps {
    closePopUp: () => void
}

export const ChangePasswordPopUp: React.FC<ChangePasswordPopUpProps> = ({ closePopUp }) => {
    const t = useTranslations('pop-up');
    const [lastResult, action] = useFormState(changePassword, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: changePasswordSchema });
        },

        onSubmit(event, context) {
            const userData = context.submission?.payload;

            console.log(userData);

            toast.success('Successfully update password');
            closePopUp();
        },
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
                    <label htmlFor="currentPass">{t('current-pass')}</label>
                    <input
                        type="password"
                        key={fields.currentPass.key}
                        name={fields.currentPass.name}
                        defaultValue={fields.currentPass.initialValue}
                        placeholder="***************"
                    />
                    <div className="error-message">{fields.currentPass.errors}</div>

                    <label htmlFor="newPass">
                        {t('new-pass')} &nbsp;
                        <CPasswordInfo />
                    </label>
                    <input
                        type="password"
                        key={fields.newPass.key}
                        name={fields.newPass.name}
                        defaultValue={fields.newPass.initialValue}
                        placeholder="***************"
                    />
                    <div className="error-message">{passwordErrors(fields.newPass.errors)}</div>

                    <label htmlFor="confirmNewPass">{t('confirm-new-pass')}</label>
                    <input
                        type="password"
                        key={fields.confirmNewPass.key}
                        name={fields.confirmNewPass.name}
                        defaultValue={fields.confirmNewPass.initialValue}
                        placeholder="***************" />
                    <div className="error-message">{fields.confirmNewPass.errors}</div>

                    <button type="submit">{t('change-btn')}</button>
                </form>

                <button onClick={closePopUp}>{t('cancel-btn')}</button>
            </article>
        </section>
    );
};

export default ChangePasswordPopUp;