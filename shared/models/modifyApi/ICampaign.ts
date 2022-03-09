interface InputFieldProps {
    price?: number,
    requiredSaleQuantity?: number,
}

export interface ICampaign {
    startDate: string;
    endDate: string;
    quantity: number;
    promotionPlanId?: number;
    isPublish: true;
    milestones: InputFieldProps[];
}