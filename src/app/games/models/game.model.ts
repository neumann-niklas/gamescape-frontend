import { User } from "../../auth/models/user.model";
import { Category } from "../../categories/models/category.model";
import { GroupPhase } from "./group-phase.enum";

export interface Game {
    readonly id: string;
    readonly title: string;
    readonly groupPhase: GroupPhase;
    readonly createDate: Date;
    readonly updateDate: Date;
    readonly author: User;
    readonly category: Category;
}

export interface AddGame {
    readonly title: string;
    readonly groupPhase?: GroupPhase;
    readonly category: Category;
}

export interface UpdateGame extends Partial<AddGame> { }
