import { z } from "zod";
import { STATS_RANGES } from "../services/statistics.service";

export const statisticsQuerySchema = z.object({ range: z.enum(STATS_RANGES).default("7d") });
