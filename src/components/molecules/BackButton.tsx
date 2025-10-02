import React from 'react';
import Button from '../atoms/Button';

const BackButton = ({ className }: { className?: string }) => {
    return (
        <Button className={`${className}`}>
            Назад
        </Button>
    );
};

export default BackButton;