import AsyncStorage from "@react-native-async-storage/async-storage";

import { STUDENT_COLLECTION } from "@storage/storegeConfig";
import { StudentStorageDTO } from "./StudentStoregeDTO";

export async function studentsGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${STUDENT_COLLECTION}-${group}`);

        const students: StudentStorageDTO[] = storage ? JSON.parse(storage) : [];

        return students;

    } catch (error) {
        throw(error)
    }
}