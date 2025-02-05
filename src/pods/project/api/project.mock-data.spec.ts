import { mockProject } from './project.mock-data';
import { Project } from './project.api-model';

describe('mockProject', () => {
  it('should have the correct id', () => {
    expect(mockProject.id).toBe('1');
  });

  it('should have the correct name', () => {
    expect(mockProject.name).toBe('Nombre');
  });

  it('should have isActive set to true', () => {
    expect(mockProject.isActive).toBe(true);
  });

  it('should have the correct comments', () => {
    expect(mockProject.comments).toBe('Comentario');
  });

  it('should have the correct externalId', () => {
    expect(mockProject.externalId).toBe('1234');
  });

  it('should have the correct number of employees', () => {
    expect(mockProject.employees.length).toBe(4);
  });

  it('should have correct employee data', () => {
    expect(mockProject.employees).toEqual([
      { id: '1', employeeName: 'Daniel Perez', isAssigned: true },
      { id: '2', employeeName: 'Jose Sanchez', isAssigned: false },
      { id: '3', employeeName: 'Javier Benitez', isAssigned: false },
      { id: '4', employeeName: 'María Peña', isAssigned: true },
    ]);
  });

  it('should conform to the Project interface', () => {
    const project: Project = { ...mockProject };
    expect(project).toEqual(mockProject);
  });
});
