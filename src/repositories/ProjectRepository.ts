import { Project } from "@/@types/Project";

class ProjectRepository {
  private projects: Array<Project> = [];

  add(project: Project) {
    this.projects = [...this.projects, project];
  }

  findById(id: string) {
    return this.projects.find((item) => item.id == id) || null;
  }

  findAll() {
    return this.projects;
  }

  delete(id: string) {
    this.projects = this.projects.filter((item) => item.id != id);
  }

  edit(changedProject: Project) {
    const projectIndex = this.projects.findIndex((item) => {
      return item.id == changedProject.id;
    });

    if (projectIndex != -1) {
      this.projects[projectIndex] = changedProject;
      return changedProject;
    }

    return null;
  }
}

export const projectRepository = new ProjectRepository();
