import { Loader2 } from 'lucide-react';
import React from 'react';

const Loader = ({ className = '' }: { className?: string }) => {
    return (
        <Loader2 className={`animate-spin w-12 h-12 text-blue-400 ${className}`} />
    );
};

export default Loader;