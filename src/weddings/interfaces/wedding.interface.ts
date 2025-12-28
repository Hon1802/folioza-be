export interface WeddingPerson {
  fullName: string;
  fatherName?: string;
  motherName?: string;
  address?: string;
  role: WeddingRole;
  familyOrder?: FamilyOrder;
  dateOfNegative?: Date;
  dateOfPositive?: Date;
}

export enum WeddingRole {
  BRIDE = 'BRIDE',
  GROOM = 'GROOM',
}

export enum FamilyOrder {
  ELDEST_SON = 'ELDEST_SON', // Trưởng nam
  ELDEST_DAUGHTER = 'ELDEST_DAUGHTER', // Trưởng nữ
  SECOND_SON = 'SECOND_SON', // Thứ nam
  SECOND_DAUGHTER = 'SECOND_DAUGHTER', // Thứ nữ
}
