import React, { useRef } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { toast } from 'react-toastify';

import { IComment } from '@/interfaces/interfaces';
import { validateComment } from './action';
import { commentsSchema } from './commentsSchema';
import { agent } from '@/api/agent';
import { commentMaxLength } from '@/utils/validations';

interface TrailCommentsFormProps {
    userId: number
    trailId: string
    token: string
    handleNewComment: (comment: IComment) => void
}

const TrailCommentsForm: React.FC<TrailCommentsFormProps> = ({
    userId, trailId, token, handleNewComment
}) => {
    const t = useTranslations('trail-details');
    const inputRef = useRef<HTMLInputElement>(null);
    const [lastResult, action] = useFormState(validateComment, undefined);
    const [form, fields] = useForm({
        lastResult,
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: commentsSchema });
        },

        async onSubmit(event, context) {
            const input = context.submission?.payload.comment;

            if (input === ' ') {
                return;
            }

            const comment = { message: input }

            try {
                const res = await agent.apiTrails.createTrailComment(userId, Number(trailId), token, comment);

                if (res.id) {
                    handleNewComment(res);

                    if (inputRef.current) {
                        inputRef.current.value = '';
                    }
                } else if (res.message) {
                    toast.error(res.message);
                } else if (res.errors) {
                    toast.error(t(res.errors[0], { maxLength: commentMaxLength }));
                }
            } catch (err) {
                console.error(err);
            }
        },
    })

    return (
        <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
            className="comments__form"
        >
            <input
                type="text"
                ref={inputRef}
                key={fields.comment.key}
                name={fields.comment.name}
                placeholder={t('add-comment')}
            />

            <button type="submit">{t('send-btn')}</button>

            <div className="error-message">
                {fields.comment.errors && t(fields.comment.errors[0], {
                    maxLength: commentMaxLength
                })}
            </div>
        </form>
    );
};

export default TrailCommentsForm;