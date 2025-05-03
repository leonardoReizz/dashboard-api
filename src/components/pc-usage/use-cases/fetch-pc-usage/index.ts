import { FetchPCUsageController } from "./fetch-pc-usage.controller";
import { FetchPCUsageUseCase } from "./fetch-pc-usage.use-case";
import { PCUsageRepository } from "../../repositories/pc-usage.repository";

const pcUsageRepository = new PCUsageRepository();
const fetchPCUsageUseCase = new FetchPCUsageUseCase(pcUsageRepository);
const fetchPCUsageController = new FetchPCUsageController(fetchPCUsageUseCase);

export { fetchPCUsageController };
