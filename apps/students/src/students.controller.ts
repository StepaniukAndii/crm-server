import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { StudentDto } from "apps/dto/student/student.dto";

import { StudentsService } from "./students.service";
import { JwtAuthGuard } from "@app/auth/jwt-auth.guard";

@Controller("api/v1")
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post("student")
  @UseGuards(JwtAuthGuard)
  async createStudent(@Body() registerDto: StudentDto) {
    console.log(registerDto);
    return this.studentsService.create(registerDto);
  }

  @Put("student/:id")
  @UseGuards(JwtAuthGuard)
  async updateStudent(
    @Body() registerDto: StudentDto,
    @Param("id") id: number
  ) {
    return this.studentsService.update(registerDto, id);
  }

  @Get("students")
  @UseGuards(JwtAuthGuard)
  async getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Delete("student/:id")
  @UseGuards(JwtAuthGuard)
  async deleteStudent(@Param("id") id: number) {
    this.studentsService.delete(id);
  }
}
