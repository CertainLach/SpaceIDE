import {Panel} from "./Panel";

export default class SplitBox {
    vertical: boolean;
    size: number;
    nodes: Array<SplitBox|Panel>;
}