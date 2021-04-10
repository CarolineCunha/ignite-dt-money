import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}
interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
    );

export function TransactionsProvider({ children }: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, []);

    function createTransaction(transaction: TransactionInput){
        
        api.post('/transactions', transaction)
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}