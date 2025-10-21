export interface Food {
    food: FoodElement[];
}

export interface FoodElement {
    id: number;
    user: string;
    title: string;
    date: string;
}
