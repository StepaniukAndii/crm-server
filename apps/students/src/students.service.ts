import { Students } from "@app/database/entities/student.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentDeleteDto } from "apps/dto/student/student.delete.dto";
import { StudentDto } from "apps/dto/student/student.dto";
import { Repository } from "typeorm";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Students)
    private studentRepository: Repository<Students>
  ) {}

  async findOneById(id: number): Promise<Students | undefined> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async create(student: StudentDto): Promise<Students> {
    return this.studentRepository.save(student);
  }

  async update(registerDto: StudentDto, id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    Object.assign(student, registerDto);

    return this.studentRepository.save(student);
  }

  async delete(id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }

    await this.studentRepository.remove(student);
  }

  async getAllStudents() {
    const allRows = await this.studentRepository.find();
    allRows.forEach((row) => {
      const dateParts = row.signed_up.split("-"); // Розбиваємо рядок на частини
      if (dateParts.length !== 3) {
        throw new Error("Некоректний формат дати");
      }

      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Місяць починається з 0
      const day = parseInt(dateParts[2], 10);

      const signupDate = new Date(year, month, day); // Створюємо об'єкт дати

      const currentDate = new Date();

      const dateDiffInDays = Math.floor(
        (currentDate.getTime() - signupDate.getTime()) / (24 * 60 * 60 * 1000)
      );
      row.study_time = dateDiffInDays;
    });

    return allRows;
  }
}
