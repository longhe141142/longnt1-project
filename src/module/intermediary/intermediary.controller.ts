import { Controller } from '@nestjs/common';
import { IntermediaryService } from './intermediary.service';

@Controller('intermediary')
export class IntermediaryController {
  constructor(private readonly intermediaryService: IntermediaryService) {}
}
