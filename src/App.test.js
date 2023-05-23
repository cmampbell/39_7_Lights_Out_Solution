import React from 'react';
import App from './App';
import { render, fireEvent } from "@testing-library/react";

it('renders without crashing', function() {
    render(<App/>)
});