import { projectRepository } from "../../../../repositories/ProjectRepository";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  projectRepository.delete(params.id);
  return Response.json(params.id);
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const project = projectRepository.findById(params.id);
  return Response.json(project);
}
