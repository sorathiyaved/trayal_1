let request = require("supertest");
let { app } = require("../index");
let { getAllEmployees, getEmployeeById } = require("../cantrollers/index");

let http = require("http");

jest.mock("../cantrollers", () => ({
  ...jest.requireActual("../cantrollers"),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe(" cantrollers function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("it should fatch all the employees", () => {
    let mockEmp = [
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockEmp);

    let result = getAllEmployees();

    expect(result).toEqual(mockEmp);
    expect(result.length).toBe(3);
  });
});

describe("API ENDPOINT TEST", () => {
  it("get /employees should get all employees", async () => {
    let response = await request(server).get("/employees");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        employeeId: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: "Priya Singh",
        email: "priya.singh@example.com",
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: "Ankit Verma",
        email: "ankit.verma@example.com",
        departmentId: 1,
        roleId: 3,
      },
    ]);

    expect(response.body.length).toBe(3);
  });
});
