import React from 'react';
import Cell from './Cell';
import { render, fireEvent } from "@testing-library/react";

it('renders without crashing', function() {
    const table = document.createElement('table')
    const tbody = document.createElement('tbody')
    const tr = document.createElement('tr')

    render(<Cell/>, {
        container: document.body.appendChild(table).appendChild(tbody).appendChild(tr)
    })
});