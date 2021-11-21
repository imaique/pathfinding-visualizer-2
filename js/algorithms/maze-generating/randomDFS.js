import Stack from "../../data_structures/Stack"
import { getNeighborIncrements } from "../pathfinding/shared";

export const randomDFS = (start, end, grid) => {
    const neighbors = getNeighborIncrements(false);
    const stack = new Stack();
    stack.push(start);
    while(!stack.isEmpty()) {
        
    }

}