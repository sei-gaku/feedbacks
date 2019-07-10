import { Injectable } from "@nestjs/common";

import { EmployeeInput } from "./dto/employee.input";
import { Employee } from "./models/employee";

@Injectable()
export class EmployeesService {
  public findAll(): Employee[] {
    return [];
  }

  public findById(_id: string): Employee | null {
    return null;
  }

  public create(_employee: EmployeeInput): Employee {
    return {
      email: "",
      firstName: "",
      id: "",
      lastName: "",
    };
  }

  public update(_id: string, _employee: EmployeeInput): Employee {
    return {
      email: "",
      firstName: "",
      id: "",
      lastName: "",
    };
  }

  public delete(_id: string): boolean {
    return true;
  }
}
