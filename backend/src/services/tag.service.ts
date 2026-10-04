import { prisma } from "../config/prisma";

export async function listTags() {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
}
