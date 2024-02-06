// ExampleWithProviders.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MaterialReactEditableTableExample from './MaterialReactEditableTableExample';


const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    <QueryClientProvider client={queryClient}>
        <MaterialReactEditableTableExample />
    </QueryClientProvider>
);

export default ExampleWithProviders;