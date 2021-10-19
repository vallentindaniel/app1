

export interface User{
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_repeat: string
}

export interface Product{
    category_id: string,
    title: string,
    description: string,
    path: string,
    price: number,
    quantity: number
}
