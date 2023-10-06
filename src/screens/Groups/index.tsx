import { useState, useCallback } from "react";
import { Header } from "@components/Header";
import { Container} from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Alert, FlatList } from "react-native";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@storage/group/groupsGetAll";
import { Loading } from "@components/Loading";

export default function Groups() {
    const [isLoading, setIsLoading] = useState(true); 
    const [groups, setGroups] = useState([]);
    const navigation = useNavigation();

    function handleNewGroup() {
        navigation.navigate('new');
    }
    
    async function fetchGroups() { 
        try {
            setIsLoading(true);

            const data = await groupsGetAll();

            setGroups(data);
            
        } catch (error) {
            console.log(error);
            Alert.alert('Turmas', 'Não foi possível carregar as turmas.');
        } finally {
            setIsLoading(false);
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

            {
                isLoading ? <Loading /> :
            
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
            }
            <Button 
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
        
    )
}
