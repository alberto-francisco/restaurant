import { Result } from './../domain/result/result';
import { IMerchantResponseDTO } from './merchant-response.dto';
import { CreateMerchantDTO } from './create-merchant.dto';
import { TYPES } from './../application/constants/types';
import { IMerchantService } from './merchant-service.interface';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';

@Controller('merchants')
export class MerchantController {
  constructor(
    @Inject(TYPES.IMerchantService)
    private readonly merchantService: IMerchantService,
  ) {}

  @Post()
  async createMerchant(
    @Body() request: CreateMerchantDTO,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.createMerchant(request);
  }

  @Get('/:id')
  async getMerchantById(
    @Param('id') merchantId: Types.ObjectId,
  ): Promise<Result<IMerchantResponseDTO>> {
    return this.merchantService.getMerchantById(merchantId);
  }
}
