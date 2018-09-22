export class LinkedList<T> {
 
    private items: T[];
    public nodes: Node<T>[];

    constructor(items: T[]) {

        const nodes: Node<T>[] = items.map((item) => { 
            return {
                value: item,
                next: null,
            }
        });

        nodes.forEach((node, index) => {
            if (index == nodes.length -1) {
                node.next = nodes[0];
            }
            else {
                node.next = nodes[index + 1];
            }
        });

        this.nodes = nodes;
    }
}

interface Node<T> {
    value: T;
    next: Node<T>;
}