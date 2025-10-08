import React from 'react';

const HelpMessage = ({ isSubmitted }: { isSubmitted: boolean }) => {
    return (
        <div className='w-1/3'>
            {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <h3 className="font-bold text-lg mb-2">✅ Сообщение отправлено!</h3>
                    <p>Мы получили ваше обращение и свяжемся с вами в ближайшее время.</p>
                </div>
            ) : (
                <div className="bg-blue-100 border border-blue-400 text-blue-500 px-4 py-3 rounded">
                    <h3 className="font-bold text-lg mb-2">💬 Нужна помощь?</h3>
                    <p>Отправьте сообщение нашей технической поддержке, и мы поможем решить вашу проблему.</p>
                </div>
            )}
        </div>
    );
};

export default HelpMessage;