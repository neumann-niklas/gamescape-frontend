import { User } from "../../../core/models/user.model";
import { Category } from "../../categories/models/category.model";
import { GroupPhase } from "./group-phase.model";

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

export interface QueryGame {
    readonly search?: string;
    readonly groupPhase?: GroupPhase;
    readonly categoryId?: string;
    readonly sortBy?: 'title' | 'groupPhase' | 'updateDate';
    readonly sortOrder?: 'ASC' | 'DESC';
}
