export interface Place {
    id: number | string;
    name: string;
    category: string;
    description: string;
    fullDescription?: string;
    images: string[];
    address?: string;
    schedule?: {
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        sunday: string;
    };
    price: string;
    transport?: string[];
    accessibility?: string;
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}