import { Node } from 'unist';

declare type TestObj = { [key: string]: unknown };
declare type TestFn<V extends Node> = (node: V) => boolean;

declare function find<V extends Node>(tree: Node, test: string | TestObj | TestFn<V>): V;

export default find;

