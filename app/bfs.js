// Define a function to find the shortest route using BFS
async function findShortestRoute(adjacencyList, startNode, endNode, setIsPaused, setCurrentNode, setQueuedNode, setCurrentLine, setQueue, setVisitedPositions, setParents, setRouteNodes) {
    // Create an object to store parent relationships (similar to HashMap in Java)
    const parents = {};
    parents[startNode] = null; // Start node has no parent
    setParents(parents)
 
    // Array to keep track of visited nodes
    const visitedPositions = [];
 
    // Use an array as a queue (LinkedList equivalent)
    const queue = [];
    queue.push(startNode); // Add start node to the queue
    setQueue(queue)
    await wait(1)
 
    // Loop until the queue is empty
    while (queue.length > 0) {
        // Remove the last element from the queue (similar to pollLast in Java)
        const currentNode = queue.shift();
        setQueue(queue)
 
        // If we've already visited this node, skip it
        if (visitedPositions.includes(currentNode)) continue;

        await wait(1)
        setCurrentNode(currentNode)
 
        // Mark the current node as visited
        visitedPositions.push(currentNode);
        setVisitedPositions(visitedPositions)
 
        // If we've reached the end node, return the route
        if (currentNode === endNode) {
            return getRoute(currentNode, parents, setRouteNodes);
        }
 
        // Loop through all neighbors of the current node
        for (const neighbour of adjacencyList[currentNode]) {
            await wait (1)
            setCurrentLine([currentNode, neighbour])
            // If neighbor hasn't been visited, add it to the queue and set its parent
            if (!visitedPositions.includes(neighbour)) {
                setQueuedNode(neighbour)
                queue.push(neighbour);
                setQueue(queue)
                if (!(neighbour in parents)) {
                    parents[neighbour] = currentNode;
                    setParents(parents)
                }
            }
        }
    }
 
    // If no route found, return an empty array
    return [];
}

function pause() {
    setIsPaused(true)
    while (isPaused) {}
}

function play() {
    setIsPaused(false)
}

function wait(seconds) {
   return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
   });
} 
 
// Helper function to reconstruct the route from parents
async function getRoute(currentNode, parents, setRouteNodes) {
    const route = [];
    route.unshift(currentNode); // Add to the beginning of the array
    while (parents[currentNode] !== null) {
        currentNode = parents[currentNode];
        route.unshift(currentNode); // Add the start node
        await wait(1)
        setRouteNodes(route)
    }
    return route;
}

const adjacencyList = {
    A: ['B', 'C', 'D'],
    B: ["A", "C", "E"],
    C: ["A", "B", "D", "E", "F"],
    D: ["A", "C", "F", "G"],
    E: ["B", "C", "F", "H"],
    F: ["C", "D", "E", "G", "H"],
    G: ["D", "F", "H"],
    H: ["E", "F", "G"]
};
 
export default findShortestRoute