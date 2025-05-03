import { FetchPCUsageDTO } from "./fetch-pc-usage.dto";
import { PCUsageRepository } from "../../repositories/pc-usage.repository";

export class FetchPCUsageUseCase {
  constructor(private pcUsageRepository: PCUsageRepository) {}

  async execute({ startDate, endDate }: FetchPCUsageDTO) {
    const pcUsage = await this.pcUsageRepository.fetchPCUsage(
      startDate,
      endDate,
    );
    return pcUsage;
  }
}
