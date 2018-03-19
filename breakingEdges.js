function main(input) {
    var iparr = input.split("\n"),
        noOfNodes = Number(iparr[0]),
        v = iparr[1].split(' ').map(Number),
        edgeArr = iparr.slice(2),
        tree = new Array(noOfNodes).fill(null).map(() => new Array(noOfNodes).fill(0));

    edgeArr.forEach(edge => {
        var edge = edge.split(' ').map(Number);
        tree = updateTree(edge, tree, 1);
    });
    var tempTree, count = 0;
    edgeArr.forEach(edge => {
        var edge = edge.split(' ').map(Number);
        tempTree = updateTree(edge, tree.slice(), 0);
        islandCounter(noOfNodes, tempTree, v);
        // if (isTreeOrEqual(tempTree)) { count++; }
    });
}

function isTreeOrEqual(forest) {

}

function islandCounter(noOfNodes, tree, v) {
    var visited = new Array(noOfNodes).fill(false),
        island = 1,
        orResult = new Array(2).fill(0);
    for (var i = 0; i < noOfNodes; i++) {
        if (!visited[i]) {
            visited[i] = true;
            orResult[island - 1] = dfs(tree, i, visited, noOfNodes, v[i], island, v);
            // orResult[island - 1] = or(orResult[island - 1], v[i]);
            island++;
        }
    }
    console.log(orResult);
}

function dfs(tree, node, visited, noOfNodes, orRes, island, v) {
    tree[node].forEach(function(edge, child) {
        if (!visited[child] && tree[node][child] === 1) {
            orRes = or(orRes, v[child]);
            visited[child] = true;
            dfs(tree, child, visited, noOfNodes, orRes, island, v);
        }
    });
    return orRes;
}

function or(a, b) {
    return a | b;
}

function updateTree(edge, tree, value) {
    tree[edge[0] - 1][edge[1] - 1] = value;
    tree[edge[1] - 1][edge[0] - 1] = value;
    return tree;
}
main("5\n2 3 32 43 8\n1 2\n1 3\n2 4\n3 5");