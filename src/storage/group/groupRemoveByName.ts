import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, STUDENT_COLLECTION } from "@storage/storegeConfig";
import { groupsGetAll } from "./groupsGetAll";


export async function groupRemoveByName(groupDelete: string) {
  try {
      const storedGroups = await groupsGetAll();
      const groups = storedGroups.filter((group: string) => group !== groupDelete);

      await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));

      await AsyncStorage.removeItem(`${STUDENT_COLLECTION}-${groupDelete}`);


  } catch (error) {
      throw error;
  }
}