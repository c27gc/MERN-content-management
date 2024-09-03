'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { createContext, useContext, useState, ReactNode } from 'react';

interface TopicContextProps {
    createTopic: (name: string, description: string, coverImage: string, allowedContentTypes: string[]) => Promise<void>;
    allowedContentTypes: string[];
}

const TopicContext = createContext<TopicContextProps | undefined>(undefined);

export const TopicProvider = ({ children }: { children: ReactNode }) => {
    const [allowedContentTypes, setAllowedContentTypes] = useState<string[]>([
        'image', 'video', 'audio'
    ]);

    const createTopic = async (name: string, description: string, coverImage: string, allowedContentTypes: string[]) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('No token provided');
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_HOST}/api/topic`,
                { name, description, coverImage, allowedContentTypes },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );
        } catch (error) {
            //@ts-ignore
            if (error?.response?.data?.message) {
                //@ts-ignore
                const errorMessage = error.response?.data?.message || 'Failed to create topic';
                throw new Error(errorMessage);
            } else {
                throw new Error('Failed to create topic');
            }
        }
    };

    return (
        <TopicContext.Provider value={{ createTopic, allowedContentTypes }}>
            {children}
        </TopicContext.Provider>
    );
};

export const useTopic = () => {
    const context = useContext(TopicContext);
    if (!context) {
        throw new Error('useTopic must be used within a TopicProvider');
    }
    return context;
};
