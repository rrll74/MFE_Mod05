import {
  mapEmployeeSummaryFromApiToVm,
  mapEmployeeSummaryListFromApiToVm,
  mapProjectFromApiToVm,
} from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mockProject } from './api/project.mock-data';

// test any function in project.mapper.ts
describe('mappers', () => {
  describe('mapEmployeeSummaryFromApiToVm', () => {
    it('should map an api employee summary to a view model employee summary', () => {
      // Arrange
      const apiEmployeeSummary: apiModel.EmployeeSummary = {
        id: '1',
        employeeName: 'Test Employee',
        isAssigned: true,
      };

      // Act
      const expectedViewModelEmployeeSummary: viewModel.EmployeeSummary = {
        id: '1',
        employeeName: 'Test Employee',
        isAssigned: true,
      };
      const viewModelEmployeeSummary =
        mapEmployeeSummaryFromApiToVm(apiEmployeeSummary);

      // Assert
      expect(viewModelEmployeeSummary).toEqual(
        expectedViewModelEmployeeSummary
      );
    });
  });

  describe('mapEmployeeSummaryListFromApiToVm', () => {
    it('should map an api employee summary list to a view model employee summary list', () => {
      // Arrange
      const apiEmployeeSummaryList: apiModel.EmployeeSummary[] = [
        {
          id: '1',
          employeeName: 'Test Employee 1',
          isAssigned: true,
        },
        {
          id: '2',
          employeeName: 'Test Employee 2',
          isAssigned: false,
        },
      ];

      // Act
      const expectedViewModelEmployeeSummaryList: viewModel.EmployeeSummary[] =
        [
          {
            id: '1',
            employeeName: 'Test Employee 1',
            isAssigned: true,
          },
          {
            id: '2',
            employeeName: 'Test Employee 2',
            isAssigned: false,
          },
        ];
      const viewModelEmployeeSummaryList = mapEmployeeSummaryListFromApiToVm(
        apiEmployeeSummaryList
      );

      // Arrange
      expect(viewModelEmployeeSummaryList).toEqual(
        expectedViewModelEmployeeSummaryList
      );
    });
  });

  describe('mapProjectFromApiToVm', () => {
    it('should map a valid api project to a view model project', () => {
      // Arrange
      const apiProject: apiModel.Project = {
        id: '1',
        name: 'Project A',
        externalId: '123456',
        comments: 'A test project',
        isActive: true,
        employees: [
          { id: '1', employeeName: 'John Doe', isAssigned: true },
          { id: '2', employeeName: 'Jane Smith', isAssigned: true },
        ],
      };

      // Act
      const expectedViewModelProject: viewModel.Project = {
        id: '1',
        name: 'Project A',
        externalId: '123456',
        comments: 'A test project',
        isActive: true,
        employees: [
          { id: '1', employeeName: 'John Doe', isAssigned: true },
          { id: '2', employeeName: 'Jane Smith', isAssigned: true },
        ],
      };

      const viewModelProject = mapProjectFromApiToVm(apiProject);

      // Assert
      expect(viewModelProject).toEqual(expectedViewModelProject);
    });

    it('should handle empty employees array correctly', () => {
      // Arrange
      const apiProject: apiModel.Project = {
        id: '1',
        name: 'Project A',
        externalId: '123456',
        comments: 'A test project',
        isActive: true,
        employees: [],
      };

      // Act
      const expectedViewModelProject: viewModel.Project = {
        id: '1',
        name: 'Project A',
        externalId: '123456',
        comments: 'A test project',
        isActive: true,
        employees: [],
      };

      const viewModelProject = mapProjectFromApiToVm(apiProject);

      // Assert
      expect(viewModelProject).toEqual(expectedViewModelProject);
    });

    it('should return an empty view model project when api project is null or undefined', () => {
      // Arrange

      // Act
      const expectedEmptyProject: viewModel.Project =
        viewModel.createEmptyProject();

      // Assert
      expect(
        mapProjectFromApiToVm(null as unknown as apiModel.Project)
      ).toEqual(expectedEmptyProject);
      expect(
        mapProjectFromApiToVm(undefined as unknown as apiModel.Project)
      ).toEqual(expectedEmptyProject);
    });

    it('should handle a project with some properties missing', () => {
      // Arrange
      const apiProject: apiModel.Project = {
        id: '1',
        name: 'Project A',
        employees: [],
      } as any;

      // Act
      const viewModelProject = mapProjectFromApiToVm(apiProject);
      const expectedProyect: viewModel.Project = {
        id: '1',
        name: 'Project A',
        externalId: '',
        comments: '',
        isActive: false,
        employees: [],
      };

      //Assert
      expect(viewModelProject).toEqual(expectedProyect);
    });

    it('should map the mock project correctly', () => {
      // Arrange

      // Act
      const vmProject = mapProjectFromApiToVm(mockProject);

      // Assert
      expect(vmProject.id).toBe(mockProject.id);
      expect(vmProject.name).toBe(mockProject.name);
      expect(vmProject.comments).toBe(mockProject.comments);
      expect(vmProject.externalId).toBe(mockProject.externalId);
      expect(vmProject.isActive).toBe(mockProject.isActive);
      expect(vmProject.employees).toEqual(mockProject.employees);
    });
  });
});
