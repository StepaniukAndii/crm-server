import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { StudentsService } from "./students.service";
import { StudentDto } from "apps/dto/student/student.dto";
import { JwtAuthGuard } from "@app/auth/jwt-auth.guard";
import { StudentDeleteDto } from "apps/dto/student/student.delete.dto";

@Controller("api/v1")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post("student")
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() registerDto: StudentDto) {
    console.log(registerDto);
    return this.studentsService.create(registerDto);
  }

  @Put("student")
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() registerDto: StudentDto, @Param("id") id: number) {
    return this.studentsService.update(registerDto, id);
  }

  @Get("students")
  @UseGuards(JwtAuthGuard)
  async getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Delete("student")
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body() registerDto: StudentDeleteDto) {
    return this.studentsService.delete(registerDto);
  }
}
