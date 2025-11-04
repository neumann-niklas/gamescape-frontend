export interface Category {
    readonly id: string;
    readonly name: string;
}

export interface AddCategory {
    readonly name: string;
}

export interface UpdateCategory extends Partial<AddCategory> { }
