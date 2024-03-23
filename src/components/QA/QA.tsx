'use client';

import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { MdClear } from 'react-icons/md';

import './qa.scss';

interface IQuestion {
    id: number
    question: string
    answer: string
}

interface QAProps {
    questionsData: IQuestion[]
}

const QA: React.FC<QAProps> = ({ questionsData }) => {
    const [isOpenQuestion, setIsOpenQuestion] = useState<number | null>(null);

    const onOpenCloseQuestion = (id: number) => {
        if (isOpenQuestion == id) {
            setIsOpenQuestion(null);
        } else {
            setIsOpenQuestion(id);
        }
    };

    return (
        questionsData.map(q => (
            <article onClick={() => onOpenCloseQuestion(q.id)} key={q.id} className="question-wrapper">
                <div className="question-wrapper__question">
                    <p>{q.question}</p>
                    {isOpenQuestion != q.id ? <FiPlus /> : <MdClear />}
                </div>

                {isOpenQuestion == q.id && (
                    <p className="question-wrapper__answer">{q.answer}</p>
                )}
            </article>
        ))
    );
};

export default QA;