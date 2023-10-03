import { useState, useCallback } from "react";
import { Header } from "@components/Header";
import { Container} from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { FlatList } from "react-native";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";

export default function Groups() {
    
    const [groups, setGroups] = useState([]);
    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new');
    }
    
    async function fetchGroups() { 
        try {
            const data = await groupsGetAll();
            setGroups(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handdleOpenGroup(group: string) { 
        navigation.navigate('students', { group });
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []))

    return(
        <Container>
            <Header />
            <Highlight 
                title="Turmas"
                subtitle="Estude com sua turma"
            />
            <FlatList 
                data={groups}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <GroupCard 
                        title={item}
                        onPress={() => handdleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && {flex: 1}}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Você ainda não possui turmas. Cadastre uma nova turma!"
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            <Button 
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
        
    )
}
