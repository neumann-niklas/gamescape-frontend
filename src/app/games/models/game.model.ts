import { User } from "../../auth/models/user.model";
import { GroupPhase } from "./group-phase.enum";

export interface Game {
    readonly id: string;
    readonly title: string;
    readonly groupPhase: GroupPhase;
    readonly createDate: Date;
    readonly updateDate: Date;
    readonly author: User;
}

export interface AddGame {
    readonly title: string;
    readonly groupPhase?: GroupPhase;
}

export interface UpdateGame extends Partial<AddGame> { }
