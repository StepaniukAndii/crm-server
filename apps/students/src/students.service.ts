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

  async create(user: StudentDto): Promise<Students> {
    const date = new Date().getTime() - new Date(user.signed_up).getTime();
    const day = Math.floor(date / (24 * 60 * 60 * 1000));

    return this.studentRepository.save({ ...user, study_time: day });
  }

  async update(registerDto: StudentDto, id: number) {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    Object.assign(student, registerDto);

    return this.studentRepository.save(student);
  }

  async delete(registerDto: StudentDeleteDto) {
    return this.studentRepository.delete({ email: registerDto.email });
  }

  async getAllStudents() {
    const allRows = await this.studentRepository.find();
    allRows.forEach((row) => {
      const date = new Date().getTime() - new Date(row.signed_up).getTime();
      const day = Math.floor(date / (24 * 60 * 60 * 1000));
      row.study_time = day;
    });

    return allRows;
  }
}
