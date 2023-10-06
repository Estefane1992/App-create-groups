import AsyncStorage from "@react-native-async-storage/async-storage";
import { studentsGetByGroup } from "./studentsGetByGroup";
import { STUDENT_COLLECTION } from "@storage/storegeConfig";

export async function studentRemoveByGroup(studentsName: string, group: string) {
    try {
        const storage = await studentsGetByGroup(group);

        const filtered = storage.filter(students => students.name !== studentsName);

        const students = JSON.stringify(filtered);
        
        await AsyncStorage.setItem(`${STUDENT_COLLECTION}-${group}`, students);

    } catch (error) {
        throw(error)
    }
}