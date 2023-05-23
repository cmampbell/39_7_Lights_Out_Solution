import React from 'react';
import Board from './Board';
import { render, fireEvent } from "@testing-library/react";

it('renders without crashing', function() {
    render(<Board/>)
});

it('matches snapshot', function() {
    const {asFragment} = render(<Board ncols={3} nrows={3} chanceLightStartsOn={-1}/>)
    expect(asFragment()).toMatchSnapshot();
})

it('flips correct cells on click', function() {
    const {getAllByRole} = render(<Board ncols={3} nrows={3} chanceLightStartsOn={-1}/>)
    const cells = getAllByRole('cell')

    // cell at 0-0
    const topLeft = cells[0];

    expect(topLeft).toHaveClass('Cell Cell-lit')

    fireEvent.click(topLeft);

    expect(topLeft).not.toHaveClass('Cell Cell-lit')
    // cell at 0-1 - right of click
    expect(cells[1]).not.toHaveClass('Cell Cell-lit')
    // cell at 0-2 - not adjacent to click
    expect(cells[2]).toHaveClass('Cell Cell-lit')
    // cell at 1-0 - bottom of click
    expect(cells[3]).not.toHaveClass('Cell Cell-lit')
    // cell at 1-1 - not adjacent to click
    expect(cells[4]).toHaveClass('Cell Cell-lit')
})

it('displays you won when all lights are off', function() {
    const {getByText} = render(<Board ncols={3} nrows={3} chanceLightStartsOn={2}/>)

    expect(getByText('You won!')).toBeTruthy()
})