// Define a function to find the shortest route using BFS
async function findShortestRoute(adjacencyList, startNode, endNode, setCurrentNode, setQueuedNode) {
    // Create an object to store parent relationships (similar to HashMap in Java)
    const parents = {};
    parents[startNode] = null; // Start node has no parent
 
    // Array to keep track of visited nodes
    const visitedPositions = [];
 
    // Use an array as a queue (LinkedList equivalent)
    const queue = [];
    queue.push(startNode); // Add start node to the queue
 
    // Loop until the queue is empty
    while (queue.length > 0) {
        // Remove the last element from the queue (similar to pollLast in Java)
        const currentNode = queue.shift();
 
        // If we've already visited this node, skip it
        if (visitedPositions.includes(currentNode)) continue;

        await wait(1)
        setCurrentNode(currentNode)
 
        // Mark the current node as visited
        visitedPositions.push(currentNode);
 
        // If we've reached the end node, return the route
        if (currentNode === endNode) {
            return getRoute(currentNode, parents);
        }
 
        // Loop through all neighbors of the current node
        for (const neighbour of adjacencyList[currentNode]) {
            // If neighbor hasn't been visited, add it to the queue and set its parent
            if (!visitedPositions.includes(neighbour)) {
                await wait(1)
                setQueuedNode(neighbour)
                queue.push(neighbour);
                if (!(neighbour in parents)) {
                    parents[neighbour] = currentNode;
                }
            }
        }
    }
 
    // If no route found, return an empty array
    return [];
}

function wait(seconds) {
   return new Promise(resolve => {
      setTimeout(resolve, seconds * 1000);
   });
} 
 
// Helper function to reconstruct the route from parents
function getRoute(currentNode, parents) {
    const route = [];
    while (parents[currentNode] !== null) {
        route.unshift(currentNode); // Add to the beginning of the array
        currentNode = parents[currentNode];
    }
    route.unshift(currentNode); // Add the start node
    return route;
}
 
// Next steps:
// 1. Add findShortestDistance function to return route length - 1.
//    Example:
//    function findShortestDistance(adjacencyList, startNode, endNode) {
//        return findShortestRoute(adjacencyList, startNode, endNode).length - 1;
//    }
 
// 2. Add more test cases to check different graphs and nodes.
 
// 3. (Optional) Link to HTML/CSS for user input and styled output.
 
 
 
//
//         graph.put("A", List.of("B", "C", "D"));
//         graph.put("B", List.of("A", "C", "E"));
//         graph.put("C", List.of("A", "B", "D", "E", "F"));
//         graph.put("E", List.of("B", "C", "F", "H"));
//         graph.put("D", List.of("A", "C", "F", "G"));
//         graph.put("F", List.of("C", "D", "E", "G", "H"));
//         graph.put("G", List.of("D", "F", "H"));
//         graph.put("H", List.of("E", "F", "G"));
 
 
 
// Sample adjacency list (graph)
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
 
 
 
// Test the function
// console.log(findShortestRoute(adjacencyList, 'A', 'H'));
 
 export default findShortestRoute