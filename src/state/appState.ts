import {Name} from "./ducks/userName/types";
import {ColumnData} from "./ducks/columns/types";
import {TaskData} from "./ducks/tasks/types";

export interface RootState  {
    column: ColumnData[];
    task: TaskData;
    userName: Name;
}