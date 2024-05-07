import { v4 } from "uuid";
import { projectRepository } from "../../../repositories/ProjectRepository";

export async function POST(request: Request) {
  const { name, startDate, endDate, status, description } =
    await request.json();

  const project = {
    id: v4(),
    name,
    startDate,
    endDate,
    status,
    description,
  };

  projectRepository.add(project);

  return Response.json(project);
}

export async function PUT(request: Request) {
  const { id, name, startDate, endDate, status, description } =
    await request.json();

  const project = projectRepository.edit({
    id,
    name,
    startDate,
    endDate,
    status,
    description,
  });

  return Response.json(project);
}

export async function GET() {
  const projects = projectRepository.findAll();
  return Response.json(projects);
}
