import { studentsGetByGroup } from "./studentsGetByGroup";

export async function studentsGetByGroupAndTurma(group: string, turma: string) {
  try {
      const storage = await studentsGetByGroup(group);
      const students = storage.filter(student => student.turma === turma);
      return students;
  } catch (error) {
    throw error
  }
}