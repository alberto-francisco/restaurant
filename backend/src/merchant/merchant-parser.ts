import { AuditParser } from './../audit/audit.parser';
import { Merchant } from './merchant';
import { IMerchantResponseDTO } from './merchant-response.dto';
export class MerchantParser {
  static createMerchantResponse(merchant: Merchant): IMerchantResponseDTO {
    const merchantResponse: IMerchantResponseDTO = {
      id: merchant.id,
      firstName: merchant.firstName,
      lastName: merchant.lastName,
      email: merchant.email,
      organisationName: merchant.organisationName,
      phoneNumber: merchant.phoneNumber,
      passwordHash: merchant.organisationAddress,
      role: merchant.role,
      isActive: merchant.isActive,
      status: merchant.status,
      organisationAddress: merchant.organisationAddress,
      ...AuditParser.createAuditResponse(merchant.audit),
    };
    return merchantResponse;
  }

  static merchantsResponse(merchants: Merchant[]): IMerchantResponseDTO[] {
    const merchantsResponse: IMerchantResponseDTO[] = [];
    for (const merchant of merchants) {
      merchantsResponse.push(this.createMerchantResponse(merchant));
    }
    return merchantsResponse;
  }
}
