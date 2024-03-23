import { createContext } from 'react';

type UserContextType = { username: string | null };

const UserContext = createContext<UserContextType>({ username: null });

export { UserContext };
