import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppErros";
import { STUDENT_COLLECTION } from "@storage/storegeConfig";
import { StudentStorageDTO } from "./StudentStoregeDTO";
import { studentsGetByGroup } from "./studentsGetByGroup";

export async function studentAddByGroup(newStudent: StudentStorageDTO, group: string) {
    try {
        const storedStudents = await studentsGetByGroup(group);

        const studentsAlreadyExists = storedStudents.filter(student => student.name === newStudent.name);

        if (studentsAlreadyExists.length > 0) {
            throw new AppError('Essa pessoa já está cadastrada em uma turma');
        }

        const storage = JSON.stringify([...storedStudents, newStudent]);

        await AsyncStorage.setItem(`${STUDENT_COLLECTION}-${group}`, storage);
        
    } catch (error) {
        throw(error)
    }
}